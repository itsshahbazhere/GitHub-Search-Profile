const theme = document.querySelector("[data-theme]");
const themeName = document.querySelector("[data-themeName]");
const themeIcon = document.querySelector("[data-themeIcon]");
const container = document.querySelector("[data-container]");
const header = document.querySelector("[data-header]");
const searchInput = document.querySelector("[data-searchInput]");
const userInformation = document.querySelector("[data-userInformation]");
const followersContainer = document.querySelector("[data-followersContainer]");
const input = document.querySelector("[data-input]");
const followingCount = document.querySelector("[data-followingCount]");
const nameMy = document.querySelector("[data-name]");
const xMark = document.querySelector("[data-xMark]");
const button = document.querySelector("[data-button]");
const imgIcon = document.querySelector("[data-imgIcon]");
const wrongInput = document.querySelector("[data-wrongInput]");
const wrongInputMobile = document.querySelector("[data-wrongInputMobile]");



darkTheme();
fetchUserInfo("shahbazalam26");

let currentTheme = 'dark';
theme.addEventListener('click', ()=>{

    if(currentTheme === 'dark'){
        lightTheme();
        currentTheme = 'light';
    }
    else{
        darkTheme();
        currentTheme = 'dark';
    }

});

function darkTheme(){
    themeIcon.innerHTML = '<i class="fa-regular fa-sun"></i>'
    themeName.innerHTML = '<p>Light</p>'
    container.style.backgroundColor = "#141d2f";
    searchInput.style.backgroundColor = "#1e2a47";
    userInformation.style.backgroundColor = "#1e2a47";
    followersContainer.style.backgroundColor = "#141d2f";
    followingCount.style.color = "white";
    container.style.color = "white";
    nameMy.style.color = "white";
}
function lightTheme(){
    themeIcon.innerHTML = '<i class="fa-solid fa-moon "></i>'
    themeName.innerHTML = '<p>Dark</p>'
    container.style.backgroundColor = "#f6f8ff";
    searchInput.style.backgroundColor = "#fefefe";
    userInformation.style.backgroundColor = "#fefefe";
    followersContainer.style.backgroundColor = "#f6f8ff";
    followingCount.style.color = "#4b6a9b";
    container.style.color = "#4b6a9b";
    nameMy.style.color = "#4b6a9b";

}

xMark.addEventListener('click', ()=>{
    input.value = "";
    wrongInput.innerText = "";
    wrongInputMobile.innerText = "";
});


//API call

async function fetchUserInfo(username) {
    try {

        wrongInput.innerText = "";
        wrongInputMobile.innerText = "";

        const response = await fetch(`https://api.github.com/users/${username}`);
        
        // Check if the response is not OK (status code 200-299)
        if (!response.ok) {
            throw new Error('User not found'); // Throw an error with a specific message
        }
        const data = await response.json();   
        renderUserData(data);
        
    } catch (err) {

        wrongInput.innerText = "no search results"; // Display a more specific message
        wrongInputMobile.innerText = "no search results"; // Display a more specific message
        console.error('Error fetching user info:', err);
        
    }
}


function renderUserData(personInfo){
    const userName = document.querySelector("[data-userName]");
    const joinedDate = document.querySelector("[data-joinedDate]");
    const bio = document.querySelector("[data-bio]");
    const repos = document.querySelector("[data-repos]");
    const followers = document.querySelector("[data-followers]");
    const following = document.querySelector("[data-following]");
    const location = document.querySelector("[data-location]");
    const blog = document.querySelector("[data-blog]");
    const twitter = document.querySelector("[data-twitter]");
    const company = document.querySelector("[data-company]");

    nameMy.innerText = personInfo?.name;
    bio.innerText = personInfo?.bio;
    repos.innerText = personInfo?.public_repos;
    followers.innerText = personInfo?.followers;
    following.innerText = personInfo?.following;
    location.innerText = personInfo?.location? personInfo.location : "Not Available";
    blog.innerText = personInfo?.blog? personInfo.blog : "Not Available";
    blog.href = personInfo?.blog;
   
    twitter.innerText = personInfo?.twitter_username ? personInfo.twitter_username : "Not Available";
    twitter.href = personInfo?.twitter_username? `https://www.twitter.com/${personInfo.twitter_username}`: "#";

    company.innerText = personInfo?.company ? personInfo.company : 'Not Available';
 
    imgIcon.src = personInfo?.avatar_url;
    userName.href = personInfo?.html_url;
    userName.innerText = `@${personInfo?.login}`;
   
    const dateString = personInfo?.created_at;
    const date  = new Date(dateString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getUTCDate();
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    
    joinedDate.innerText = `Joined ${day} ${month} ${year}`;

}
button.addEventListener('click', () => {
    const username = input.value; 
    fetchUserInfo(username);
});