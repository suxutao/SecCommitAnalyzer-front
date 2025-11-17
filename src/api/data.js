import request from './request.js'

export const test = () => {
    return request.get('/healthz')
}

export const updateCrawl = (data) => {
    const params =new URLSearchParams()
    for(let key in data){
        params.append(key,data[key])
    }
    return request.post('/scheduler/config',params)
}

export const startCrawl = () => {
    return request.post('/scheduler/start')
}

export const stopCrawl = () => {
    return request.post('/scheduler/stop')
}

export const pageQuery = (data) => {
    return request.get('/commits',{
        params:data
    })
}

export const analyze = (sha) => {
    return request.post(`/commits/${sha}/analyze`)
}