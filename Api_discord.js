async function loadMembers() {
  const res = await fetch("http://ton-ip-ou-domaine:5000/members");
  const data = await res.json();

  const list = data.members.map(m => `
    <div class="member">
      <div class="avatar" style="background-image:url('${m.avatar}')">
        <div class="status ${m.status}"></div>
      </div>
      <div class="name">${m.name}</div>
    </div>
  `).join("");

  document.getElementById("memberList").innerHTML =
    "<h3>👥 Membres</h3>" + list;
}

loadMembers();
setInterval(loadMembers, 5000); // refresh auto toutes les 5s