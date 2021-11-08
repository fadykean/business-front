import http from "./httpService";
import { apiUrl } from "../config.json";

export const categories = ['all', 'Museums', 'Shopping', 'Restaurant', 'Construction']

export function createCard(card) {
    console.log({ card });
    return http.post(`${apiUrl}/cards`, card);
}

export async function getMyCards() {
    console.log('getMyCards');
    return await http.get(`${apiUrl}/cards/my-cards`)
}

export function getCard(cardId) {
    return http.get(`${apiUrl}/cards/${cardId}`)
}

export function editCard(card) {
    const cardId = card._id;
    delete card._id;
    return http.put(`${apiUrl}/cards/${cardId}`, card);
}

export function deleteCard(cardId, userId) {
    console.log({ cardId, userId });
    return http.delete(`${apiUrl}/cards/${cardId}/${userId}`)
}

export default {
    createCard,
    getMyCards,
    getCard,
    editCard,
    deleteCard,
    categories
};