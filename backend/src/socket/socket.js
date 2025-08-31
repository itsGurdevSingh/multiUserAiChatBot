require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { Server } = require('socket.io');
const userModel = require('../models/user.model');
const { genTextRes, genEmbedding } = require('../services/genAi.service');
const messageModel = require('../models/message.model');
const { createMemory, queryMemory } = require('../services/vectorDb.service');

const isUserLogedIn = async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || '');
    const token = cookies.authToken

    if (!token) {
        return next(new Error('authentication Error : login again'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await userModel.findById(decoded.id);

        socket.user = user;

        next();

    } catch (error) {

        console.log(error)
        next(new Error('authentication Error : invalid token'))
    }
}

const setUpSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors:{
            origin:'http://localhost:5173',
            credentials:true
        },
    });

    io.use(isUserLogedIn)
    io.on('connection', (socket) => {
        console.log('yoo socket is connected ')

        socket.on('user-msg', async (messagePayload) => {

            const userId = socket.user?._id;
            const { chatId, content } = messagePayload;

            if(!content) return socket.emit('ai-res', 'please enter a valid input ')



            const [vector, userMsg] = await Promise.all([
                genEmbedding(content),
                messageModel.create({ userId, chatId, role: 'user', content })
            ])

            const [vectorMemory, shortTermMemory] = await Promise.all([
                queryMemory({
                    queryVector: vector,
                    limit: 10,
                    metadata: { userId: userId }
                }),
                messageModel
                    .find({ chatId })
                    .sort({ createdAt: -1 })
                    .limit(10)
                    .lean()

            ])

            await createMemory({
                memoryId: userMsg._id,
                vector: vector,
                metadata: {
                    chatId: chatId,
                    userId: userId,
                    content: content
                }
            })


            const longTermMemory = [{
                role: 'user',
                parts: [{
                    text: `Here is some relevant context from our past conversations:\n\n
                          ${vectorMemory.map(item => item.metadata?.content).join('\n')}`
                }]
            }]

            // Reverse to oldest → newest, then map
            const formattedSTL = shortTermMemory.reverse().map(msg => ({
                role: msg.role,
                parts: [{ text: msg.content }]
            }));

            const fullContext = [...longTermMemory, ...formattedSTL]

            const res = await genTextRes(fullContext)
            
            socket.emit('ai-res', res)

            const [modelMsg, resVector] = await Promise.all([
                messageModel.create({ userId, chatId, role: 'model', content: res }),
                genEmbedding(res)
            ])

            await createMemory({
                memoryId: modelMsg._id,
                vector: resVector,
                metadata: {
                    chatId: chatId,
                    userId: userId,
                    content: res
                }
            })
            
        })
    })


}

module.exports = setUpSocket;