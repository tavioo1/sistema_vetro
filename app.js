import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.salvarProducao = function() {

  const meta = document.getElementById("meta").value;
  const realizado = document.getElementById("realizado").value;

  set(ref(db, "producao/fw1"), {
    meta: meta,
    realizado: realizado
  });

};

// ESCUTA EM TEMPO REAL
onValue(ref(db, "producao/fw1"), (snapshot) => {
  const data = snapshot.val();
  if (data) {
    document.getElementById("dados").innerText =
      `Meta: ${data.meta} | Realizado: ${data.realizado}`;
  }
});
