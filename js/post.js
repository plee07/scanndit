
function populateExistingComment(comm){
  const user = cookieParser(document.cookie).username;
  const commentList = document.querySelector('.all-comments');
  const commentDisplay = document.createElement('div');
  const closeBtn = document.createElement("button");
  closeBtn.className = "close-button";
  closeBtn.innerText = "X";

  commentDisplay.className = 'user-post';
  console.log(comm)
  commentDisplay.innerText = `${comm.user.username}: ${comm.text}`;
  console.log(comm.user.username + " " + user);
  if(comm.user.username === user){
    closeBtn.addEventListener('click',()=>{
      deleteComment(document.cookie, comm.id).then(response => {
        console.log(response);
        location.reload();
      })
    });
    commentDisplay.appendChild(closeBtn);
  }
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

  const commentButton = document.querySelector('#comment-btn');

  const postHeader = document.querySelector('.post-title');
  let postId = window.location.hash.slice(1);
  let post = JSON.parse(localStorage.getItem(postId));

  const postTitle = document.createElement('h1');
  postTitle.className = "user-post-title";
  const postDescr = document.createElement('p');
  postDescr.className = "post-desc";
  postTitle.innerText = `${post.user.username}: ${post.title}`;
  postDescr.innerText = post.description;
  postHeader.appendChild(postTitle);
  postHeader.appendChild(postDescr);

  getAllComments(postId).then(res =>{
    console.log(cookieParser(document.cookie).username)
    res.forEach(element => {
      populateExistingComment(element)
    });
  });
  signupButton.addEventListener('click', function () {
    signUp(signupEmail.value, signupPassword.value, signupUsername.value)
      .then(response => {
        handleSignupResponse(response);
        location.reload();
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
        let user = { token: response.token, username: response.username };
        login(user);
        errorMessage.hidden = true;
        closeButton.click();
        errorMessage.innerText = "";
        successfulLogin();
        location.reload();

      }
    })
  })

  //Close out of login modal
  closeButton.addEventListener('click',()=> document.querySelector('.error-message').hidden = true);

  //User post comment
  commentButton.addEventListener('click',()=> {
    let comment = document.querySelector('#new-comment').value;
    const comm = {
      "text": comment
    }
    postComment(comm, document.cookie, postId).then(response => {
      location.reload();
    })
  })
});
