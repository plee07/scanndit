
function addComment(comm){
  console.log(comm)
  const commentList = document.querySelector('.all-comments');
  const commentDisplay = document.createElement('div');;
  commentDisplay.className = 'user-comment'
  commentDisplay.innerText = `${comm.user.username}: ${comm.text}`;
  // commentDisplay.setAttribute('data-post-id', post.id);
  commentList.appendChild(commentDisplay);

}


window.addEventListener('DOMContentLoaded', (event) => {
  const closeButton = document.querySelector('#close-btn');
  const userLogin = document.querySelector('#user-login');
  const userPassword = document.querySelector('#user-password');
  const loginButton = document.querySelector('#login-btn');

  const signupEmail = document.querySelector('#signup-email');
  const signupUsername = document.querySelector('#signup-username');
  const signupPassword = document.querySelector('#signup-password');
  const signupButton = document.querySelector('#signup-btn');

  const commentButton = document.querySelector('#new-comment');

  const postHeader = document.querySelector('.post-title');
  let postId = window.location.hash.slice(1);
  let post = JSON.parse(localStorage.getItem(postId));

  const postTitle = document.createElement('h1');
  const postDescr = document.createElement('p');
  postTitle.innerText = `${post.user.username}: ${post.title}`;
  postDescr.innerText = post.description;
  postHeader.appendChild(postTitle);
  postHeader.appendChild(postDescr);
  getAllComments(postId).then(res =>{
    res.forEach(element => {
      addComment(element)
    });
  });
  signupButton.addEventListener('click', function () {
    signUp(signupEmail.value, signupPassword.value, signupUsername.value)
      .then(response => {
        handleSignupResponse(response);
      });
  })

  //User login event
  loginButton.addEventListener('click', ()=>{
    const user = {
      "email" : userLogin.value,
      "password" : userPassword.value
    }
    loginUser(user).then(res=> {
      let response = res;
      let errorMessage = document.querySelector('.error-message');
      if(response.token === undefined){
        console.log(response.message);
        errorMessage.innerText = response.message;
        errorMessage.hidden = false;

      }
      else{
        document.cookie = `access_token=${response.token}`;
        document.cookie = `username=${response.username}`;
        errorMessage.hidden = true;
        closeButton.click();
        errorMessage.innerText = "";
        document.querySelector('.create-new-post').hidden = false;
        document.querySelector('.login-signup-buttons').hidden = true;

      }
    })
  })

  //Close out of login modal
  closeButton.addEventListener('click',()=> document.querySelector('.error-message').hidden = true);

});
