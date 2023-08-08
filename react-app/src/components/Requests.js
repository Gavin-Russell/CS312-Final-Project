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

export function updateBlogPost(updatedPost) {
  return axios.post("http://localhost:3001/updatePost", updatedPost);
}

export function deleteBlogPost(postId) {
  return axios.post("http://localhost:3001/deletePost", postId);
}

export function userComments(user) {
  return axios.post("http://localhost:3001/userComments", user);
}

export function deleteComment(postId, commentId) {
  return axios.post("http://localhost:3001/deleteComment", {postId, commentId});
}