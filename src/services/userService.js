import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";
const tokenKey = 'token';

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export async function logout() {
    localStorage.removeItem(tokenKey);
    return await http.get(`${apiUrl}/users/logout`);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (error) {
        return null;
    }
}

export async function login(email, password) {
    console.log({ email, password });
    const { data } = await http.post(`${apiUrl}/auth`, { email, password });
    localStorage.setItem(tokenKey, data.token);
}


export async function updateUser(user) {
    console.log({ user });
    const jwt = await http.put(`${apiUrl}/users/${user._id}`, user);
    console.log({ jwt });
    localStorage.setItem(tokenKey, jwt.data)
    return jwtDecode(jwt.data);
}



// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login,
    getCurrentUser,
    logout,
    getJwt,
    updateUser
};