import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
      .then((response) => response.json())
      .then(setPosts)
      .catch((error) => {
        console.log(error)
      });
  }, []);

  posts.forEach(post=>{
    let postDiv = document.createElement('div');
    postDiv.id = `album-${album.id}`;
    let title = document.createElement('h2');
    let body = document.createElement('p');
    title.textContent = post.title;
    body.textContent = post.body;
    body.classList.add('post-body')
    
    postDiv.appendChild(title);
    postDiv.appendChild(body);
    
    document.querySelector('.App').appendChild(postDiv);
  })
  
  posts.forEach(post=>{
    let postElement = document.getElementById(`post-${post.id}`);
    postElement.addEventListener('click', () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
      .then(response => response.json())
      .then(comments => {
  let commentsContainer = document.createElement('div');
  comments.fo2rEach(comment => {
    let commentElement = document.createElement('p');
    let emailElement = document.createElement('p')
    emailElement.textContent = comment.email
    commentElement.textContent = comment.body;
    commentsContainer.appendChild(commentElement);
    commentsContainer.appendChild(emailElement);
  });
  postElement.appendChild(commentsContainer);
});
    })
  })

  
  
  
  return (
    <div className="App">
    </div>
  );
}

export default App;