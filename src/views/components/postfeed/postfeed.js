const POSTS_PER_PAGE = 25;

// returns a div element of the post
function postSetUp(post){
  let postDisplay = document.createElement('div');
  let link = document.createElement('a');
  let closeButton = document.createElement('button');

  closeButton.innerText = 'X';
  closeButton.className = "close-btn";
  link.setAttribute("href", `/post/#${post.id}`);
  postDisplay.className = 'user-post';
  postDisplay.innerText = `${post.user.username}: ${post.title}`;
  postDisplay.setAttribute('data-post-id', post.id);
  link.appendChild(postDisplay);
  localStorage.setItem(post.id, JSON.stringify(post));
  sessionStorage.setItem('current-user', post.user.username)
  return link;
}

function appendToHomepageFeed(data, page) {
  let postFeed = document.querySelector('.all-posts');
  data = data.reverse();
  let i1 = ((page - 1) * POSTS_PER_PAGE)
  let i2 = (page * POSTS_PER_PAGE);
  let pageOfPosts = data.slice(i1,i2);
  for (post of pageOfPosts) {
    let postDisplay = postSetUp(post);
    postFeed.append(postDisplay);
  }
  window.pagesDisplayed++;
}

let Postfeed = {
  render : async function () {
    let view = `
    <div class="post-list">
      <div class="all-posts"></div>
      <button id="load-more-button" class="btn btn-light" type="button" name="button" hidden>Load More</button>
    </div>
    `;
    return view;
  },
  afterRender: async function () {},
  appendToFeed: function (data, page) {
    let postFeed = document.querySelector('.all-posts');
    data = data.reverse();
    let i1 = ((page - 1) * POSTS_PER_PAGE)
    let i2 = (page * POSTS_PER_PAGE);
    let pageOfPosts = data.slice(i1,i2);
    for (const post of pageOfPosts) {
      let postDisplay = postSetUp(post);
      postFeed.append(postDisplay);
    }
    window.pagesDisplayed++;
  }
}

export default Postfeed;
