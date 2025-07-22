const form = document.getElementById("formEquipe");
const tabela = document.getElementById("tabelaEquipes").querySelector("tbody");

function carregarEquipes() {
  const equipes = JSON.parse(localStorage.getItem("equipes") || "[]");
  tabela.innerHTML = "";

  equipes.forEach((eq, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${eq.nome}</td>
      <td>${eq.modalidade}</td>
      <td><button onclick="abrirModalEditarEquipe(${i})">✏️ Editar</button></td>
    `;
    tabela.appendChild(tr);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nomeEquipe").value.trim();
  const modalidade = document.getElementById("modalidade").value.trim();

  if (!nome || !modalidade) {
    alert("Preencha todos os campos.");
    return;
  }

  const novaEquipe = { nome, modalidade };
  const equipes = JSON.parse(localStorage.getItem("equipes") || "[]");

  equipes.push(novaEquipe);
  localStorage.setItem("equipes", JSON.stringify(equipes));

  form.reset();
  carregarEquipes();
});

carregarEquipes();

let indiceEquipeEditando = null;

function abrirModalEditarEquipe(index) {
  const equipes = JSON.parse(localStorage.getItem("equipes") || "[]");
  const equipe = equipes[index];

  indiceEquipeEditando = index;
  document.getElementById("editNomeEquipe").value = equipe.nome;
  document.getElementById("editModalidadeEquipe").value = equipe.modalidade;
  document.getElementById("modalEditarEquipe").classList.remove("hidden");
}

function fecharModalEquipe() {
  document.getElementById("modalEditarEquipe").classList.add("hidden");
  indiceEquipeEditando = null;
}

function salvarEdicaoEquipe() {
  const nome = document.getElementById("editNomeEquipe").value.trim();
  const modalidade = document
    .getElementById("editModalidadeEquipe")
    .value.trim();

  if (!nome || !modalidade) {
    alert("Preencha todos os campos!");
    return;
  }

  const equipes = JSON.parse(localStorage.getItem("equipes") || "[]");
  equipes[indiceEquipeEditando] = { nome, modalidade };

  localStorage.setItem("equipes", JSON.stringify(equipes));
  fecharModalEquipe();
  carregarEquipes(); // atualiza a lista
}

function excluirEquipe() {
  if (!confirm("Tem certeza que deseja excluir esta equipe?")) return;

  const equipes = JSON.parse(localStorage.getItem("equipes") || "[]");
  equipes.splice(indiceEquipeEditando, 1);

  localStorage.setItem("equipes", JSON.stringify(equipes));
  fecharModalEquipe();
  carregarEquipes();
}
