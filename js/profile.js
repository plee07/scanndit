// ---- Move all below to api.js after merge ---
const API_ENDPOINT_BASE = 'http://thesi.generalassemb.ly:8080/'; // delete this when moving to api.js

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
// ---- Move all above to api.js after merge ---



function handleSaveProfileResponse(profileResponse) {
  if (profileResponse.name == "error") {
    // Notify user that their profile update was not actually saved
    // Might need to redirect them to some login thing
  } else if (typeof profileResponse.id == 'number') {
    // set values of inputs
    populateProfile(profileResponse.additionalEmail, profileResponse.mobile, profileResponse.address);
    makeProfileNotEditable("edit");
  } else {
    // dont expect to end up here, but...
    console.log('didnt expect to end up here, not sure whats happening');
  }
}

function makeProfileNotEditable(buttonState) {
  document.querySelectorAll(".profile-field").forEach(function (el) {
    el.setAttribute('disabled', 'disabled');
    el.classList.remove("editable");
  });
  displayButtons(buttonState);
}

function makeProfileEditable() {
  document.querySelectorAll(".profile-field").forEach(function (el) {
    el.removeAttribute('disabled');
    el.classList.add("editable");
  });
  document.querySelector('.profile-user-info').removeAttribute('hidden');
  displayButtons("saveCancel");
}

function saveProfile(altEmail, mobileNumber, address) {
  let access_token = getCookie('access_token');
  createOrUpdateProfile(access_token, altEmail, mobileNumber, address)
    .then(response => {
      handleSaveProfileResponse(response);
    });
}

function resetInputFieldsToLastValue() {
  let profileAltEmail = document.querySelector('.profile-alt-email');
  let profileMobileNumber = document.querySelector('.profile-mobile-number');
  let profileAddress = document.querySelector('.profile-address');
  profileAltEmail.value = profileAltEmail.dataset.altEmail || '';
  profileMobileNumber.value = profileMobileNumber.dataset.mobileNumber || '';
  profileAddress.value = profileAddress.dataset.address || '';
}

function populateProfile(altEmail, mobileNumber, address) {
  let profileAltEmail = document.querySelector('.profile-alt-email');
  let profileMobileNumber = document.querySelector('.profile-mobile-number');
  let profileAddress = document.querySelector('.profile-address');
  profileAltEmail.setAttribute('data-alt-email', altEmail);
  profileMobileNumber.setAttribute('data-mobile-number', mobileNumber);
  profileAddress.setAttribute('data-address', address);
  profileAltEmail.value = altEmail;
  profileMobileNumber.value = mobileNumber;
  profileAddress.value = address;
}

function displayButtons(buttonType) {
  document.querySelectorAll('.profile-buttons-wrapper').forEach(el => el.setAttribute('hidden', true));
  switch (buttonType) {
    case "create":
      document.querySelector('.profile-create-button-wrapper').removeAttribute('hidden');
      break;
    case "edit":
      document.querySelector('.profile-edit-button-wrapper').removeAttribute('hidden');
      break;
    case "saveCancel":
      document.querySelector('.profile-save-cancel-button-wrapper').removeAttribute('hidden');
      break;
    default:
  }
}

function handleProfileResponse(profileResponse) {
  if (profileResponse.name == "Error") {
    // test validity of access_token by trying to fetch this user's posts
    let access_token = getCookie("access_token");
    if (typeof(access_token) == "string") {
      getPostsByUser(access_token).then(response => {
        // if that works, show create profile buttons
        document.querySelector('.profile-username').innerText = getCookie('username');
        displayButtons('create');
      });
    } else {
      // if it doesn't, prompt to log in
      // redirect user to login/signup
    }
  } else if (typeof profileResponse.id == 'number') {
    // populate fields and show edit profile button
    document.querySelector('.profile-username').innerText = getCookie('username');
    populateProfile(profileResponse.additionalEmail, profileResponse.mobile, profileResponse.address);
    let profileUserInfo = document.querySelector('.profile-user-info');
    displayButtons('edit');
    profileUserInfo.setAttribute('data-profile-exists', 'true');
    profileUserInfo.removeAttribute('hidden');
  } else {
    // dont expect to end up here, but...
    console.log('didnt expect to end up here, not sure whats happening');
  }
  document.querySelector('.profile').removeAttribute('hidden');
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

// ON DOM CONTENT LOADED
window.addEventListener('DOMContentLoaded', function () {
  let profileEditButton = document.querySelector('.profile-edit-button');
  let profileCreateButton = document.querySelector('.profile-create-button');
  let profileCancelButton = document.querySelector('.profile-cancel-button');
  let profileSaveButton = document.querySelector('.profile-save-button');

  let altEmailInput = document.querySelector('.profile-alt-email');
  let mobileNumberInput = document.querySelector('.profile-mobile-number');
  let addressInput = document.querySelector('.profile-address');

  profileEditButton.addEventListener('click', function() {
    makeProfileEditable();
  });

  profileCreateButton.addEventListener('click', function() {
    console.log('create!!!!!!!!!');
    makeProfileEditable();
  });

  profileCancelButton.addEventListener('click', function() {
    resetInputFieldsToLastValue();
    let profileUserInfo = document.querySelector('.profile-user-info');
    let nextButtonState = (profileUserInfo.dataset.profileExists == 'true') ? 'edit' : 'create';
    makeProfileNotEditable(nextButtonState);
  });

  profileSaveButton.addEventListener('click', function() {
    console.log('save!!!!!!!!!');
    saveProfile(altEmailInput.value, mobileNumberInput.value, addressInput.value);
  });

  let access_token = getCookie("access_token");
  console.log(getCookie("access_token"));
  console.log(access_token);
  if (typeof(access_token) == "string") {
    getProfile(access_token).then(response => {
      handleProfileResponse(response);
    });
  } else {
    console.log("we need to redirect to signup");
  }
});
