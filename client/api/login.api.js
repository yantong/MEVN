import axios from 'axios';

export const login = (params) => {
    return axios({
        method: 'post',
        url: '/login',
        data: params
    })
}

export const getCode = (params) => {
    return axios({
        method: 'post',
        url: '/getPhoneVercode',
        data: params
    })
}

export const phoneLogin = (params) => {
    return axios({
        method: 'post',
        url: '/phoneLogin',
        data: params
    })
}

export const getPiccode = (params) => {
    return axios({
        method: 'get',
        url: '/getPiccode',
    })
}
