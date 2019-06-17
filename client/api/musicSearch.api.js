import axios from 'axios';

export const searchSingleMusic = (params) => {
    return axios({
        method: 'post',
        url: '/searchSingleMusic',
        data: params
    })
}
