function carregarResultados() {
  const partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
  const corpo = document.getElementById("listaResultados");
  corpo.innerHTML = "";

  partidas.forEach((part, nmrPart) => {
    const tr = document.createElement("tr");

    let resultado = "Não registrado";
    if (part.vencedor !== "undefined") {
      resultado =
        part.vencedor === "empate" ? "Empate" : `Vitória de ${part.vencedor}`;
    }

    tr.innerHTML = `
      <td>${part.data}</td>
      <td>${part.local}</td>
      <td>${part.equipeA}</td>
      <td>${part.pontosA}</td>
      <td>${part.equipeB}</td>
      <td>${part.pontosB}</td>
      <td>${resultado}</td>
      <td>${part.pontosA ?? "-"} x ${part.pontosB ?? "-"}</td>
      <td>
        <button onclick="abrirModalResultado(${nmrPart})">Registrar Resultado</button>
      </td>
    `;

    corpo.appendChild(tr);
  });
}
carregarResultados();
//---                 |
//funcoes dos modais \/
let idPartida = null;
let partidaAtual = null;

function abrirModalResultado(idPart) {
  const partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
  const p = partidas[idPart];
  idPartida = idPart;
  partidaAtual = p;

  document.getElementById("modalResultado").classList.remove("hidden");
  let infoPartida = document.getElementById("infoPartida");
  infoPartida.innerText = ` equipe A - ${p.equipeA} x equipe B - ${p.equipeB}`;
  infoPartida.style.color = "black";

  const select = document.getElementById("vencedorSelect");
  select.innerHTML = `
    <option value="">Qual equipe venceu?</option>
    <option value="empate">Empate</option>
    <option value="${p.equipeA}">${p.equipeA}</option>
    <option value="${p.equipeB}">${p.equipeB}</option>
  `;

  document.getElementById("pontosA").value = "";
  document.getElementById("pontosB").value = "";
}

//---                |
// salvar resultado \/
let ME = document.getElementById("MensagemErro");
function salvarResultado() {
  const vencedor = document.getElementById("vencedorSelect").value;
  const pontosA = parseInt(document.getElementById("pontosA").value);
  const pontosB = parseInt(document.getElementById("pontosB").value);
  const partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
  console.log(partidas);

  if (vencedor === "" || isNaN(pontosA) || isNaN(pontosB)) {
    ME.style.color = "red";
    ME.style.fontWeight = "bold";
    ME.innerText = "Por favor, preencha todos os campos corretamente.";
    return;
  } else if (
    (vencedor === partidas[idPartida].equipeA && pontosA <= pontosB) ||
    (vencedor === "empate" && pontosA !== pontosB) ||
    (vencedor === partidas[idPartida].equipeB && pontosB <= pontosA)
  ) {
    console.log("Erro de pontuação");

    ME.style.color = "red";
    ME.style.fontWeight = "bold";
    ME.innerText = "A pontuação não confere com o vencedor selecionado!";
    return;
  }

  partidas[idPartida].vencedor = vencedor;
  partidas[idPartida].pontosA = pontosA;
  partidas[idPartida].pontosB = pontosB;

  localStorage.setItem("partidas", JSON.stringify(partidas));
  fecharModal();
  carregarResultados();
}
//---          |
// fchar modal\/
function fecharModal() {
  document.getElementById("modalResultado").classList.add("hidden");
  idPartida = null;
  partidaAtual = null;
  ME.innerText = "";
}
//---
carregarResultados();
