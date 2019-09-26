const API_ENDPOINT_BASE = 'http://thesi.generalassemb.ly:8080/';

// Loading all posts
async function getAllPosts()
{
  let response = await fetch(`${API_ENDPOINT_BASE}post/list`);
  let data = await response.json()
  return data;
}

// loading all comments based on comment id
async function getAllComments(postId){
  let response = await fetch(`${API_ENDPOINT_BASE}post/${postId}/comment`);
  let data = await response.json();
  return data;
}

const newUser = {
  "email" : "pan@test200.com",
  "password" : "test5012",
  "username" : "pat"
}
// New User signup
async function postNewUser(newUser){
  let response = await fetch(`${API_ENDPOINT_BASE}signup`, {
      method: 'POST',
      headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
  })
  return response;
}

// Existing User Login
async function loginUser(user){
  let response = await fetch(`${API_ENDPOINT_BASE}login`, {
    method: 'POST',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
})

let token = await response.json();
return token;
}
