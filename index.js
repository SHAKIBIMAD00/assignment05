const names = [
  "Shakibul Hasan",
  "Kanok Bro",
  "Saad Hossen",
  "Saiyan",
  "Mushfiq"
];

const titles = [
  "Fix Login Authentication Bug",
  "Improve Dashboard UI Design",
  "Mobile Responsive Layout Issue",
  "Search Function Not Working",
  "Add Dark Mode Feature"
];

const desc = [
  "Login authentication sometimes fails when users try to sign in.",
  "The dashboard layout needs visual improvements and spacing fixes.",
  "Responsive layout breaks on smaller screen sizes.",
  "Search feature does not return correct filtered results.",
  "Users requested dark mode for better night usability."
];

const openIcon = document.getElementById("open-icon").src;
const closedIcon = document.getElementById("closed-icon").src;


const issues = [];

function formatDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
}

for (let i = 1; i <= 25; i++) {
  issues.push({
    id: i,
    title: titles[Math.floor(Math.random() * titles.length)],
    description: desc[Math.floor(Math.random() * desc.length)],
    status: i % 3 === 0 ? "closed" : "open",
    priority: i % 4 === 0 ? "LOW" : (i % 2 === 0 ? "HIGH" : "MEDIUM"),
    author: names[Math.floor(Math.random() * names.length)],
    date: formatDate(new Date()),
    tags: i % 3 === 0 ? ["ENHANCEMENT"] : ["BUG", "HELP WANTED"]
  });
}

function getPriorityClass(priority) {
  if (priority === "HIGH") return "p-high";
  if (priority === "MEDIUM") return "p-med";
  return "p-low";
}

function getPriorityModalClass(priority) {
  if (priority === "HIGH") return "priority-high";
  if (priority === "MEDIUM") return "priority-medium";
  return "priority-low";
}

function renderIssues(data) {
  const list = document.getElementById("issue-list");
  list.innerHTML = "";

  document.getElementById("issue-count").innerHTML = `<b>${data.length} Issues</b>`;

  data.forEach((item) => {
    const priorityClass = getPriorityClass(item.priority);

    const card = document.createElement("div");
    card.className = `card ${item.status}`;

    card.innerHTML = `
      <div class="card-body">
        <div class="card-top">
          <div class="status-icon">
            <img src="${item.status === "open" ? openIcon : closedIcon}" alt="${item.status}">
          </div>
          <span class="priority-label ${priorityClass}">${item.priority}</span>
        </div>

       <div class="title-row">
  <h3>${item.title}</h3>
</div>

        <p>${item.description.length > 75 ? item.description.substring(0, 75) + "..." : item.description}</p>

        <div class="tag-container">
          ${item.tags.map(tag => {
            let cls = "";
            if (tag === "BUG") cls = "tag-bug";
            else if (tag === "HELP WANTED") cls = "tag-help";
            else cls = "tag-enhancement";

            return `<span class="tag ${cls}">${tag}</span>`;
          }).join("")}
        </div>
      </div>

      <div class="card-footer">
        #${item.id} by ${item.author}<br>
        ${item.date}
      </div>
    `;

    card.onclick = () => openPopup(item);
    list.appendChild(card);
  });
}

function openPopup(item) {
  document.getElementById("modal-title").innerText = item.title;

  const modalStatus = document.getElementById("modal-status");
  modalStatus.innerText = item.status.toUpperCase();
  modalStatus.className = "status-btn-modal " + (item.status === "open" ? "status-open" : "status-closed");

  document.getElementById("modal-author-info").innerText = `Opened by ${item.author} • ${item.date}`;
  document.getElementById("modal-desc").innerText = item.description;
  document.getElementById("modal-assignee").innerText = item.author;

  const modalPriority = document.getElementById("modal-priority");
  modalPriority.innerText = item.priority;
  modalPriority.className = "priority-pill " + getPriorityModalClass(item.priority);

  document.getElementById("modal-tags").innerHTML = item.tags.map(tag => {
    let cls = "";
    if (tag === "BUG") cls = "tag-bug";
    else if (tag === "HELP WANTED") cls = "tag-help";
    else cls = "tag-enhancement";

    return `<span class="tag ${cls}">${tag}</span>`;
  }).join("");

  document.getElementById("issue-popup").classList.remove("hide");
}

document.getElementById("login-btn").onclick = () => {
  document.getElementById("login-page").classList.add("hide");
  document.getElementById("dashboard").classList.remove("hide");
  renderIssues(issues);
};

document.getElementById("close-popup-btn").onclick = () => {
  document.getElementById("issue-popup").classList.add("hide");
};

document.getElementById("issue-popup").addEventListener("click", (e) => {
  if (e.target.id === "issue-popup") {
    document.getElementById("issue-popup").classList.add("hide");
  }
});

document.getElementById("search-box").oninput = (e) => {
  const val = e.target.value.toLowerCase().trim();

  const filtered = issues.filter(issue =>
    issue.title.toLowerCase().includes(val) ||
    issue.description.toLowerCase().includes(val) ||
    issue.author.toLowerCase().includes(val)
  );

  renderIssues(filtered);
};