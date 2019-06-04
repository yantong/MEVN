import axios from 'axios';

export const regest = (params) => {
    return axios({
        method: 'post',
        url: '/regest',
        data: params
    })
}
