function carregarAlunos() {
      const equipes = JSON.parse(localStorage.getItem("equipes") || "[]");
      const alunos = JSON.parse(localStorage.getItem("alunos") || "[]");
      const container = document.getElementById("listaAlunos");

      container.innerHTML = "";

      equipes.forEach(eq => {
        const div = document.createElement("div");
        div.classList.add("equipe-bloco");

        const titulo = document.createElement("h3");
        titulo.textContent = `🏅 ${eq.nome} (${eq.modalidade})`;

        const lista = document.createElement("ul");
        const alunosDaEquipe = alunos.filter(aluno => aluno.equipe === eq.nome);

        if (alunosDaEquipe.length === 0) {
          const vazio = document.createElement("li");
          vazio.textContent = "Nenhum aluno está nesta equipe.";
          lista.appendChild(vazio);
        } else {
          alunosDaEquipe.forEach(aluno => {
            const li = document.createElement("li");
            li.textContent = `${aluno.nome} - Turma ${aluno.turma}`;
            lista.appendChild(li);
          });
        }

        div.appendChild(titulo);
        div.appendChild(lista);
        container.appendChild(div);
      });
    }

    carregarAlunos();
