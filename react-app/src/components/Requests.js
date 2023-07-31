import axios from "axios";

export default function LogIn(user) {
  return axios.post("http://localhost:3001/logIn", user);
}

export function SignUp(newUser) {
  return axios.post("http://localhost:3001/signUp", newUser);
}

export function getAllPosts() {
  const dummyData = [
    {
      title: "title 1",
      user: "user 1",
      topic: "topic 1",
      text: "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ",
    },
    {
      title: "title 2",
      user: "user 2",
      topic: "topic 2",
      text: "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ",
    },
    {
      title: "title 3",
      user: "user 3",
      topic: "topic 3",
      text: "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ",
    },
    {
      title: "title 4",
      user: "user 4",
      topic: "topic 4",
      text: "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ",
    },
  ];
  return dummyData;
}
