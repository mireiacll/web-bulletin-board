document.addEventListener("DOMContentLoaded", init);

async function init() {
    const postId = getPostIdFromURL();
    //slightly faster wait because doesn't wait after each request but alltogether
    try {
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

        document
        .getElementById("editPostBtn")
        .addEventListener("click",()=>{
            const postId = getPostIdFromURL();
            window.location.href=`form.html?id=${postId}`;
        })

        document
        .getElementById("deletePostBtn")
        .addEventListener("click", async()=>{
            const postId = getPostIdFromURL();
            const confirmDelete = confirm("Delete this post?");
            if(!confirmDelete) return;
            try {
                // delete related comments first
                const comments = await getComments(postId);
                await Promise.all(
                    comments.map(c => deleteComment(c.id))
                );
                // then delete post
                await deletePost(postId);
                window.location.href = "index.html";
            } catch (error) {
                alert("Error deleting post");
            }
            window.location.href=`index.html`
        });

        document
        .getElementById("backToListBtn")
        .addEventListener("click",()=>{
            window.location.href = "index.html"
        })
    } catch (error){
        alert("Error getting post id");
    }
}

function getPostIdFromURL(){
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function displayPost(post,users){
    const titleEl = document.getElementById("postTitle");
    const authorEl = document.getElementById("postAuthor");
    const bodyEl = document.getElementById("postBody");

    const user = users.find(
        u => Number(u.id) === Number(post.userId)
    );

    titleEl.textContent = post.title;
    authorEl.textContent = `by: ${user.username} (${user.name} - ${user.email})`;
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

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent="Delete";
        deleteBtn.addEventListener("click",()=>{
            handleDeleteComment(comment.id,li);
        })
        
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click",()=>{
            handleEditComment(comment,li,editBtn,deleteBtn);
        });

        li.appendChild(name);
        li.appendChild(text);
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
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

    const deleteBtn = document.createElement("button");
        deleteBtn.textContent="Delete";
        deleteBtn.addEventListener("click",()=>{
            handleDeleteComment(comment.id,li);
        })
        
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click",()=>{
            handleEditComment(comment,li,editBtn,deleteBtn);
        });

        li.appendChild(nameEl);
        li.appendChild(bodyEl);
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        list.appendChild(li);
}

async function handleDeleteComment(commentId, liElement){
    const confirmDelete = confirm("Delete this comment?");
    if (!confirmDelete) return;

    await deleteComment(commentId);

    liElement.remove();
}

function handleEditComment(comment,liElement, editBtn, deleteBtn){
    if (liElement.querySelector("textarea")) return; // prevent multiple edits at the same time
    editBtn.disabled = true;
    deleteBtn.disabled = true;

    const nameElement = liElement.querySelector("strong");
    const nameInput = document.createElement("input");
    nameInput.value = comment.name;
    const textElement = liElement.querySelector("p");
    const textarea = document.createElement("textarea");
    textarea.value = comment.body;
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";

    liElement.replaceChild(nameInput, nameElement);
    liElement.replaceChild(textarea,textElement);
    liElement.appendChild(saveBtn);
    liElement.appendChild(cancelBtn);

    nameInput.focus();

    saveBtn.addEventListener("click", async()=>{
        const updatedComment = {
            ...comment,
            name: nameInput.value,
            body: textarea.value
        };
        await updateComment(comment.id,updatedComment);

        comment.name = nameInput.value;
        comment.body = textarea.value;
        
        nameElement.textContent = nameInput.value;
        textElement.textContent = textarea.value;

        liElement.replaceChild(nameElement, nameInput);
        liElement.replaceChild(textElement, textarea);

        saveBtn.remove();
        cancelBtn.remove();
        editBtn.disabled=false;
        deleteBtn.disabled=false;
    });

    cancelBtn.addEventListener("click", ()=>{
        liElement.replaceChild(nameElement, nameInput);
        liElement.replaceChild(textElement, textarea);
        saveBtn.remove();
        cancelBtn.remove();
        editBtn.disabled=false;
        deleteBtn.disabled=false;
    });
}