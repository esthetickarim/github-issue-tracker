const API="https://phi-lab-server.vercel.app/api/v1/lab/issues";

const container=document.getElementById("issuesContainer");

const spinner=document.getElementById("spinner");

async function loadAll(){

setActive("allBtn");

spinner.style.display="block";

const res=await fetch(API);
const data=await res.json();

displayIssues(data.data);

spinner.style.display="none";

}

async function loadOpen(){

setActive("openBtn");

spinner.style.display="block";

const res=await fetch(API);
const data=await res.json();

const open=data.data.filter(issue=>issue.status==="open");

displayIssues(open);

spinner.style.display="none";

}

async function loadClosed(){

setActive("closedBtn");

spinner.style.display="block";

const res=await fetch(API);
const data=await res.json();

const closed=data.data.filter(issue=>issue.status==="closed");

displayIssues(closed);

spinner.style.display="none";

}

function displayIssues(issues){

container.innerHTML="";

document.getElementById("issueCount").innerText=issues.length+" Issues";

issues.forEach(issue=>{

const card=document.createElement("div");

card.className="card";

if(issue.status==="open"){

card.style.borderTop="5px solid green";

}else{

card.style.borderTop="5px solid purple";

}

card.innerHTML=`

<h3>${issue.title}</h3>

<p>${issue.description}</p>

<p><b>Status:</b> ${issue.status}</p>

<p><b>Author:</b> ${issue.author}</p>

<p><b>Priority:</b> ${issue.priority}</p>

<p><b>Label:</b> ${issue.label}</p>

<p><b>Date:</b> ${issue.createdAt}</p>

`;

card.onclick=()=>showIssue(issue.id);

container.appendChild(card);

});

}

async function showIssue(id){

const res=await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);

const data=await res.json();

const issue=data.data;

document.getElementById("modalData").innerHTML=`

<h2>${issue.title}</h2>

<p>${issue.description}</p>

<p>Status: ${issue.status}</p>

<p>Author: ${issue.author}</p>

<p>Priority: ${issue.priority}</p>

<p>Label: ${issue.label}</p>

<p>Date: ${issue.createdAt}</p>

`;

document.getElementById("modal").style.display="flex";

}

function closeModal(){

document.getElementById("modal").style.display="none";

}

function setActive(btn){

document.querySelectorAll(".tabs button").forEach(b=>b.classList.remove("active"));

document.getElementById(btn).classList.add("active");

}

async function searchIssue(){

const text=document.getElementById("searchInput").value;

const res=await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);

const data=await res.json();

displayIssues(data.data);

}

loadAll();

// Open and Closed buttons make dynamic:
function updateStatusCounts(issues){

let open = 0;
let closed = 0;

issues.forEach(issue => {

if(issue.status === "open"){
open++;
}

if(issue.status === "closed"){
closed++;
}

});

document.getElementById("openCount").innerText = open;
document.getElementById("closedCount").innerText = closed;

}
fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then(res => res.json())
.then(data => {

displayIssues(data.data);

updateStatusCounts(data.data);

});