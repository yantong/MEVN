import axios from 'axios';

export const editSelfData = (params) => {
    return axios({
        method: 'post',
        url: '/editSelfData',
        data: params
    })
}

export const selfData = () => {
    return axios({
        method: 'get',
        url: '/selfData',
    })
}
