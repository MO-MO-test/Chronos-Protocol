// ==========================================
// 第2章：招かれざる乗客たち (タイピング・ハッキング完全対応版)
// ==========================================

const typingContainer = document.getElementById('typing-container');
const typingTarget = document.getElementById('typing-target');
const typingInput = document.getElementById('typing-input');

let currentCode = "";
let typedCode = "";
let hackPhase = 0;

// スマホ用：タイピング中かどうかを管理するフラグ
let isTypingActive = false;

// スマホで画面をタッチしたとき、タイピング中であればキーボードを再度出す
document.addEventListener('click', () => {
  if (isTypingActive) {
    const mInput = document.getElementById('mobile-typing-input');
    if (mInput) {
      mInput.focus();
    }
  }
});

document.getElementById('start-btn-2').addEventListener('click', () => {
  document.getElementById('title-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'flex';
  currentChapter = 2; // ここで第2章だと教えてあげる
  runChapter2();
});

async function runChapter2() {
  logWindow.innerHTML = '';
  hackPhase = 0;
  isTypingActive = false; // 初期化時はタイピングオフ
  shipStatus.textContent = "CHRONOS M-SYS // STATUS: JUMP COMPLETED";
  shipStatus.style.color = "#0f0";
  syncRateDisplay.textContent = "HACKING: 0.00%";
  entityCore.style.opacity = 0;
  typingContainer.style.display = 'none';
  syncBtn.style.display = 'none'; // 第2章はタイピングなのでボタンは隠す
  
  // script1.js で作った「文字が出るまで待ってくれる addLog」をそのまま使う！
  await addLog("SYSTEM", "次元跳躍完了。現在地：レグルス星系・辺境デブリ帯。", "system-msg");
  await sleep(1000);
  
  await addLog("Kokoro", "船長、跳躍アウト成功です。……ですが、船内の質量バランスに微小なズレが生じています。一般貨物の第4コンテナ群に、未知の生体反応……人間の心拍です。", "kokoro-msg");
  
  await waitForChoice([{ id: 'ch2-1', text: 'モニターを繋げ', logText: 'コンテナの内部カメラを回せ。一体誰が入り込んでる？' }]);

  container.classList.add("glitch-screen");
  setTimeout(() => container.classList.remove("glitch-screen"), 300);
  
  await addLog("ROYAL", "……見つかりましたか。私はレグルス第4惑星の王位継承者。故郷を『偽神（アルコン）』に奪われ、我が一族の遺産であるそのアンドロイドを取り戻すために潜り込んだのです。", "royal-msg");
  await sleep(1000);
  
  await addLog("ENTITY", "……王族ノ末裔カ。ダガ遅カッタナ。コノ器ハ既ニ私ガ使ッテイル。", "entity-msg");
  await sleep(1000);

  await addLog("Kokoro", "船長、外部センサーに反応！ 隠密迷彩（ステルス）を展開した小型艇が接近！", "kokoro-msg");
  await sleep(1000);

  container.classList.add("glitch-screen");
  shipStatus.textContent = "STATUS: HACKED";
  shipStatus.style.color = "#ff0";
  await addLog("WARNING", "外部からの強制アクセス！ 通信回線がオーバーライドされました！", "warn-msg");
  await sleep(1000);
  container.classList.remove("glitch-screen");

  await addLog("AGENT", "……こちらエクシード社特殊回収班。お前たちが積んでいるアンドロイドは我が社の資産だ。今すぐハッチを開けて引き渡せ。", "agent-msg");

  await waitForChoice([{ id: 'ch2-2', text: '断る', logText: '断る。ウチの船に積んである以上、こいつらは私の客だ。' }]);

  await addLog("AGENT", "……言うと思ったぜ。なら力ずくで止めてやる。……なっ！？ 要塞の防衛レーザーが起動した！？ ウチのデータベースじゃ沈黙してるはずだろ！", "agent-msg");
  await sleep(1000);
  
  container.classList.add("glitch-screen");
  shipStatus.textContent = "STATUS: UNDER ATTACK";
  shipStatus.style.color = "#f00";
  await addLog("SYSTEM", "警告。レグルス要塞の防衛システムが全艦船を敵対存在としてロックオン。", "warn-msg");
  await sleep(1500);
  container.classList.remove("glitch-screen");

  await addLog("ROYAL", "アルコンに要塞のシステムまで乗っ取られているのです！ このままでは宇宙の塵になりますよ！", "royal-msg");

  await waitForChoice([{ id: 'ch2-3', text: 'おい回収屋！', logText: '企業のエージェント、死にたくなきゃお前の船の演算リソースをこっちに回せ！' }]);

  await addLog("AGENT", "……チッ、分かった！ AI、私のジャミングコードを使って防壁に穴を開けろ！", "agent-msg");
  await addLog("ROYAL", "私も要塞の旧アクセスキーを提供します！ どうか、突破してください！", "royal-msg");

  await addLog("Kokoro", "両方のデータ、受信しました！ 船長、私が防壁の隙間を可視化します。表示された『ハッキングコード』をキーボードで正確に打ち込んでください！", "kokoro-msg");
  await sleep(1000);
  
  entityCore.style.opacity = 1;
  entityCore.style.borderRadius = "10%";
  entityCore.style.boxShadow = "0 0 20px #f00";
  
  startHackingPhase();
}

// ------------------------------------------
// タイピングハッキング処理
// ------------------------------------------
async function startHackingPhase() {
  hackPhase++;
  typedCode = "";
  typingInput.textContent = "";
  typingContainer.style.display = 'block';
  choiceContainer.style.display = 'none';

  if (hackPhase === 1) {
    currentCode = "INJECT_CHRONOS_WORM"; // ココロのワームプログラム
    await addLog("SYSTEM", "[PHASE 1] 第一防壁接近。クロノス特製ワームを注入せよ。", "system-msg");
  } else if (hackPhase === 2) {
    currentCode = "IGNORE_LEGAL_WARNING"; // エージェントの違法ゴリ押しコード
    entityCore.style.borderRadius = "30%";
    await addLog("AGENT", "第一層突破！ 次は俺の違法（ヤバい）ジャミングコードを叩き込め！ 法的警告は無視だ！", "agent-msg");
  } else if (hackPhase === 3) {
    currentCode = "REGULUS_BLOOD_AUTH"; // 王族の血統認証コード
    entityCore.style.borderRadius = "50%";
    await addLog("ROYAL", "最終防壁です！ 我が王家の血統認証（ブラッド・アクセス）を通してください！", "royal-msg");
  } else {
    typingContainer.style.display = 'none';
    isTypingActive = false; // タイピング終了
    completeChapter2();
    return;
  }
  
  typingTarget.textContent = currentCode;

  // ★タイピングフェーズが始まったらフラグをONにしてキーボードを強制起動する
  isTypingActive = true;
  const mInput = document.getElementById('mobile-typing-input');
  if (mInput) {
    mInput.focus();
  }

  document.addEventListener('keydown', handleTyping);
}

function handleTyping(e) {
  if (currentChapter !== 2) return;
  
  if (!/^[a-zA-Z0-9_]$/.test(e.key)) return; 

  const inputChar = e.key.toUpperCase(); 
  const targetChar = currentCode[typedCode.length];

  if (inputChar === targetChar) {
    typedCode += inputChar;
    typingInput.textContent = typedCode;
    typingInput.style.color = "#0f0";
    
    entityCore.style.transform = "scale(1.2)";
    setTimeout(() => { entityCore.style.transform = "scale(1)"; }, 100);

    if (typedCode === currentCode) {
      document.removeEventListener('keydown', handleTyping);
      let rate = Math.floor((hackPhase / 3) * 100);
      syncRateDisplay.textContent = `HACKING: ${rate}.00%`;
      typingInput.style.color = "#fff";
      
      setTimeout(() => {
        startHackingPhase(); 
      }, 1000);
    }
  } else {
    typingInput.style.color = "#f00";
    container.classList.add("glitch-screen");
    setTimeout(() => container.classList.remove("glitch-screen"), 150);
  }
}

async function completeChapter2() {
  isTypingActive = false; // 念のため確実にオフ
  entityCore.style.boxShadow = "0 0 50px #0ff, inset 0 0 30px #0ff";
  entityCore.style.backgroundColor = "rgba(100, 255, 255, 0.9)";
  shipStatus.textContent = "STATUS: FIREWALL BREACHED";
  shipStatus.style.color = "#0ff";
  
  await sleep(1000);
  await addLog("SYSTEM", "要塞メインシステムへのアクセス権を奪取。防壁を無力化しました。", "system-msg");
  await sleep(1000);

  await addLog("Kokoro", "やりました！ 防衛レーザーの照準、クロノス号と回収船から外れます！", "kokoro-msg");
  
  await addLog("AGENT", "ふぅ……肝を冷やさせやがって。だが、借りを作ったつもりはねぇぞ。さて、中に入ろうぜ。", "agent-msg");
  
  await waitForChoice([{ id: 'ch2-6', text: '要塞に突入する', logText: 'レーザーが止まってるうちに、要塞のドックに船を入れるぞ！' }]);
  
  await addLog("SYSTEM", "レグルス要塞 内部ドックへ接近中…… -- [CHAPTER 2 PROGRESS...] --", "system-msg");
  
  setTimeout(() => {
    alert("CHRONOS PROTOCOL\n\n- CHAPTER 2 COMPLETED -\n\n要塞防壁のハッキングに成功。\n物語は最終章へ……");
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('title-screen').style.display = 'flex';
  }, 2000);
}