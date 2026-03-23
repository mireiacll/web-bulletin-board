// handle all the HTTP requests
//const API_BASE_URL = "https://jsonplaceholder.typicode.com"
//const API_BASE_URL = "http://localhost:3000";
const API_BASE_URL = (window.location.hostname === "localhost" || window.location.hostname === "")
    ? "http://localhost:3000"
    : "https://jsonplaceholder.typicode.com";

async function getPosts() {
    const response =  await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
}

async function getUsers() {
    const response =  await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
}

async function getPost(id){
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
}

async function getComments(postId){
    const response = await fetch(`${API_BASE_URL}/comments?postId=${postId}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
}

async function createComment(commentData){
    const response = await fetch(`${API_BASE_URL}/comments`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(commentData)
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
}

async function deleteComment(id) {
    const response = await fetch(`${API_BASE_URL}/comments/${id}`,{
        method: "DELETE"
    })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response;
}

async function updateComment(id,data){
    const response = await fetch(`${API_BASE_URL}/comments/${id}`,{
        method: "PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
}

async function createPost(data){
    const response = await fetch(`${API_BASE_URL}/posts`,{
        method: "POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
}

async function deletePost(id){
    await fetch(`${API_BASE_URL}/posts/${id}`,{
        method:"DELETE"
    })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
}

async function updatePost(id,data){
    const response = await fetch(`${API_BASE_URL}/posts/${id}`,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
}