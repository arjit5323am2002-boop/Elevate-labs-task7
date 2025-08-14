const userContainer = document.getElementById("userContainer");
const reloadBtn = document.getElementById("reloadBtn");

async function fetchUsers() {
    // Disable reload button while fetching
    reloadBtn.disabled = true;
    userContainer.innerHTML = `<div class="loader"></div>`;

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const users = await response.json();
        displayUsers(users);

    } catch (error) {
        userContainer.innerHTML = `<p style="color:red; font-size:1.1rem;">⚠️ Error: ${error.message}</p>`;
    } finally {
        reloadBtn.disabled = false;
    }
}

function displayUsers(users) {
    userContainer.innerHTML = "";
    users.forEach(user => {
        const card = document.createElement("div");
        card.className = "user-card";
        card.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>📧 Email:</strong> ${user.email}</p>
            <p><strong>🏠 Address:</strong> ${user.address.street}, ${user.address.city}</p>
            <p><strong>📞 Phone:</strong> ${user.phone}</p>
            <p><strong>🌐 Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
            <p><strong>🏢 Company:</strong> ${user.company.name}</p>
        `;
        userContainer.appendChild(card);
    });
}

reloadBtn.addEventListener("click", fetchUsers);

fetchUsers();
