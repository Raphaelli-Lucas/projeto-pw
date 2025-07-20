const form = document.getElementById("formEquipe");
const tabela = document.getElementById("tabelaEquipes").querySelector("tbody");

    function carregarEquipes() {
      const equipes = JSON.parse(localStorage.getItem("equipes") || "[]");
      tabela.innerHTML = "";
      equipes.forEach(equipe => {
        const tr = document.createElement("tr");
        tr.innerHTML =
         `<td>${equipe.nome}</td>
          <td>- ${equipe.modalidade}</td>`;
          //tr.classList.add("nome-da-classe"); caso queria usar um class list
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

    
    window.onload = carregarEquipes;