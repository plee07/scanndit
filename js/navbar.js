function isLoggedIn() {
  cookieObject = cookieParser(document.cookie);
  return (typeof cookieObject.access_token != 'undefined');
}

function login(user) {
  document.cookie = `access_token=${user.token}; path=/`;
  document.cookie = `username=${user.username}; path=/`;
  console.log(`${user.username} has logged in...`);
  successfulLogin();
}

function successfulLogin() {
  document.body.classList.add('logged-in');
  document.body.classList.remove('logged-out');
  document.querySelector('#dropdown-username').innerText = cookieParser(document.cookie).username;
  document.querySelector('#navbar-profile').hidden = false;
}

function logout() {
  document.cookie = `access_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  document.cookie = `username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  document.body.classList.add('logged-out');
  document.body.classList.remove('logged-in');
  document.querySelector('#dropdown-username').innerText = '';
  document.querySelector('#navbar-profile').hidden = true;
}

let navbarHtml = `
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/"><img class="logo" src="/logo.png"></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav ml-auto u-custom" id="navbar-profile">
      <li class="nav-item dropdown">
        <a id="dropdown-username" class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
        <div class="dropdown-menu mr-auto" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="/profile/">My Profile</a>
          <a id="logout-button" class="dropdown-item" href="#">Logout</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
`;

let navbarWrapper = document.createElement('div');
navbarWrapper.innerHTML = navbarHtml;
document.body.prepend(navbarWrapper);

window.addEventListener('DOMContentLoaded', function () {
  const logoutButton = document.querySelector('#logout-button');

  // v CHECK LOGIN STATE
  if (isLoggedIn()) {
    successfulLogin();
  } else {
    logout();
  }
  // ^ CHECK LOGIN STATE

  logoutButton.addEventListener('click', function () {
    logout();
    window.location.href = "/";
  });

});
