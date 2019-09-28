let Postwidget = {
  render: async function () {
    let view = `
    <div class="post-widget collapsed">
      <div class="post-widget-collapsed">
        <div id="post-widget-collaped-logged-in-button">
          Create New Post
        </div>
        <div class="post-widget-collapsed-logged-out-buttons">
          <span>You must</span>
          <button class="btn btn-outline-primary" type="button" data-toggle="modal" data-target="#loginModal">Log In</button>
          <span>or</span>
          <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#signupModal">Sign Up</button>
          <span>to post</span>
        </div>
      </div>

      <div class="post-widget-submission-box">
        <span class="post-widget-label">Post Title</span>
        <input class="post-submission-title" type="text" name="" value="">
        <span class="post-widget-label">Post Description</span>
        <textarea class="post-submission-body" name="name" rows="3"></textarea>
        <div class="post-widget-bottom-bar">
          <div class="post-widget-options">
          </div>
          <div class="post-widget-buttons">
            <div class="post-widget-logged-in-buttons">
              <button id="cancel-and-collapse-button" class="btn btn-outline-primary" type="button" name="button">Cancel</button>
              <button id="submit-post-button" class="btn btn-primary" type="button" name="button">Submit Post</button>
            </div>
            <div class="post-widget-logged-out-buttons">
              To post you must:
              <button class="btn btn-outline-primary" type="button" data-toggle="modal" data-target="#loginModal">Log In</button>
              or
              <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#signupModal">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    return view;
  },
  afterRender: async function () {
    document.querySelector('.post-widget').addEventListener('transitionrun', function (event) {
      if (event.target == this && event.propertyName == 'max-height') {
        this.getElementsByClassName('post-widget-submission-box')[0].style.visibility = "hidden";
      }
    });

    document.querySelector('.post-widget').addEventListener('transitionend', function (event) {
      if (event.target == this && event.propertyName == 'background-color') {
        this.getElementsByClassName('post-widget-submission-box')[0].style.visibility = "visible";
      }
    });
  },
}

export default Postwidget;
