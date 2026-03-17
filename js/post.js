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

    document
    .getElementById("submitCommentBtn")
    .addEventListener("click", handleAddComment);
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

async function handleAddComment() {
    const nameInput = document.getElementById("commentName");
    const bodyInput = document.getElementById("commentBody");
    const name = nameInput.value;
    const body = bodyInput.value;
    const postId = getPostIdFromURL();

    if (!name || !body) {
        alert("Please fill all fields");
        return;
    }

    const newComment ={
        postId: postId,
        name: name,
        body:body
    };

    const createdDocument = await createComment(newComment);
    addCommentToUI(createdDocument);
    nameInput.value="";
    bodyInput.value="";
}

function addCommentToUI(comment){
    const list = document.getElementById("commentList");
    const li = document.createElement("li");
    const nameEl = document.createElement("strong");
    nameEl.textContent = comment.name;
    const bodyEl = document.createElement("p")
    bodyEl.textContent = comment.body;

    li.appendChild(nameEl);
    li.appendChild(bodyEl);
    list.appendChild(li);
}