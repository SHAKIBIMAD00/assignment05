const names=[
"Shakibul Hasan",
"Kanok Bro",
"Saad Hossen",
"Saiyan",
"Mushfiq"

]

const titles=[
"Fix Login Authentication Bug",
"Improve Dashboard UI Design",
"Mobile Responsive Layout Issue",
"Search Function Not Working",
"Add Dark Mode Feature"
]

const desc=[

"Login authentication sometimes fails when users try to sign in.",
"The dashboard layout needs visual improvements and spacing fixes.",
"Responsive layout breaks on smaller screen sizes.",
"Search feature does not return correct filtered results.",
"Users requested dark mode for better night usability."

]

const issues=[]

for(let i=1;i<=20;i++){

issues.push({

id:i,
title:titles[Math.floor(Math.random()*titles.length)],
description:desc[Math.floor(Math.random()*desc.length)],
status:i%3===0?"closed":"open",
priority:i%4===0?"LOW":(i%2===0?"HIGH":"MEDIUM"),
author:names[Math.floor(Math.random()*names.length)],
date:new Date().toLocaleString(),
tags:i%3===0?["ENHANCEMENT"]:["BUG","HELP WANTED"]

})

}


function renderIssues(data){

const list=document.getElementById("issue-list")

list.innerHTML=""

document.getElementById("issue-count").innerText=data.length+" Issues"

data.forEach(item=>{

const priorityClass=item.priority==="HIGH"?"p-high":item.priority==="MEDIUM"?"p-med":"p-low"

const card=document.createElement("div")

card.className="card "+item.status

card.innerHTML=`

<span class="priority-label ${priorityClass}">${item.priority}</span>

<h3>${item.title}</h3>

<p>${item.description.substring(0,60)}...</p>

<div class="tag-container">

${item.tags.map(t=>`<span class="tag tag-${t.toLowerCase()}">${t}</span>`).join("")}

</div>

<div style="font-size:11px;color:#94a3b8;margin-top:10px">

#${item.id} by ${item.author}<br>
${item.date}

</div>

`

card.onclick=()=>openPopup(item)

list.appendChild(card)

})

}



document.getElementById("login-btn").onclick=()=>{

document.getElementById("login-page").classList.add("hide")
document.getElementById("dashboard").classList.remove("hide")

renderIssues(issues)

}


function openPopup(item){

document.getElementById("modal-title").innerText=item.title

document.getElementById("modal-status").innerText=item.status

document.getElementById("modal-author-info").innerText=`Opened by ${item.author} • ${item.date}`

document.getElementById("modal-desc").innerText=item.description

document.getElementById("modal-assignee").innerText=item.author

document.getElementById("modal-priority").innerText=item.priority

document.getElementById("modal-tags").innerHTML=item.tags.map(t=>`<span class="tag tag-${t.toLowerCase()}">${t}</span>`).join("")

document.getElementById("issue-popup").classList.remove("hide")

}


document.getElementById("close-popup-btn").onclick=()=>{

document.getElementById("issue-popup").classList.add("hide")

}


document.getElementById("search-box").oninput=(e)=>{

const val=e.target.value.toLowerCase()

const filtered=issues.filter(i=>i.title.toLowerCase().includes(val))

renderIssues(filtered)

}


function filterData(type){

if(type==="all")renderIssues(issues)

if(type==="open")renderIssues(issues.filter(i=>i.status==="open"))

if(type==="closed")renderIssues(issues.filter(i=>i.status==="closed"))

}