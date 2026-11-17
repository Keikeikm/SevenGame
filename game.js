const numberElement = document.querySelector("#number");
const turnElement = document.querySelector("#turn");
const feedbackElement = document.querySelector("#feedback");

const sayButton = document.querySelector("#sayButton");
const saluteButton = document.querySelector("#saluteButton");
const restartButton = document.querySelector("#restartButton");

const historyList = document.querySelector("#historyList");
const scoreElement = document.querySelector("#score");

const playerA = document.querySelector("#playerA");
const playerB = document.querySelector("#playerB");

let currentNumber = 1;
let currentPlayer = "A";
let score = 0;
let gameOver = false;
let history = [];

// 判断当前数字是否需要敬礼
function shouldSalute(number) {
  return number % 7 === 0 ||
         String(number).includes("7");
}
// 更新游戏界面
function render() {
  gameOver = false;
  numberElement.textContent = currentNumber;
  turnElement.textContent = `轮到玩家 ${currentPlayer}`;

  playerA.classList.toggle("active", currentPlayer === "A");
  playerB.classList.toggle("active", currentPlayer === "B");

  scoreElement.textContent = `连续正确：${score}`;

  sayButton.disabled = gameOver;
  saluteButton.disabled = gameOver;
}

function addHistory(player, action, correct) {
//   history.unshift({
//     player,
//     number: currentNumber,
//     action,
//     correct
//   });

//   historyList.innerHTML = history.map(item => `
//     <div class="history-item">
//       <span>玩家 ${item.player}</span>
//       <span>${item.action}</span>
//       <span class="${item.correct ? "correct" : "wrong"}">
//         ${item.correct ? "✓ 正确" : "✗ 错误"}
//       </span>
//     </div>
//   `).join("");
}

// 执行一次操作
function play(action) {
  if (gameOver) return;

  const mustSalute = shouldSalute(currentNumber);

  const correct =
    (mustSalute && action === "salute") ||
    (!mustSalute && action === "say");

  const player = currentPlayer;

  if (!correct) {
    gameOver = true;
    scoreElement.textContent = `连续正确：${score}`;

    const expected = mustSalute
      ? "敬礼 🫡"
      : `报数 ${currentNumber}`;

    feedbackElement.textContent =
      `游戏结束！玩家 ${player} 操作错误，应该${expected}。`;

    numberElement.textContent = "×";

    addHistory(player, action === "say"
      ? `报数 ${currentNumber}`
      : "敬礼 🫡", false);

    sayButton.disabled = true;
    saluteButton.disabled = true;

    return;
  }

  score++;

  const message = action === "salute"
    ? "敬礼！🫡"
    : `报数：${currentNumber}`;

  addHistory(player, message, true);

  feedbackElement.textContent = message;

  // 数字递增
  currentNumber++;

  // 轮换玩家
  currentPlayer = currentPlayer === "A" ? "B" : "A";

  render();
}

// 按钮事件
sayButton.addEventListener("click", () => {
  play("say");
});

saluteButton.addEventListener("click", () => {
  play("salute");
});

// 重新开始
restartButton.addEventListener("click", () => {
  currentNumber = 1;
  currentPlayer = "A";
  score = 0;
  gameOver = false;
  history = [];

  historyList.innerHTML =
    '<div class="empty">等待游戏开始...</div>';

  feedbackElement.textContent = "请报出数字 1";

  render();
});

// 初始化
render();
