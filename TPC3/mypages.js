exports.pessoasPage = function (lista) {
  let linhas = '';

  for (let i = 0; i < lista.length; i++) {
    linhas += `
      <tr>
        <td>
          <a href="/${lista[i].id}">${lista[i].id}</a>
        </td>
        <td>${lista[i].nome}</td>
        <td>${lista[i].idade}</td>
        <td>${lista[i].sexo}</td>
        <td>${lista[i].morada.cidade}</td>
      </tr>
    `;
  }

  let pagHTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8"/>
      <title>About people</title>
    </head>
    <body>
      <p><a href="/distributions">Distribuições de sexo e desportos</a></p>
      <p><a href="/jobs">Top 10 empregos</a></p>
      <h1>Lista de pessoas</h1>
      <table>
        <tr>
          <th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th>
        <tr>
        ${linhas}
      </table>
    </body>
  </html>
  `;

  return pagHTML;
}

exports.pessoaPage = function (pessoa) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <title>About ${pessoa.nome}</title>
    </head>
    <body>
      <h1>${pessoa.nome}</h1>
      <p>
        <strong>Idade: </strong>
        ${pessoa.idade}
      </p>
      <p>
        <strong>Sexo: </strong>
        ${pessoa.sexo}
      </p>
      <p><strong>Morada: </strong>${pessoa.morada.cidade}, ${pessoa.morada.distrito}</strong></p>
      ${pessoa.CC ? "<p><strong>CC: </strong>" + pessoa.CC : "<p><strong>BI: </strong>" + pessoa.BI}</strong ></p>
      <p><strong>Profissão: </strong>${pessoa.profissao}</p>
      <p><strong>Partido político: </strong>${pessoa.partido_politico.party_name}</p>
      <p><strong>Religião: </strong>${pessoa.religiao}</p>
      <p>${pessoa["descrição"]}</p>
    </body >
  </html >
  `;
}

exports.distribuicoes = function ({ males, females, others, sports }) {
  let sportsRows = "";

  for (let [sport, count] of Object.entries(sports).sort(([_, v], [__, v2]) => (v2 - v))) {
    sportsRows += `
      <tr><th>${sport}</th><td>${count}</td></tr>
    `
  }

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <title>Distribuições</title>
    </head>
    <body>
      <h1>Distribuições</h1>
      <h2>Sexo</h2>
      <table>
        <tr>
          <th>Masculino</th><td>${males}</td>
        </tr>
        <tr>
          <th>Feminino</th><td>${females}</td>
        </tr>
        <tr>
          <th>Outro</th><td>${others}</td>
        </tr>
      </table>
      <h2>Desporto</h2>
      <table>
        ${sportsRows}
      </table>
    </body >
  </html >
  `;
}

exports.top10jobs = function (jobs) {
  let jobsRows = "";

  for (let [job, count] of Object.entries(jobs).sort(([_, v], [__, v2]) => (v2 - v)).slice(0, 10)) {
    jobsRows += `
      <tr><th>${job}</th><td>${count}</td></tr>
    `
  }

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <title>Top 10 empregos</title>
    </head>
    <body>
      <h1>Top 10 empregos</h1>
      <table>
        ${jobsRows}
      </table>
    </body >
  </html >
  `;
}