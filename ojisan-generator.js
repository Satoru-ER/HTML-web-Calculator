export function generateOjisanProgram(expr) {
  const trimmed = expr.trim();
  if (!trimmed) return "";

  if (!/^[0-9+\-*/\s.]+$/.test(trimmed)) {
    throw new Error("式にサポート外の文字が含まれています");
  }

  const varName = "答え";
  return [
    "○○チャン、お疲れ様〜😊❗",
    `僕の${varName}を紹介するネ（写真つき）📸`,
    `${varName} は、オジサンのものだヨ💗 ${trimmed}`,
    `吐いちゃうゾ😅 ${varName}`,
    "風呂入ってくるネ🛁💨"
  ].join("\n");
}
