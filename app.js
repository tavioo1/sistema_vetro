console.log("APP.JS TA ONLINE");
import { salvarOPFirebase, buscarOPFirebase, escutarOPFirebase, adicionarEventoFirebase }
from "./database.js";

let opAtual = null;
window.irPara = function(nomeTela) {

  // Esconde todas as telas
  document.querySelectorAll("[id^='tela']").forEach(el => {
    el.style.display = "none";
  });

  // Monta automaticamente o ID da tela
  const primeiraMaiuscula = nomeTela.charAt(0).toUpperCase() + nomeTela.slice(1);
  const idTela = "tela" + primeiraMaiuscula;

  const tela = document.getElementById(idTela);

  if (tela) {
    tela.style.display = "block";
  } else {
    console.warn("Tela não encontrada:", idTela);
  }
};

// SALVAR OP (PCP)
window.salvarOP = async function() {

  const op = pcp_op.value;
  const item = pcp_item.value;
  const data = pcp_data.value;
  const meta = Number(pcp_meta.value);
  const produto = pcp_produto.value;
  const turno = pcp_turno.value;

  const chave = `${op}_${item}_${data}`;

  await salvarOPFirebase(chave, {
    op,
    item,
    data,
    meta,
    produto,
    turno,
    status: "aberta",
    criadoEm: Date.now()
  });

  alert("OP salva online 🚀");
};

// ABRIR OP (Produção)
window.abrirOP = function() {

  const op = prod_op.value;
  const item = prod_item.value;
  const data = prod_data.value;

  const chave = `${op}_${item}_${data}`;
  opAtual = chave;

  escutarOPFirebase(chave, (dados) => {

    if (!dados) {
      infoOP.innerHTML = "OP não encontrada.";
      return;
    }

    infoOP.innerHTML = `
      <strong>Produto:</strong> ${dados.cabecalho.produto}<br>
      <strong>Meta:</strong> ${dados.cabecalho.meta}<br>
      <strong>Turno:</strong> ${dados.cabecalho.turno}
    `;

    let total = 0;

    if (dados.eventos) {
      Object.values(dados.eventos).forEach(ev => {
        total += Number(ev.tubos || 0);
      });
    }

    totalProduzido.textContent = total;
  });
};

// ADICIONAR EVENTO
window.adicionarEvento = async function() {

  if (!opAtual) return alert("Abra uma OP primeiro");

  const tubos = Number(tubosEvento.value);

  await adicionarEventoFirebase(opAtual, {
    tubos,
    dataHora: Date.now()
  });

  tubosEvento.value = "";
};
