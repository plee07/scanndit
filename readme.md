
# Scanndit

**GA Project 1 - Readme**

**Project Members: Davis Allen, Phil Lee**

---

**Explanations of the technologies used.**

>Technologies Used:\
**Languages/Framework**: JavaScript, HTML, CSS, Bootstrap.\
**Tools**: Balsamiq (Wire frame), Zoom (Video conferencing)

**A couple of paragraphs about the general approach you took.**

> This project was developed using the DRY and KISS principle and therefore there was a heavy focus on modulaization. Both pair and individual programming were performed. The general template layout and file structure of the project was built through pair programming and the individual work was divided based on user stories. In order to keep the team working together they tackled different user stories from the same features. This allowed the members to independently work on a story but also forced them to have frequent pair programming sessions where they shared, discussed, combined, and refactored their code into reusable components.\

> Functions were organized and stored in different script files. All functions pertaining to API calls were stored in the api.js file, all functions related to posts were stored in post.js, etc. No global variables were defined. Each feature calls a function upon DOMContentLoaded where variables are defined locally and relevant functions are called.


**Descriptions of any unsolved problems or major hurdles you had to overcome.**

> **Delete Post** - unable to call the 'delete post by id' API **(Unresolved)**

> **Transfering post details between pages** - When a user clicks on a post he will be directed to a comments page where a GET request ('get comments by Post Id') will be called. The request returns an array of objects that represent the details of the comment as well as the original post details. The teams initial approach was to pass in the post ID from the landing page to the comments page as a hash parameter in the URL. However, we noted that if a posting had no comments, the GET request will return an empty array and therefore, access to the posting detail was lost. In order to resolve this issue, the team decided to store a key value { postId: post-details } pair in local session once a user clicks on a post and the comments page will retrieve the post details from local storage. **(Resolved)**

> **Managing user login state** - One of the difficulty the team faced early on was maintaining a user's login state as they navigate to the different pages.


**A link to your planning documentation for how you broke down this project with deliverables and timelines.**

> **Goals**\
    **9/24** - User Stories, Wire frame, Set up enviornment and file structure\
    **9/25** - Landing page (view all post), Comments page, Login/Sign-up\
    **9/26** - Navigation menu, Profile Page, Delete posts/comments \
    **9/27** - Unit Testing, Styling updates, Extra features\
    **9/28** - Unit Testing, Styling updates, Extra features\
    **9/24 - 9/28** - Pair programming to refactor, updating/adding user stories
    
**Installation instructions for any dependencies.**

> N/A

**A link to your user stories — who your users are, what they want, and why.**

> Our user base is your average everyday person who seeks a platform to communicate with others worldwide. A user is typically busy and do not have the time to learn how to use a product. Therefore, a minimalist approach was taken and the UI was built to be intutive for those with no prior knowledge of the app.\

>Scandit User Stories - https://www.pivotaltracker.com/n/projects/2400268

**A link to your wireframes — sketches of major views or interfaces in your application.**

> Note: This is our original wire frame and our final design has changed sligthly.

![](Scanndit_Wire_Frame.png)
