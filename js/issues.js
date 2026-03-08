// API URL
const API_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

// Load all issues when page loads
window.onload = loadIssues;


// Function to fetch all issues
function loadIssues(){

fetch(API_URL)
.then(res => res.json())
.then(data => {

displayIssues(data);

})

}

// Show Issues as Cards:
function displayIssues(issues){

const container = document.getElementById("issuesContainer");

container.innerHTML = "";

issues.forEach(issue => {

let borderColor = "border-green-500";

if(issue.status === "closed"){
borderColor = "border-purple-500";
}

const card = `
<div
class="card bg-white shadow-md border-t-4 ${borderColor} cursor-pointer"
onclick="openModal(${issue.id})"
>

<div class="card-body">

<h2 class="card-title">${issue.title}</h2>

<p>${issue.description}</p>

<p class="text-sm">Author: ${issue.author}</p>

<p class="text-sm">Status: ${issue.status}</p>

<p class="text-sm">Label: ${issue.label}</p>

</div>

</div>
`;

container.innerHTML += card;

});

}