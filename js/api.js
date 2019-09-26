const API_ENDPOINT_BASE = 'http://thesi.generalassemb.ly:8080/';

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function buildHeader(access_token = null) {
  let header = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
  if (access_token) { header.Authorization = 'Bearer ' + access_token }
  return(header);
}

let headerWithAuth = {
  'Authorization': 'Bearer ' + access_token,
  'Content-Type': 'application/json'
}

async function getPostsByUser(access_token) {
  let response = await fetch(`${API_ENDPOINT_BASE}user/post/`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token,
      'X-FP-API-KEY': 'iphone',
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    if (!response.ok) {
      // TODO: HANDLE BAD RESPONSE BETTER
      console.log('getProfile received a bad response. HANDLE THIS BETTER');
      throw Error(response.statusText);
    }
    return response;
  }).then(function(response) {
    return response.json();
  }).catch(err => err);

  return response;
}

async function getProfile(access_token) {
  let response = await fetch(`${API_ENDPOINT_BASE}profile`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token,
      'X-FP-API-KEY': 'iphone',
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    if (!response.ok) {
      // TODO: HANDLE BAD RESPONSE BETTER
      console.log('getProfile received a bad response. HANDLE THIS BETTER');
      throw Error(response.statusText);
    }
    return response;
  }).then(function(response) {
    return response.json();
  }).catch(err => err);

  return response;
}

async function createOrUpdateProfile(access_token, altEmail, mobileNumber, address) {
  let profileInfo = {
    additionalEmail: altEmail,
    mobile: mobileNumber,
    address: address
  };
  let response = await fetch(`${API_ENDPOINT_BASE}profile`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + access_token,
      'X-FP-API-KEY': 'iphone',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profileInfo)
  }).then(function (response) {
    if (!response.ok) {
      // TODO: HANDLE BAD RESPONSE BETTER
      console.log('getProfile received a bad response. HANDLE THIS BETTER');
      throw Error(response.statusText);
    }
    return response;
  }).then(function(response) {
    return response.json();
  }).catch(err => err);

  return response;
}

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
// async function signUp(newUser){
//   let response = await fetch(`${API_ENDPOINT_BASE}signup`, {
//       method: 'POST',
//       headers:{
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newUser)
//   })
//   return response;
// }
//
async function signUp(email, password, username){
  let user = {
    email: email,
    password: password,
    username: username,
  };

  let response = await fetch(`${API_ENDPOINT_BASE}signup`, {
    method: 'POST',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(function(response) {
      if (!response.ok) {
        // TODO: HANDLE BAD RESPONSE BETTER
        console.log('Sign Up received a bad response. HANDLE THIS BETTER');
        throw Error(response.statusText);
      }
      return response;
    })
    .then(function(response) {
      return response.json();
    })
    .catch(err => err);

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

//create new Post
async function createNewPost(userTitle, userDescr, auth){
  let userAuth = cookieParser(auth);
  let post = {
    title: userTitle,
    description: userDescr
  }
  let response = await fetch(`${API_ENDPOINT_BASE}post`,{
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userAuth.access_token,
    },
  body: JSON.stringify(post)
  })
  let res = await response.json();
  return res;
}

// document.cookie parser
// obtained from https://gist.github.com/rendro/525bbbf85e84fa9042c2
function cookieParser(cookie){
  return document.cookie
  .split(';')
  .reduce((res, c) => {
    const [key, val] = c.trim().split('=').map(decodeURIComponent)
    try {
      return Object.assign(res, { [key]: JSON.parse(val) })
    } catch (e) {
      return Object.assign(res, { [key]: val })
    }
  }, {});

  // {
  //   "text" : "Phil's comment."
  // }
  // Posting a comment
}

async function postComment(comment, auth, postId){
  let userAuth = cookieParser(auth);
  let response = await fetch(`${API_ENDPOINT_BASE}comment/${postId}`, {
  method: "POST",
  headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + userAuth.access_token,
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(comment)
  })
  return response;
}
