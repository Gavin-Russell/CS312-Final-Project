import axios from "axios";

export default function LogIn(user) {
  return axios.post("http://localhost:3001/logIn", user);
}

export function SignUp(newUser) {
  return axios.post("http://localhost:3001/signUp", newUser);
}

export async function EditProfile(userInfo) {
  return axios.post("http://localhost:3001/editProfile", userInfo);
}

export function addBlogPost(newPost) {
  return axios.post("http://localhost:3001/addPost", newPost);
}

export async function getPosts(filterParams) {
  let posts = await axios.post("http://localhost:3001/getPosts", filterParams);
  return posts.data
}