import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:3001/api'
})

http.interceptors.response.use(res => res.data)

export const getUsers = () => {
    return http.get('/users')
}

export const getUser = (id) => {
    return http.get(`/user/${id}`)
}

export const createUser = (body) => {
    return http.post('/user', body)
}

export const editUser = (body) => {
    return http.put(`/user`, body)
}

export const deleteUser = (id) => {
    return http.delete(`/user/${id}`)
}

