import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getHomeArticles() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc&distinct=category');
}

export async function getAllArticles() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc');
}


export async function getArticleById(id) {
    return await api.get(host + `/data/wiki/${id}`);

}

export async function deleteArticle(id) {
    return await api.del(host + `/data/wiki/${id}`);

} 

export async function editArticle(id, body) {
    return await api.put(host + `/data/wiki/${id}`, body);

}
export async function createArticle(body) {
    return await api.post(host + '/data/wiki', body);
    
}

export async function search(title) {
    return await api.get(host + `/data/wiki?where=title%20LIKE%20%22${title}%22`);
    
}

