import axios from 'axios';
import { ElMessage } from 'element-plus'
//定义一个变量,记录公共的前缀,baseURL
const baseURL = '/api';
const instance = axios.create({baseURL})

//添加请求拦截器
instance.interceptors.request.use(
    (config)=>{
        return config
    },
    (err)=>{
        Promise.reject(err)
    }
)

//添加响应拦截器
instance.interceptors.response.use(
    (response)=>{
        return response
    },
    (err)=>{
        ElMessage.error(err.message)
        return Promise.reject(err)
    }
)

export default instance;