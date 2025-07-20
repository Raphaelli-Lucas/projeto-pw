    const form = document.getElementById("formAluno");
    const selectEquipe = document.querySelector("#equipeAluno");

    function carregarEquipesNoSelect() {
      const equipes = JSON.parse(localStorage.getItem("equipes") || "[]");
      equipes.forEach(equipe => {
      const option = document.createElement("option");
        option.value = equipe.nome;
        option.innerText = equipe.nome;
        selectEquipe.appendChild(option);
      });
    }

    function carregarAlunos() {
      const alunos = JSON.parse(localStorage.getItem("alunos") || "[]");
      const tabela = document.querySelector("tbody");
      tabela.innerHTML = "";
      alunos.forEach(aluno => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${aluno.nome} -</td> 
          <td>${aluno.idade} -</td> 
          <td>${aluno.turma} -</td> 
          <td>${aluno.equipe}</td>
        `;
        tabela.appendChild(tr);
      });
    }

    carregarEquipesNoSelect();
    carregarAlunos();

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = document.getElementById("nomeAluno").value.trim();
      const idade = parseInt(document.getElementById("idadeAluno").value);
      const turma = document.getElementById("turmaAluno").value.trim();
      const equipe = document.getElementById("equipeAluno").value;

      if (!nome || !idade || !turma || !equipe) {
        alert("Preencha todos os campos.");
        return;
      }

      const novoAluno = 
      { nome, 
        idade, 
        turma, 
        equipe 
        };
      const alunos = JSON.parse(localStorage.getItem("alunos") || "[]");
      alunos.push(novoAluno);
      localStorage.setItem("alunos", JSON.stringify(alunos));

      form.reset();
      carregarAlunos();
    });

    //window.onload = function () {
     // carregarEquipesNoSelect();
     // carregarAlunos();
    //};
   