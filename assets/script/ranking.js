function gerarRanking() {
  const partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
  const estatisticas = {};
  let ordemGlobal = 0; // usado para rastrear a ordem de entrada das equipes

  partidas.forEach((partida) => {
    if (partida.pontosA == null || partida.pontosB == null) return;

    // Inicializa estatísticas da equipe A se ainda não existir
    if (!estatisticas[partida.equipeA]) {
      estatisticas[partida.equipeA] = {
        nome: partida.equipeA,
        pontos: 0,
        jogos: 0,
        vitorias: 0,
        empates: 0,
        derrotas: 0,
        ordemDeEntrada: ordemGlobal++,
      };
    }

    // Inicializa estatísticas da equipe B se ainda não existir
    if (!estatisticas[partida.equipeB]) {
      estatisticas[partida.equipeB] = {
        nome: partida.equipeB,
        pontos: 0,
        jogos: 0,
        vitorias: 0,
        empates: 0,
        derrotas: 0,
        ordemDeEntrada: ordemGlobal++,
      };
    }

    // Soma os pontos
    estatisticas[partida.equipeA].pontos += partida.pontosA;
    estatisticas[partida.equipeB].pontos += partida.pontosB;

    // Soma o número de jogos
    estatisticas[partida.equipeA].jogos++;
    estatisticas[partida.equipeB].jogos++;

    // Contabiliza vitórias, empates e derrotas
    if (partida.pontosA > partida.pontosB) {
      estatisticas[partida.equipeA].vitorias++;
      estatisticas[partida.equipeB].derrotas++;
    } else if (partida.pontosB > partida.pontosA) {
      estatisticas[partida.equipeB].vitorias++;
      estatisticas[partida.equipeA].derrotas++;
    } else {
      estatisticas[partida.equipeA].empates++;
      estatisticas[partida.equipeB].empates++;
    }
  });

  // Transforma o objeto em array e ordena
  const ranking = Object.values(estatisticas).sort((equipeA, equipeB) => {
    // Ordena por pontos (maior primeiro)
    if (equipeB.pontos !== equipeA.pontos) {
      return equipeB.pontos - equipeA.pontos;
    }

    // Se pontos forem iguais, ordena por vitórias (maior primeiro)
    if (equipeB.vitorias !== equipeA.vitorias) {
      return equipeB.vitorias - equipeA.vitorias;
    }

    // Se ainda for igual, prioriza quem chegou primeiro
    return equipeA.ordemDeEntrada - equipeB.ordemDeEntrada;
  });

  // Exibe o ranking na tabela
  const corpoTabela = document.getElementById("corpoRanking");
  corpoTabela.innerHTML = "";

  ranking.forEach((equipe, posicao) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${posicao + 1}º</td>
      <td>${equipe.nome}</td>
      <td>${equipe.pontos}</td>
      <td>${equipe.jogos}</td>
      <td>${equipe.vitorias}</td>
      <td>${equipe.empates}</td>
      <td>${equipe.derrotas}</td>
    `;
    corpoTabela.appendChild(linha);
  });
}

gerarRanking();
