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
        if(response.data.ok === true){
            return response.data
        }
        ElMessage.error('服务异常：',response.data.error)
        return Promise.reject(response.data.error)
    },
    (err)=>{
        ElMessage.error('响应失败：',err)
        return Promise.reject(err)
    }
)

export default instance;