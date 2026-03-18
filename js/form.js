document.addEventListener("DOMContentLoaded",init);

async function init(){
    const postId = getPostIdFromURL();
    if(postId){ // edit
        document.getElementById("formTitle").textContent = "Edit Post";
        const post = await getPost(postId);
        fillForm(post);    
    }
    document
    .getElementById("submitPostBtn")
    .addEventListener("click",handleSubmit);

    document.
    getElementById("cancelPostBtn")
    .addEventListener("click",()=>{
        //window.location.href = "index.html";
        window.history.back()
    });
}

function getPostIdFromURL(){
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function fillForm(post){
    document.getElementById("titleInput").value = post.title;
    document.getElementById("bodyInput").value = post.body;
    currentUserId = post.userId;
}

async function handleSubmit(){
    const title = document.getElementById("titleInput").value;
    const body = document.getElementById("bodyInput").value;

    if(!title||!body){
        alert("Fill all fields");
        return;
    };
    const postId = getPostIdFromURL();
    const postData = {
        title: title,
        body:body,
        userId: currentUserId //Required by the API
    };

    try{
        if (postId){
            await updatePost(postId,postData);
        } else{
            await createPost(postData);
        }
        window.history.back()
    } catch(errort){
        alert("Error saving post");
    }
}