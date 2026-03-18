document.addEventListener("DOMContentLoaded",init);

let currentPage = 1;
const postsPerPage = 20;

let allPosts=[];
let allUsers=[];

async function init(){
    const [posts, users] = await Promise.all([
        getPosts(),
        getUsers()
    ]);
    allPosts=posts;
    allUsers=users;
    displayPosts(allPosts,allUsers);
    updatePagination();
    document.getElementById("prevBtn").addEventListener("click",prevPage);
    document.getElementById("nextBtn").addEventListener("click",nextPage);
}

document
.getElementById("createPostBtn")
.addEventListener("click", ()=>{
    window.location.href = "form.html";
});

function displayPosts(posts,users){
    const tableBody = document.getElementById("postTableBody");
    tableBody.innerHTML="";
    const start = (currentPage-1)*postsPerPage;
    const end = start + postsPerPage;
    const paginatedPosts = posts.slice(start,end);
    paginatedPosts.forEach(post => {
        const user = users.find(u => u.id ===post.userId);

        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent=post.id;

        const titleCell = document.createElement("td");
        const titleLink = document.createElement("a");
        titleLink.textContent = post.title;
        titleLink.href = "post.html?id="+post.id;
        titleCell.appendChild(titleLink);

        const usernameCell = document.createElement("td");
        usernameCell.textContent = user.username;

        row.appendChild(idCell);
        row.appendChild(titleCell);
        row.appendChild(usernameCell);

        tableBody.appendChild(row);
    });
}

function nextPage(){
    const totalPages = Math.ceil(allPosts.length/postsPerPage);
    if (currentPage<totalPages){
        currentPage++;
        displayPosts(allPosts,allUsers);
        updatePagination();
    }
}

function prevPage(){
    if (currentPage>1){
        currentPage--;
        displayPosts(allPosts,allUsers);
        updatePagination();
    }
}

function updatePagination(){
    const pageInfo = document.getElementById("pageInfo");
    const totalPages = Math.ceil(allPosts.length / postsPerPage);
    pageInfo.textContent = `Page ${currentPage} / ${totalPages}`;
}