import axios from "axios";

export default async function LogIn(user) {
  const response = await axios.post("http://localhost:3001/logIn", user);
  if (response.status == 200) {
    console.log("successful login");
    return response;
  }
  if (response.status == 400) {
    console.log("400 status, login unsuccessful");
    return null;
  }
  console.log(`something weird happened, status: ${response.status}`);
  return null;
}

export async function SignUp(newUser) {
  const request = await axios.post("http://localhost:3001/signUp", newUser);
  if (response.status == 200) {
    console.log("successful signup");
    return response;
  }
  if (response.status == 400) {
    console.log("400 status, signup unsuccessful");
    return null;
  }
  console.log(`something weird happened, status: ${response.status}`);
  return null;
}
