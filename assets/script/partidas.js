const form = document.getElementById("formPartida");
const tabela = document.getElementById("tabelaPartidas").querySelector("tbody");
const selectA = document.getElementById("equipeA");
const selectB = document.getElementById("equipeB");

function carregarEquipes() {
  const equipes = JSON.parse(localStorage.getItem("equipes") || "[]");

  [selectA, selectB].forEach((select) => {
    select.innerHTML = '<option value="">Selecione</option>';
    equipes.forEach((equipe) => {
      const option = document.createElement("option");
      option.value = equipe.nome;
      option.innerText = equipe.nome;
      select.appendChild(option);
    });
  });
}

function carregarPartidas() {
  const partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
  tabela.innerHTML = "";
  partidas.forEach((p) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${p.data} -</td>
        <td>${p.local} -</td>
        <td>${p.equipeA} -</td>
        <td>${p.equipeB}</td>
        <td><button onclick="excluirPartida()">🗑️</button></td>
    `;
    tabela.appendChild(tr);
  });
  const contador = document.getElementById("contadorPartidas");
  contador.textContent = `🔢 Total de partidas agendadas: ${partidas.length}`;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = document.getElementById("dataPartida").value;
  const local = document.getElementById("localPartida").value.trim();
  const equipeA = selectA.value;
  const equipeB = selectB.value;

  if (!data || !local || !equipeA || !equipeB) {
    alert("Preencha todos os campos.");
    return;
  }

  if (equipeA === equipeB) {
    alert("As equipes devem ser diferentes.");
    return;
  }

  const novaPartida = { data, local, equipeA, equipeB };
  const partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
  partidas.push(novaPartida);
  localStorage.setItem("partidas", JSON.stringify(partidas));

  form.reset();
  carregarPartidas();
});

function excluirPartida(index) {
  if (confirm("Deseja realmente excluir esta partida?")) {
    const partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
    partidas.splice(index, 1);
    localStorage.setItem("partidas", JSON.stringify(partidas));
    carregarPartidas();
  }
}

carregarEquipes();
carregarPartidas();
