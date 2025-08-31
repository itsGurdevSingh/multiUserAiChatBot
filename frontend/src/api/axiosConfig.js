import axios from "axios";

const newAxios = axios.create({
    baseURL:'https://multiuseraichatbot.onrender.com'
})

export default newAxios
