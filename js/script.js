const inputSearch = document.querySelector(".inputSearch");
const inputBx = document.querySelector(".inputBx");
const search_btn = document.querySelector(".search_btn");
const userInfoBx = document.querySelector("#userInfoBx");
const main = document.querySelector("#main");

const API_URL = "https://api.github.com/users/";

search_btn.addEventListener("click", () => {
    inputSearch.classList.toggle('active');
    inputBx.focus();
});

async function getUser(username) {
    const resp = await fetch(API_URL + username);
    const respData = await resp.json();
    createUserCard(respData);
    getRepos(username);
}

async function getRepos(username) {
    const resp = await fetch(API_URL + username + "/repos");
    const respData = await resp.json();
    addReposToCard(respData);  
}

function createUserCard(user) {
    const cardHTML =
    `
    <div class="userImg">
        <img src="${user.avatar_url}" alt="${user.name}">
    </div>
    <div class="user_gitData">
        <h2 class="userName"><a href="${user.html_url}" target="_blank">${user.name}</a></h2>
        <p class="userBio">${user.bio}</p>
        <ul>
            <li>${user.followers} Followers</li>
            <li>${user.following} Following</li>
            <li>${user.public_repos} repositeries</li>
        </ul>
        <ul id="reposBx">
        </ul> 
    </div>
    `;
    userInfoBx.innerHTML = cardHTML;    
};
function addReposToCard(repos) {
    const reposBx = document.querySelector("#reposBx");
    repos.forEach(repo => {
        const repoItem = document.createElement('a');
        repoItem.classList.add("repoItem");
        repoItem.href = repo.html_url;
        repoItem.innerText = repo.name;
        repoItem.target = "_blank";
        reposBx.appendChild(repoItem);
        // console.log(repos);
    });
}
inputSearch.addEventListener('click', e => {
    e.preventDefault();
    const user = inputBx.value;
    if(user){
        getUser(user);
    }
});