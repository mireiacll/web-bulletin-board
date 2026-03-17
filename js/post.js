document.addEventListener("DOMContentLoaded", init);

async function init() {
    const postId = getPostIdFromURL();
    //slightly faster wait because doesn't wait after each request but alltogether
    const [post, users, comments] = await Promise.all([
        getPost(postId),
        getUsers(),
        getComments(postId)
    ]);
    
    displayPost(post, users);
    displayComments(comments);
}

function getPostIdFromURL(){
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function displayPost(post,users){
    const titleEl = document.getElementById("postTitle");
    const authorEl = document.getElementById("postAuthor");
    const bodyEl = document.getElementById("postBody");

    const user = users.find(u=> u.id === post.userId);

    titleEl.textContent = post.title;
    authorEl.textContent = "by: " + user.username;
    bodyEl.textContent = post.body;
}

function displayComments(comments){
    const list = document.getElementById("commentList");
    comments.forEach(comment=>{
        const li=document.createElement("li");
        const name = document.createElement("strong");
        name.textContent = comment.name;
        const text = document.createElement("p");
        text.textContent = comment.body;


        li.appendChild(name);
        li.appendChild(text);
        list.appendChild(li);
    });
}