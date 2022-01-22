import axios from 'axios';

export function api(){
    return axios.create({
        baseURL: "https://infinite-waters-90313.herokuapp.com/api/"
    })
}
