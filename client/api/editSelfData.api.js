import axios from 'axios';

export const editSelfData = (params) => {
    return axios({
        method: 'post',
        url: '/editSelfData',
        data: params
    })
}
