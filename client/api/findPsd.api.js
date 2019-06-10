import axios from 'axios';

export const findPsd = (params) => {
    return axios({
        method: 'post',
        url: '/findPsd',
        data: params
    })
}

export const getMatchCode = (params) => {
    return axios({
        method: 'post',
        url: '/getMailVercode',
        data: params
    })
}
