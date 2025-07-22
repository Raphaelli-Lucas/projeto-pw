const form = document.getElementById("formAluno");
const selectEquipe = document.querySelector("#equipeAluno");

function carregarEquipesNoSelect() {
  const equipes = JSON.parse(localStorage.getItem("equipes") || "[]");
  equipes.forEach((equipe) => {
    const option = document.createElement("option");
    option.value = equipe.nome;
    option.innerText = equipe.nome;
    selectEquipe.appendChild(option);
  });
}

function carregarAlunos() {
  const alunos = JSON.parse(localStorage.getItem("alunos") || "[]");
  const tabela = document.getElementById("tabelaAlunos").querySelector("tbody");
  tabela.innerHTML = "";

  alunos.forEach((aluno, idAluno) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.idade}</td>
      <td>${aluno.turma}</td>
      <td>${aluno.equipe}</td>
      <td><button onclick="abrirModalEditarAluno(${idAluno})">✏️ Editar</button></td>
    `;
    tabela.appendChild(tr);
  });
}

carregarEquipesNoSelect();
carregarAlunos();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nomeAluno").value.trim(); // trim() remove espaços extras
  const idade = parseInt(document.getElementById("idadeAluno").value);
  const turma = document.getElementById("turmaAluno").value.trim();
  const equipe = document.getElementById("equipeAluno").value;

  if (!nome || !idade || !turma || !equipe) {
    alert("Preencha todos os campos.");
    return;
  }

  const novoAluno = { nome, idade, turma, equipe };
  const alunos = JSON.parse(localStorage.getItem("alunos") || "[]");
  alunos.push(novoAluno);
  localStorage.setItem("alunos", JSON.stringify(alunos));

  form.reset();
  carregarAlunos();
});

let indiceAlunoEditando = null;
function abrirModalEditarAluno(idAluno) {
  const alunos = JSON.parse(localStorage.getItem("alunos") || "[]");
  const aluno = alunos[idAluno];

  indiceAlunoEditando = idAluno;
  document.getElementById("editNomeAluno").value = aluno.nome;
  document.getElementById("editIdadeAluno").value = aluno.idade;
  document.getElementById("editTurmaAluno").value = aluno.turma;
  document.getElementById("editEquipeAluno").value = aluno.equipe;

  document.getElementById("modalEditarAluno").classList.remove("hidden");
}


function salvarEdicaoAluno() {
  const nome = document.getElementById("editNomeAluno").value.trim();
  const idade = parseInt(
    document.getElementById("editIdadeAluno").value.trim()
  );
  const turma = document.getElementById("editTurmaAluno").value.trim();
  const equipe = document.getElementById("editEquipeAluno").value.trim();

  if (!nome || !idade || !turma || !equipe) {
    alert("Preencha todos os campos!");
    return;
  }
  
  const alunos = JSON.parse(localStorage.getItem("alunos") || "[]");
  alunos[indiceAlunoEditando] = { nome, idade, turma, equipe };
  
  localStorage.setItem("alunos", JSON.stringify(alunos));
  fecharModalAluno();
  carregarAlunos(); // atualiza a lista
}

const selectEquipeModal = document.querySelector("#editEquipeAluno");

function carregarEquipesNoSelectModal() {
  const equipes = JSON.parse(localStorage.getItem("equipes") || "[]");
  equipes.forEach((equipe) => {
    const option = document.createElement("option");
    option.value = equipe.nome;
    option.innerText = equipe.nome;
    selectEquipeModal.appendChild(option);
  });
}
carregarEquipesNoSelectModal();

//---
//excluir aluno
function excluirAluno() {
  if (!confirm("Tem certeza que deseja excluir este aluno?")) return;
  
  const alunos = JSON.parse(localStorage.getItem("alunos") || "[]");
  alunos.splice(indiceAlunoEditando, 1);
  
  localStorage.setItem("alunos", JSON.stringify(alunos));
  fecharModalAluno();
  carregarAlunos();
}
//---
// fechar modal
function fecharModalAluno() {
  document.getElementById("modalEditarAluno").classList.add("hidden");
  indiceAlunoEditando = null;
}