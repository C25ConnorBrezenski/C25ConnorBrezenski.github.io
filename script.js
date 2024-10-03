// Load posts from JSON
fetch('posts.json')
  .then(response => response.json())
  .then(data => {
    const feed = document.getElementById('feed');
    data.posts.forEach(post => {
      const postElement = createPost(post);
      feed.appendChild(postElement);
    });
  })
  .catch(error => console.error('Error loading posts:', error));

// Function to create a post element
function createPost(post) {
  // Create main post container
  const postDiv = document.createElement('div');
  postDiv.className = 'post';

 // Post Header
 const postHeader = document.createElement('div');
 postHeader.className = 'post-header';

 const postUser = document.createElement('div');
 postUser.className = 'post-user';

 const userImg = document.createElement('img');
 userImg.src = post.userAvatar;
 userImg.alt = post.username;

 // Username container
 const usernameContainer = document.createElement('div');
 usernameContainer.className = 'username-container';

 const username = document.createElement('span');
 username.className = 'username';
 username.textContent = post.username;

 usernameContainer.appendChild(username);

 // Check if the account is verified
 if (post.isVerified) {
   const verifiedIcon = document.createElement('img');
   verifiedIcon.src = 'icons/verified.png'; // Path to your verified icon
   verifiedIcon.alt = 'Verified';
   verifiedIcon.className = 'verified-icon';
   usernameContainer.appendChild(verifiedIcon);
 }

 postUser.appendChild(userImg);
 postUser.appendChild(usernameContainer);
 postHeader.appendChild(postUser);

  // Post Media
  const postMedia = document.createElement('div');
  postMedia.className = 'post-media';

  if (post.type === 'image') {
    const img = document.createElement('img');
    img.src = post.media;
    img.alt = '';
    postMedia.appendChild(img);
  } else if (post.type === 'video') {
    const video = document.createElement('video');
    video.src = post.media;
    video.controls = true;
    postMedia.appendChild(video);
  }

  // Post Footer
  const postFooter = document.createElement('div');
  postFooter.className = 'post-footer';

  const actions = document.createElement('div');
  actions.className = 'actions';

  const likeIcon = document.createElement('img');
  likeIcon.src = 'icons/like.png'; // Replace with your like icon path
  likeIcon.alt = 'Like';
  likeIcon.className = 'action-icon';

  const commentIcon = document.createElement('img');
  commentIcon.src = 'icons/comment.png'; // Replace with your comment icon path
  commentIcon.alt = 'Comment';
  commentIcon.className = 'action-icon';

  const shareIcon = document.createElement('img');
  shareIcon.src = 'icons/share.png'; // Replace with your share icon path
  shareIcon.alt = 'Share';
  shareIcon.className = 'action-icon';

  actions.appendChild(likeIcon);
  actions.appendChild(commentIcon);
  actions.appendChild(shareIcon);

  const likes = document.createElement('div');
  likes.className = 'likes';
  likes.textContent = `${post.likes} likes`;

  const caption = document.createElement('div');
  caption.className = 'caption';

  const captionUsername = document.createElement('span');
  captionUsername.className = 'username';
  captionUsername.textContent = post.username;

  const captionText = document.createElement('span');
  captionText.textContent = ` ${post.caption}`;

  caption.appendChild(captionUsername);
  caption.appendChild(captionText);

  // Append elements to post footer
  postFooter.appendChild(actions);
  postFooter.appendChild(likes);
  postFooter.appendChild(caption);

  // Append all to post container
  postDiv.appendChild(postHeader);
  postDiv.appendChild(postMedia);
  postDiv.appendChild(postFooter);

  return postDiv;
}
