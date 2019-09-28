import Login from '/src/utils/login.js';
import Postfeed from '/src/views/components/postfeed/postfeed.js';
import Commentfeed from '/src/views/components/commentfeed/commentfeed.js';

function onviewUserPostsClick() {
  let viewUserPostsButton = document.querySelector('#view-user-posts-button');
  let viewUserCommentsButton = document.querySelector('#view-user-comments-button');
  let postList = document.querySelector('.post-list');
  let commentsList = document.querySelector('.comments-list');
  viewUserPostsButton.disabled = true;
  viewUserCommentsButton.disabled = false;
  // postList.hidden = false;
  // commentsList.hidden = true;
  postList.classList.add('is-visible');
  commentsList.classList.remove('is-visible');
}

function onviewUserCommentsClick() {
  let viewUserPostsButton = document.querySelector('#view-user-posts-button');
  let viewUserCommentsButton = document.querySelector('#view-user-comments-button');
  let postList = document.querySelector('.post-list');
  let commentsList = document.querySelector('.comments-list');
  viewUserPostsButton.disabled = false;
  viewUserCommentsButton.disabled = true;
  // postList.hidden = true;
  // commentsList.hidden = false;
  postList.classList.remove('is-visible');
  commentsList.classList.add('is-visible');
}

function handleSaveProfileResponse(profileResponse) {
  if (profileResponse.name == "Error") {
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
  document.querySelectorAll(".profile-user-info-field").forEach(function (el) {
    el.classList.remove("editable");
  });
  document.querySelectorAll(".profile-field").forEach(function (el) {
    el.setAttribute('disabled', 'disabled');
    el.classList.remove("editable");
  });
  if (buttonState == 'create') {
    document.querySelector('.profile-user-info').setAttribute('hidden', 'true');
  }
  displayButtons(buttonState);
}

function makeProfileEditable() {
  document.querySelectorAll(".profile-user-info-field").forEach(function (el) {
    el.classList.add("editable");
  });
  document.querySelectorAll(".profile-field").forEach(function (el) {
    el.removeAttribute('disabled');
    el.classList.add("editable");
  });
  document.querySelector('.profile-user-info').removeAttribute('hidden');
  displayButtons("saveCancel");
}

function saveProfile(altEmail, mobileNumber, address) {
  let access_token = Login.getCookie('access_token');
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

async function handleProfileResponse(profileResponse) {
  if (profileResponse.name == "Error") {
    displayButtons('create');
  } else if (typeof profileResponse.id == 'number') {
    // populate fields and show edit profile button
    populateProfile(profileResponse.additionalEmail, profileResponse.mobile, profileResponse.address);
    let profileUserInfo = document.querySelector('.profile-user-info');
    displayButtons('edit');
    profileUserInfo.setAttribute('data-profile-exists', 'true');
    profileUserInfo.removeAttribute('hidden');
  } else {
    // dont expect to end up here, but...
    console.log('didnt expect to end up here, not sure whats happening');
  }
  return;
}


let Profile = {
  render: async function () {
    let postfeed = await Postfeed.render();
    let commentfeed = await Commentfeed.render();
    let view =  `
    <div class="profile-wrapper">

      <div class="profile">
        <div class="profile-photo">
          <img src="/profile-placeholder.png" alt="">
        </div>
        <h1 class="profile-username"></h1>

        <div class="profile-user-info" hidden="true">
          <div class="profile-user-info-field">
            <span class="profile-field-label">Alternate Email</span>
            <input class="profile-field profile-alt-email" type="text" name="" value="" disabled="disabled">
          </div>
          <div class="profile-user-info-field">
            <span class="profile-field-label">Mobile Number</span>
            <input class="profile-field profile-mobile-number" type="text" name="" value="" disabled="disabled">
          </div>
          <div class="profile-user-info-field">
            <span class="profile-field-label">Address</span>
            <input class="profile-field profile-address" type="text" name="" value="" disabled="disabled">
          </div>
        </div>

        <div class="profile-buttons-wrapper profile-create-button-wrapper" hidden="true">
          <button class="profile-create-button btn btn-outline-primary" type="button" name="button">Create Profile</button>
        </div>
        <div class="profile-buttons-wrapper profile-edit-button-wrapper" hidden="true">
          <button class="profile-edit-button btn btn-outline-primary" type="button" name="button">Edit Profile</button>
        </div>
        <div class="profile-buttons-wrapper profile-save-cancel-button-wrapper" hidden="true">
          <button class="profile-cancel-button btn btn-outline-primary" type="button" name="button">Cancel</button>
          <button class="profile-save-button btn btn-outline-primary" type="button" name="button">Save</button>
        </div>

      </div>

      <div class="user-posts-and-comments">
        <div class="user-posts-and-comments-buttons">
          <button id="view-user-posts-button" type="button" name="button" disabled>Posts</button>
          <button id="view-user-comments-button" type="button" name="button">Comments</button>
        </div>
        ${postfeed}
        ${commentfeed}
      </div>

    </div>
    `;
    return view;
  },
  afterRender: async function () {
    Postfeed.afterRender();
    document.querySelector('.post-list').classList.add('toggle-content');
    document.querySelector('.post-list').classList.add('is-visible');
    Commentfeed.afterRender();
    document.querySelector('.comments-list').classList.add('toggle-content');

    let profileEditButton = document.querySelector('.profile-edit-button');
    let profileCreateButton = document.querySelector('.profile-create-button');
    let profileCancelButton = document.querySelector('.profile-cancel-button');
    let profileSaveButton = document.querySelector('.profile-save-button');

    let altEmailInput = document.querySelector('.profile-alt-email');
    let mobileNumberInput = document.querySelector('.profile-mobile-number');
    let addressInput = document.querySelector('.profile-address');

    let viewUserPostsButton = document.querySelector('#view-user-posts-button');
    let viewUserCommentsButton = document.querySelector('#view-user-comments-button');

    viewUserPostsButton.addEventListener('click', onviewUserPostsClick);
    viewUserCommentsButton.addEventListener('click', onviewUserCommentsClick);

    // console.log(document.querySelectorAll('.profile-user-info-field'));
    document.querySelectorAll('.profile-user-info-field').forEach(function(el) {
      el.addEventListener('click', function() {
        let inputToFocus = this.getElementsByTagName('input')[0];
        if (document.activeElement != inputToFocus) {
          let originalValue = inputToFocus.value;
          inputToFocus.value = '';
          inputToFocus.focus();
          inputToFocus.value = originalValue;
        }
      });
    });

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

    window.pagesDisplayed = 0;
    let access_token = Login.getCookie("access_token");

    // Fetch profile info or redirect to homepage
    if (typeof(access_token) == "string") {
      document.querySelector('.profile-username').innerText = Login.getCookie('username');
      getProfile(access_token).then(response => {
        return handleProfileResponse(response);
      }).then(() => {
        let access_token = Login.getCookie("access_token");
        return getPostsByUser(access_token).then(response => {
          if (response.name == "Error") {
            logout();
            window.location.href = "/";
          }
          return response;
        });
      }).then(response => {
        if (response.name == "Error") {
          console.log("got an error trying to get posts for user, perhaps the access_token is expired");
        } else {
          Postfeed.appendToFeed(response, window.pagesDisplayed + 1);
        }
      });
      getCommentsByUser(access_token).then(res =>{
        res.forEach(element => {
          Commentfeed.populateExistingComment(element, true)
        });
      });
    } else {
      window.location.href = '/';
    }
  }
}

export default Profile;
