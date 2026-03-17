// handle all the HTTP requests
const API_BASE_URL = "https://jsonplaceholder.typicode.com"

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
    return response.json();
}