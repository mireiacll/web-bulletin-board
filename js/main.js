document.addEventListener("DOMContentLoaded",init);

async function init(){
    const [posts, users] = await Promise.all([
        getPosts(),
        getUsers()
    ]);
    displayPosts(posts,users);
}

function displayPosts(posts,users){
    const tableBody = document.getElementById("postTableBody");
    posts.forEach(post => {
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