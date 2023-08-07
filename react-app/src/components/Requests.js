import axios from "axios";

export default function LogIn(user) {
  return axios.post("http://localhost:3001/logIn", user);
}

export function SignUp(newUser) {
  return axios.post("http://localhost:3001/signUp", newUser);
}

export function addBlogPost(newPost) {
  return axios.post("http://localhost:3001/addPost", newPost);
}

export async function getPosts(filter) {
  let posts = await axios.post("http://localhost:3001/getPosts", filter);
  return posts.data;
}

export function updateBlogPost(updatedPost) {
  return axios.post("http://localhost:3001/updatePost", updatedPost);
}
