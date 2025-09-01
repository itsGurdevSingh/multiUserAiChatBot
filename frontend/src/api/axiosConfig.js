import axios from "axios";

const newAxios = axios.create({
    baseURL:'https://multiuseraichatbot.onrender.com'
    // baseURL:'http://localhost:3000'
})

export default newAxios
