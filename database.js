import { db } from "./firebase-config.js";
import { ref, set, get, update, push, onValue } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

export function salvarOP(chave, dados) {
  return set(ref(db, "ops/" + chave + "/cabecalho"), dados);
}

export function salvarReceita(chave, receita) {
  return set(ref(db, "ops/" + chave + "/receita"), receita);
}

export function adicionarEvento(chave, evento) {
  const eventosRef = ref(db, "ops/" + chave + "/eventos");
  return push(eventosRef, evento);
}

export function buscarOP(chave) {
  return get(ref(db, "ops/" + chave));
}

export function escutarOP(chave, callback) {
  return onValue(ref(db, "ops/" + chave), (snapshot) => {
    callback(snapshot.val());
  });
}
export function salvarOPFirebase(chave, dados) {
  return set(ref(db, "ops/" + chave + "/cabecalho"), dados);
}

export function buscarOPFirebase(chave) {
  return get(ref(db, "ops/" + chave));
}

export function escutarOPFirebase(chave, callback) {
  return onValue(ref(db, "ops/" + chave), (snapshot) => {
    callback(snapshot.val());
  });
}

export function adicionarEventoFirebase(chave, evento) {
  return push(ref(db, "ops/" + chave + "/eventos"), evento);
}