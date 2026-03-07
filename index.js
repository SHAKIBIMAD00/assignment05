// 1. Array with 15 Issues
const issuesData = [];
for (let i = 1; i <= 15; i++) {
    issuesData.push({
        id: i,
        title: i === 3 ? "Fix broken image uploads" : "Fix Navigation Menu Issue #" + i,
        description: "The navigation menu doesn't collapse properly on mobile devices. This needs an urgent fix using media queries and DOM logic.",
        status: i % 3 === 0 ? "closed" : "open", // Every 3rd is closed
        priority: i % 2 === 0 ? "HIGH" : "MEDIUM",
        author: i === 3 ? "Fahim Ahmed" : "shakib_hasan",
        date: i === 3 ? "22/02/2026" : "15/01/2024"
    });
}

// 2. Login Logic
document.getElementById('login-btn').onclick = function() {
    const user = document.getElementById('user-input').value;
    const pass = document.getElementById('pass-input').value;

    if(user === "admin" && pass === "admin123") {
        document.getElementById('login-page').classList.add('hide');
        document.getElementById('dashboard').classList.remove('hide');
        renderCards(issuesData);
    } else {
        alert("Invalid Username or Password!");
    }
};

// 3. Render Cards Function
function renderCards(data) {
    const list = document.getElementById('issue-list');
    list.innerHTML = "";
    document.getElementById('issue-count').innerText = data.length + " Issues Found";

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = `card ${item.status}`;
        card.innerHTML = `
            <span class="priority-tag">${item.priority}</span>
            <h3>${item.title}</h3>
            <p>${item.description.substring(0, 60)}...</p>
            <div style="font-size:12px; color:#888; margin-top:15px; border-top: 1px solid #eee; padding-top:10px;">
                #${item.id} by ${item.author} <span style="float:right">${item.date}</span>
            </div>
        `;
        card.onclick = () => openPopup(item);
        list.appendChild(card);
    });
}

// 4. Search Functionality (FIXED)
document.getElementById('search-box').oninput = function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = issuesData.filter(issue => 
        issue.title.toLowerCase().includes(searchTerm) || 
        issue.description.toLowerCase().includes(searchTerm)
    );
    renderCards(filtered);
};

// 5. Tab Filtering
function filterData(status) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if(status === 'all') {
        renderCards(issuesData);
    } else {
        const filtered = issuesData.filter(i => i.status === status);
        renderCards(filtered);
    }
}

// 6. Popup Logic (OPEN & CLOSE)
function openPopup(item) {
    document.getElementById('modal-title').innerText = item.title;
    document.getElementById('modal-status').innerText = item.status.toUpperCase();
    document.getElementById('modal-status').style.background = item.status === 'open' ? '#28a745' : '#6f42c1';
    document.getElementById('modal-author-info').innerText = `Opened by ${item.author} • ${item.date}`;
    document.getElementById('modal-desc').innerText = item.description;
    document.getElementById('modal-assignee').innerText = item.author;
    document.getElementById('modal-priority').innerText = item.priority;
    
    document.getElementById('issue-popup').classList.remove('hide');
}

// CLOSE BUTTON FIX
document.getElementById('close-popup-btn').onclick = function() {
    document.getElementById('issue-popup').classList.add('hide');
};

// Click outside to close
window.onclick = function(event) {
    const popup = document.getElementById('issue-popup');
    if (event.target == popup) {
        popup.classList.add('hide');
    }
}