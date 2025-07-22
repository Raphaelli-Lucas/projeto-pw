function gerarRanking() {
  const partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
  const estatisticas = {};

  partidas.forEach((p) => {
    if (p.pontosA == null || p.pontosB == null) return; // pula se não tiver resultado

    if (!estatisticas[p.equipeA]) {
      estatisticas[p.equipeA] = {
        nome: p.equipeA,
        pts: 0,
        j: 0,
        v: 0,
        e: 0,
        d: 0,
      };
    }

    if (!estatisticas[p.equipeB]) {
      estatisticas[p.equipeB] = {
        nome: p.equipeB,
        pts: 0,
        j: 0,
        v: 0,
        e: 0,
        d: 0,
      };
    }

    estatisticas[p.equipeA].pts += p.pontosA;
    estatisticas[p.equipeB].pts += p.pontosB;

    estatisticas[p.equipeA].j++;
    estatisticas[p.equipeB].j++;

    if (p.pontosA > p.pontosB) {
      estatisticas[p.equipeA].v++;
      estatisticas[p.equipeB].d++;
    } else if (p.pontosB > p.pontosA) {
      estatisticas[p.equipeB].v++;
      estatisticas[p.equipeA].d++;
    } else {
      estatisticas[p.equipeA].e++;
      estatisticas[p.equipeB].e++;
    }
  });

  const ranking = Object.values(estatisticas).sort(
    (a, b) => b.pts - a.pts || b.v - a.v || a.nome.localeCompare(b.nome)
  );

  const corpo = document.getElementById("corpoRanking");
  corpo.innerHTML = "";

  ranking.forEach((eq, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
          <td>${i + 1}º</td>
          <td>${eq.nome}</td>
          <td>${eq.pts}</td>
          <td>${eq.j}</td>
          <td>${eq.v}</td>
          <td>${eq.e}</td>
          <td>${eq.d}</td>
        `;
    corpo.appendChild(tr);
  });
}

gerarRanking();
