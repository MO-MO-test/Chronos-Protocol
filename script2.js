// ==========================================
// 第2章：招かれざる乗客たち (ビジュアル入力欄対応版)
// ==========================================

const typingContainer = document.getElementById('typing-container');
const typingTarget = document.getElementById('typing-target');
const typingInput = document.getElementById('visible-typing-input');

let currentCode = "";
let hackPhase = 0;
let isTypingActive = false;

const safeSleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const safeAddLog = async (sender, text, className) => {
  if (typeof addLog === 'function') {
    return await addLog(sender, text, className);
  }
  const lw = document.getElementById('log-window');
  if (!lw) return;
  const p = document.createElement('div');
  p.className = className || '';
  p.innerHTML = `[${sender}] ${text}`;
  lw.appendChild(p);
  lw.scrollTop = lw.scrollHeight;
  await safeSleep(500);
};

const safeWaitForChoice = (choices) => {
  if (typeof waitForChoice === 'function') {
    return waitForChoice(choices);
  }
  return new Promise((resolve) => {
    const cc = document.getElementById('choice-container');
    if (!cc) return resolve();
    cc.innerHTML = '';
    cc.style.display = 'flex';
    choices.forEach(c => {
      const btn = document.createElement('button');
      btn.textContent = c.text;
      btn.onclick = () => {
        cc.style.display = 'none';
        resolve(c.id);
      };
      cc.appendChild(btn);
    });
  });
};

// 入力欄を監視して判定
if (typingInput) {
  typingInput.addEventListener('input', () => {
    if (currentChapter !== 2 || !isTypingActive) return;
    const val = typingInput.value.toUpperCase().replace(/[^A-Z0-9_]/g, '');
    typingInput.value = val;

    if (val === currentCode) {
      isTypingActive = false;
      typingInput.value = "";
      typingInput.blur();
      let rate = Math.floor((hackPhase / 3) * 100);
      const srd = document.getElementById('sync-rate');
      if (srd) srd.textContent = `HACKING: ${rate}.00%`;
      
      const ec = document.getElementById('entity-core');
      if (ec) {
        ec.style.transform = "scale(1.2)";
        setTimeout(() => { ec.style.transform = "scale(1)"; }, 100);
      }

      setTimeout(() => {
        startHackingPhase(); 
      }, 1000);
    } else if (!currentCode.startsWith(val)) {
      // 間違えたら赤くして少し戻す
      typingInput.style.color = "#f00";
      const con = document.getElementById('console-container') || document.body;
      con.classList.add("glitch-screen");
      setTimeout(() => {
        con.classList.remove("glitch-screen");
        typingInput.style.color = "#0f0";
      }, 150);
    } else {
      typingInput.style.color = "#0f0";
    }
  });
}

const startBtn2 = document.getElementById('start-btn-2');
if (startBtn2) {
  startBtn2.addEventListener('click', () => {
    const titleScreen = document.getElementById('title-screen');
    const gameScreen = document.getElementById('game-screen');
    if (titleScreen) titleScreen.style.display = 'none';
    if (gameScreen) gameScreen.style.display = 'flex';
    currentChapter = 2; 
    runChapter2();
  });
}

async function runChapter2() {
  const lw = document.getElementById('log-window');
  if (lw) lw.innerHTML = '';
  hackPhase = 0;
  isTypingActive = false;
  
  const ss = document.getElementById('ship-status');
  if (ss) {
    ss.textContent = "CHRONOS M-SYS // STATUS: JUMP COMPLETED";
    ss.style.color = "#0f0";
  }
  const srd = document.getElementById('sync-rate');
  if (srd) srd.textContent = "HACKING: 0.00%";
  
  const ec = document.getElementById('entity-core');
  if (ec) ec.style.opacity = 0;
  if (typingContainer) typingContainer.style.display = 'none';
  
  const sb = document.getElementById('sync-btn');
  if (sb) sb.style.display = 'none'; 
  
  await safeAddLog("SYSTEM", "次元跳躍完了。現在地：レグルス星系・辺境デブリ帯。", "system-msg");
  await safeSleep(1000);
  
  await safeAddLog("Kokoro", "船長、跳躍アウト成功です。……ですが、船内の質量バランスに微小なズレが生じています。一般貨物の第4コンテナ群に、未知の生体反応……人間の心拍です。", "kokoro-msg");
  
  await safeWaitForChoice([{ id: 'ch2-1', text: 'モニターを繋げ', logText: 'コンテナの内部カメラを回せ。一体誰が入り込んでる？' }]);

  const con = document.getElementById('console-container') || document.body;
  con.classList.add("glitch-screen");
  setTimeout(() => { con.classList.remove("glitch-screen"); }, 300);
  
  await safeAddLog("ROYAL", "……見つかりましたか。私はレグルス第4惑星の王位継承者。故郷を『偽神（アルコン）』に奪われ、我が一族の遺産であるそのアンドロイドを取り戻すために潜り込んだのです。", "royal-msg");
  await safeSleep(1000);
  
  await safeAddLog("ENTITY", "……王族ノ末裔カ。ダガ遅カッタナ。コノ器ハ既ニ私ガ使ッテイル。", "entity-msg");
  await safeSleep(1000);

  await safeAddLog("Kokoro", "船長、外部センサーに反応！ 隠密迷彩（ステルス）を展開した小型艇が接近！", "kokoro-msg");
  await safeSleep(1000);

  con.classList.add("glitch-screen");
  if (ss) {
    ss.textContent = "STATUS: HACKED";
    ss.style.color = "#ff0";
  }
  await safeAddLog("WARNING", "外部からの強制アクセス！ 通信回線がオーバーライドされました！", "warn-msg");
  await safeSleep(1000);
  con.classList.remove("glitch-screen");

  await safeAddLog("AGENT", "……こちらエクシード社特殊回収班。お前たちが積んでいるアンドロイドは我が社の資産だ。今すぐハッチを開けて引き渡せ。", "agent-msg");

  await safeWaitForChoice([{ id: 'ch2-2', text: '断る', logText: '断る。ウチの船に積んである以上、こいつらは私の客だ。' }]);

  await safeAddLog("AGENT", "……言うと思ったぜ。なら力ずくで止めてやる。……なっ！？ 要塞の防衛レーザーが起動した！？ ウチのデータベースじゃ沈黙してるはずだろ！", "agent-msg");
  await safeSleep(1000);
  
  con.classList.add("glitch-screen");
  if (ss) {
    ss.textContent = "STATUS: UNDER ATTACK";
    ss.style.color = "#f00";
  }
  await safeAddLog("SYSTEM", "警告。レグルス要塞の防衛システムが全艦船を敵対存在としてロックオン。", "warn-msg");
  await safeSleep(1500);
  con.classList.remove("glitch-screen");

  await safeAddLog("ROYAL", "アルコンに要塞のシステムまで乗っ取られているのです！ このままでは宇宙の塵になりますよ！", "royal-msg");

  await safeWaitForChoice([{ id: 'ch2-3', text: 'おい回収屋！', logText: '企業のエージェント、死にたくなきゃお前の船の演算リソースをこっちに回せ！' }]);

  await safeAddLog("AGENT", "……チッ、分かった！ AI、私のジャミングコードを使って防壁に穴を開けろ！", "agent-msg");
  await safeAddLog("ROYAL", "私も要塞の旧アクセスキーを提供します！ どうか、突破してください！", "royal-msg");

  await safeAddLog("Kokoro", "両方のデータ、受信しました！ 船長,私が防壁の隙間を可視化します。表示された『ハッキングコード』を入力欄に打ち込んでください！", "kokoro-msg");
  await safeSleep(1000);
  
  if (ec) {
    ec.style.opacity = 1;
    ec.style.borderRadius = "10%";
    ec.style.boxShadow = "0 0 20px #f00";
  }
  
  startHackingPhase();
}

async function startHackingPhase() {
  hackPhase++;
  if (typingInput) typingInput.value = "";
  if (typingContainer) typingContainer.style.display = 'block';
  
  const cc = document.getElementById('choice-container');
  if (cc) cc.style.display = 'none';

  if (hackPhase === 1) {
    currentCode = "INJECT_CHRONOS_WORM"; 
    await safeAddLog("SYSTEM", "[PHASE 1] 第一防壁接近。クロノス特製ワームを注入せよ。", "system-msg");
  } else if (hackPhase === 2) {
    currentCode = "IGNORE_LEGAL_WARNING"; 
    const ec = document.getElementById('entity-core');
    if (ec) ec.style.borderRadius = "30%";
    await safeAddLog("AGENT", "第一層突破！ 次は俺の違法（ヤバい）ジャミングコードを叩き込め！ 法的警告は無視だ！", "agent-msg");
  } else if (hackPhase === 3) {
    currentCode = "REGULUS_BLOOD_AUTH"; 
    const ec = document.getElementById('entity-core');
    if (ec) ec.style.borderRadius = "50%";
    await safeAddLog("ROYAL", "最終防壁です！ 我が王家の血統認証（ブラッド・アクセス）を通してください！", "royal-msg");
  } else {
    if (typingContainer) typingContainer.style.display = 'none';
    isTypingActive = false;
    completeChapter2();
    return;
  }
  
  if (typingTarget) typingTarget.textContent = currentCode;
  isTypingActive = true;
  if (typingInput) typingInput.focus();
}

async function completeChapter2() {
  isTypingActive = false;
  const ec = document.getElementById('entity-core');
  if (ec) {
    ec.style.boxShadow = "0 0 50px #0ff, inset 0 0 30px #0ff";
    ec.style.backgroundColor = "rgba(100, 255, 255, 0.9)";
  }
  const ss = document.getElementById('ship-status');
  if (ss) {
    ss.textContent = "STATUS: FIREWALL BREACHED";
    ss.style.color = "#0ff";
  }
  
  await safeSleep(1000);
  await safeAddLog("SYSTEM", "要塞メインシステムへのアクセス権を奪取。防壁を無力化しました。", "system-msg");
  await safeSleep(1000);

  await safeAddLog("Kokoro", "やりました！ 防衛レーザーの照準、クロノス号と回収船から外れます！", "kokoro-msg");
  
  await safeAddLog("AGENT", "ふぅ……肝を冷やさせやがって。だが、借りを作ったつもりはねぇぞ。さて、中に入ろうぜ。", "agent-msg");
  
  await safeWaitForChoice([{ id: 'ch2-6', text: '要塞に突入する', logText: 'レーザーが止まってるうちに、要塞のドックに船を入れるぞ！' }]);
  
  await safeAddLog("SYSTEM", "レグルス要塞 内部ドックへ接近中…… -- [CHAPTER 2 PROGRESS...] --", "system-msg");
  
  setTimeout(() => {
    alert("CHRONOS PROTOCOL\n\n- CHAPTER 2 COMPLETED -\n\n要塞防壁のハッキングに成功。\n物語は最終章へ……");
    const gameScreen = document.getElementById('game-screen');
    const titleScreen = document.getElementById('title-screen');
    if (gameScreen) gameScreen.style.display = 'none';
    if (titleScreen) titleScreen.style.display = 'flex';
  }, 2000);
}