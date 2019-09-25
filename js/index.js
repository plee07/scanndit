const POSTS_PER_PAGE = 25;


function postClick(event) {
  console.log(this.dataset.postId);
}

function appendToHomepageFeed(data, page) {
  let allPosts = document.querySelector('.all-posts');
  let i1 = ((page - 1) * POSTS_PER_PAGE)
  let i2 = (page * POSTS_PER_PAGE);
  let pageOfPosts = data.slice(i1,i2);
  let postFeed = document.querySelector('.all-posts');
  for (post of pageOfPosts) {
    let postDisplay = document.createElement('div');
    postDisplay.innerText = `${post.user.username}: ${post.title}`;
    postDisplay.setAttribute('data-post-id', post.id);
    postDisplay.addEventListener('click', postClick);
    postFeed.append(postDisplay);
  }
  window.pagesDisplayed++;
}

window.addEventListener('DOMContentLoaded', (event) => {
  // Get first page of posts and append to all-posts div
  window.pagesDisplayed = 0;
  getAllPosts()
    .then(data => appendToHomepageFeed(data, window.pagesDisplayed + 1));

  const loadMoreButton = document.querySelector('.load-more-button');
  loadMoreButton.addEventListener('click',()=>{
    getAllPosts()
    .then(data => appendToHomepageFeed(data, window.pagesDisplayed + 1));
  });


});

