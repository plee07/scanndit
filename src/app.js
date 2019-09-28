"use strict";

import Home from '/src/views/pages/home/home.js';
import Profile from '/src/views/pages/profile/profile.js';

async function onSpaLoad() {
  const content = null || document.getElementsByClassName('page-container')[0];
  // content.innerHTML = await Home.render();
  // await Home.afterRender();
  content.innerHTML = await Profile.render();
  await Profile.afterRender();
}

window.addEventListener('DOMContentLoaded', onSpaLoad);
