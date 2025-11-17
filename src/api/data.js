import request from './request.js'

export const test = () => {
    return request.get('/healthz')
}

export const crawl = (data) => {
    const params =new URLSearchParams()
    for(let key in data){
        params.append(key,data[key])
    }
    return request.post('/crawl',params)
}

export const pageQuery = (data) => {
    return request.get('/commits',{
        params:data
    })
}

export const analyze = (sha) => {
    return request.post(`/commits/${sha}/analyze`)
}