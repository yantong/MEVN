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
