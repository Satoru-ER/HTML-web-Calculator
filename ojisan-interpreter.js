export function runOjisanProgram(code) {
  const lines = code.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  const vars = {};
  let output = "";
  let started = false;
  let ended = false;

  function evalExpression(expr) {
    if (!/^[0-9+\-*/\s.]+$/.test(expr)) {
      throw new Error("サポート外の文字が式に含まれています: " + expr);
    }
    const f = new Function("return (" + expr + ");");
    const v = f();
    if (typeof v !== "number" || !isFinite(v)) {
      throw new Error("式の評価に失敗しました: " + expr);
    }
    return v;
  }

  for (const line of lines) {
    if (line === "○○チャン、お疲れ様〜😊❗") {
      started = true;
      continue;
    }
    if (line === "風呂入ってくるネ🛁💨") {
      ended = true;
      break;
    }
    if (!started) throw new Error("開始文より前にコードがあります: " + line);

    if (line.startsWith("僕の") && line.endsWith("を紹介するネ（写真つき）📸")) {
      const name = line.slice(2, line.indexOf("を紹介するネ（写真つき）📸"));
      vars[name] = 0;
      continue;
    }

    if (line.includes(" は、オジサンのものだヨ💗")) {
      const [left, right] = line.split(" は、オジサンのものだヨ💗");
      const varName = left.trim();
      const expr = right.trim();
      vars[varName] = evalExpression(expr);
      continue;
    }

    if (line.startsWith("吐いちゃうゾ😅")) {
      const varName = line.replace("吐いちゃうゾ😅", "").trim();
      output += String(vars[varName]);
      continue;
    }

    throw new Error("解釈できない行です: " + line);
  }

  if (!started) throw new Error("開始文がありません");
  if (!ended) throw new Error("終了文がありません");

  return output;
}
