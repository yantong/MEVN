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

export const searchSongerAlbum = (params) => {
    return axios({
        method: 'post',
        url: '/searchSongerAlbum',
        data: params
    })
}


export const searchAlbum = (params) => {
    return axios({
        method: 'post',
        url: '/searchAlbum',
        data: params
    })
}

export const searchAlbumMusic = (params) => {
    return axios({
        method: 'post',
        url: '/searchAlbumMusic',
        data: params
    })
}


