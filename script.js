// Загружаем клиентов из JSON
fetch("clients.json")
  .then(res => res.json())
  .then(data => {
    renderClients(data);
    window.clients = data; // сохраняем в глобальную переменную
  })
  .catch(() => {
    document.querySelector("#clients-table tbody").innerHTML =
      "<tr><td colspan='3'>Ошибка загрузки</td></tr>";
  });

function renderClients(clients) {
  const tbody = document.querySelector("#clients-table tbody");
  tbody.innerHTML = "";
  clients.forEach(client => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${client.name}</td>
      <td>${client.email}</td>
      <td>${client.status}</td>
    `;
    tbody.appendChild(row);
  });
}

// Обработка формы добавления
document.getElementById("client-form").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const status = document.getElementById("status").value;

  const newClient = { name, email, status };
  window.clients.push(newClient);
  renderClients(window.clients);

  // ⚠️ Важно: так как Bunny.net — статический хостинг,
  // изменения не сохранятся в clients.json автоматически.
  // Для реальной базы нужен backend или внешний сервис (например, Firebase, Supabase).
  
  e.target.reset();
});

// Простейший график
const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");
const data = [5, 10, 6, 12, 8, 15, 20];
const maxVal = Math.max(...data);
const stepX = canvas.width / (data.length - 1);
ctx.beginPath();
ctx.moveTo(0, canvas.height - (data[0] / maxVal) * canvas.height);
data.forEach((val, i) => {
  const x = i * stepX;
  const y = canvas.height - (val / maxVal) * canvas.height;
  ctx.lineTo(x, y);
});
ctx.strokeStyle = "#3b82f6";
ctx.lineWidth = 2;
ctx.stroke();