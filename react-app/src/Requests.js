import axios from 'axios'


export default function LogIn(user) {
    return axios.post('http://localhost:3001/logIn', user)
}


export function SignUp(newUser) {
    return axios.post('http://localhost:3001/signUp', newUser)
}
