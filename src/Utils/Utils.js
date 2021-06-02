import axios from 'axios';

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

const getAllUsers = (url) =>
{
    return axios.get(url);
}

const getAllPosts = (url) =>
{
    return axios.get(url);
}

const getAllTodos = (url) =>
{
    return axios.get(url);
}

const updateUser = (id, obj) =>
{
    
 return axios.put("/users" + "/" + id, obj);
  
  
}
console.log(updateUser())
const deleteUser = (id) =>
{
    return axios.delete("" + "/" + id);
}

export default {getAllUsers, getAllPosts, getAllTodos, updateUser, deleteUser}
