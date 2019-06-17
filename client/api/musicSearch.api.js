import axios from 'axios';

export const searchSingleMusic = (params) => {
    return axios({
        method: 'post',
        url: '/searchSingleMusic',
        data: params
    })
}

export const searchSonger = (params) => {
    return axios({
        method: 'post',
        url: '/searchSonger',
        data: params
    })
}


export const searchAibum = (params) => {
    return axios({
        method: 'post',
        url: '/searchAibum',
        data: params
    })
}

