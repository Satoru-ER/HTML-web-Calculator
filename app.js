import { generateOjisanProgram } from "./ojisan-generator.js";
import { runOjisanProgram } from "./ojisan-interpreter.js";

window.addEventListener("DOMContentLoaded", () => {
  const exprInput = document.getElementById("exprInput");
  const codeArea = document.getElementById("ojisanCode");
  const resultArea = document.getElementById("execResult");
  const errorArea = document.getElementById("errorArea");
  const runBtn = document.getElementById("runBtn");

  function update() {
    const expr = exprInput.value;
    errorArea.textContent = "";
    resultArea.textContent = "";

    if (!expr.trim()) {
      codeArea.value = "";
      return;
    }

    try {
      codeArea.value = generateOjisanProgram(expr);
    } catch (e) {
      codeArea.value = "";
      errorArea.textContent = e.message;
    }
  }

  exprInput.addEventListener("input", update);

  runBtn.addEventListener("click", () => {
    errorArea.textContent = "";
    resultArea.textContent = "";

    const code = codeArea.value;
    if (!code.trim()) {
      errorArea.textContent = "OJISAN++ コードがありません。";
      return;
    }

    try {
      resultArea.textContent = runOjisanProgram(code);
    } catch (e) {
      errorArea.textContent = e.message;
    }
  });

  update();
});
