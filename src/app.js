"use strict";

import Home from '/src/views/pages/home/home.js';

async function onSpaLoad() {
  const content = null || document.getElementsByClassName('page-container')[0];
  content.innerHTML = await Home.render();
  await Home.afterRender();
}

window.addEventListener('DOMContentLoaded', onSpaLoad);
