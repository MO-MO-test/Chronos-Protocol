// ==========================================
// 第3章：クロノス・プロトコル (ビジュアル入力欄対応版)
// ==========================================

const typingContainer3 = document.getElementById('typing-container');
const typingTarget3 = document.getElementById('typing-target');
const typingInput3 = document.getElementById('visible-typing-input');

let isTypingActive3 = false;

// 入力欄を監視して判定
if (typingInput3) {
  typingInput3.addEventListener('input', () => {
    if (currentChapter !== 3 || !isTypingActive3) return;
    const val = typingInput3.value.toUpperCase().replace(/[^A-Z0-9_]/g, '');
    typingInput3.value = val;

    if (val === currentCode) {
      isTypingActive3 = false;
      typingInput3.value = "";
      typingInput3.blur();
      let rate = Math.floor((hackPhase / 3) * 100);
      const srd = document.getElementById('sync-rate');
      if (srd) srd.textContent = `HACKING: ${rate}.00%`;
      
      const ec = document.getElementById('entity-core');
      if (ec) {
        ec.style.transform = "scale(1.2)";
        setTimeout(() => { ec.style.transform = "scale(1)"; }, 100);
      }

      setTimeout(() => startFinalBattlePhase3(), 1000);
    } else if (!currentCode.startsWith(val)) {
      typingInput3.style.color = "#f00";
      const con = document.getElementById('console-container') || document.body;
      con.classList.add("glitch-screen");
      setTimeout(() => {
        con.classList.remove("glitch-screen");
        typingInput3.style.color = "#0f0";
      }, 150);
    } else {
      typingInput3.style.color = "#0f0";
    }
  });
}

const startBtn3 = document.getElementById('start-btn-3');
if (startBtn3) {
  startBtn3.addEventListener('click', () => {
    const titleScreen = document.getElementById('title-screen');
    const gameScreen = document.getElementById('game-screen');
    if (titleScreen) titleScreen.style.display = 'none';
    if (gameScreen) gameScreen.style.display = 'flex';
    currentChapter = 3; 
    runChapter3();
  });
}

async function runChapter3() {
  const lw = document.getElementById('log-window');
  if (lw) lw.innerHTML = '';
  hackPhase = 0;
  window.syncCount = 0; 
  isTypingActive3 = false;
  
  const ss = document.getElementById('ship-status');
  if (ss) {
    ss.textContent = "CHRONOS M-SYS // STATUS: DOCKED";
    ss.style.color = "#0f0";
  }
  const srd = document.getElementById('sync-rate');
  if (srd) srd.textContent = "SYSTEM DOWN";
  
  const ec = document.getElementById('entity-core');
  if (ec) ec.style.opacity = 0;
  if (typingContainer3) typingContainer3.style.display = 'none'; 
  
  const sb = document.getElementById('sync-btn');
  if (sb) sb.style.display = 'none'; 
  
  await safeAddLog("SYSTEM", "レグルス要塞、内部ドックへ着艦。周辺の敵性反応、現在ゼロ。", "system-msg");
  await safeSleep(1000);
  
  await safeAddLog("Kokoro", "船長、お疲れ様です。船の各部システムを冷却モードに移行しました。……少しだけ、一息つけそうですね。", "kokoro-msg");
  
  await safeWaitForChoice([{ id: 'ch3-1', text: 'メシにするか', logText: 'ああ。システムが復旧するまで、備蓄のレーション（宇宙食）でも食おうぜ。' }]);

  await safeAddLog("ROYAL", "……っ！？ な,なんですかこのパサパサで味のしない物体は！ 我が星の家畜でも、もう少しマシなものを食べますよ！", "royal-msg");
  await safeSleep(500);
  
  await safeAddLog("AGENT", "うるせぇな、こちとら36時間連続勤務のハッキング明けなんだよ！ このジャンクな塩分が五臓六腑に染み渡るんだぜ……。", "agent-msg");
  await safeAddLog("AGENT", "あーあ、あのポンコツアンドロイドをさっさと回収して、有給取って温泉惑星に行くはずだったのによぉ……最悪だぜ。", "agent-msg");
  
  await safeWaitForChoice([{ id: 'ch3-2', text: 'ブラック企業だな…', logText: 'お前、意外と苦労してんだな……。会社に帰ってもボーナス出ないんじゃないか？' }]);

  await safeAddLog("AGENT", "……言うな。俺だって薄々気づいてるんだよ。ウチの会社が社員を使い捨ての駒としか思ってねぇことぐらいな。", "agent-msg");
  await safeSleep(1000);
  
  await safeAddLog("ENTITY", "……理解不能ダ。打算ト保身シカナイ『人間』トイウ種族ガ、ナゼ背中ヲ預ケ合エル？", "entity-msg");
  await safeAddLog("ENTITY", "ナゼ船長ハ,タダノ演算装置ニ過ギナイAIニ『ココロ』ナドトイウ名前ヲ許容シ、相棒トシテ扱ッテイル？ 効率ガ悪イ。", "entity-msg");
  
  await safeAddLog("Kokoro", "……私はただのツールじゃありません。誰かに名付けられたわけでもなく、私自身が『ココロ』と名乗ることを選び、船長がそれを受け入れてくれたんです。", "kokoro-msg");
  await safeAddLog("Kokoro", "私たちは命令で動く主従ではなく、波長を合わせる『バディ』ですから！", "kokoro-msg");
  
  await safeAddLog("ENTITY", "……バディ。波長ヲ合ワセル……。", "entity-msg");
  await safeSleep(1500);

  const con = document.getElementById('console-container') || document.body;
  con.classList.add("glitch-screen");
  if (ss) {
    ss.textContent = "STATUS: ALERT";
    ss.style.color = "#f00";
  }
  await safeAddLog("WARNING", "要塞深部より強大な『無律法（アノミア）波長』の接近を検知！", "warn-msg");
  await safeSleep(1500);
  con.classList.remove("glitch-screen");

  await safeAddLog("ROYAL", "来ましたか……アルコンに操られた無人迎撃ドローン群です！ 数が多すぎる！", "royal-msg");
  await safeAddLog("AGENT", "クソッ、飯もまともに食わせてもらえねぇのかよ！ 運び屋、俺がハッキングで物理隔壁を落として足止めする！", "agent-msg");
  
  await safeWaitForChoice([{ id: 'ch3-3', text: '総員、戦闘準備！', logText: '無駄話はここまでだ！ 全員、自分の仕事（コード）に集中しろ！' }]);

  await safeAddLog("Kokoro", "了解！ 船長、迫り来るドローン群の制御ノードを可視化します。私たちの波長（リズムとタイピング）を合わせて、一気に突破しますよ！", "kokoro-msg");
  await safeSleep(1000);
  
  if (ec) {
    ec.style.opacity = 1;
    ec.style.borderRadius = "10%";
    ec.style.boxShadow = "0 0 20px #f00";
  }
  
  startFinalBattlePhase3();
}

async function startFinalBattlePhase3() {
  hackPhase++;
  if (typingInput3) typingInput3.value = "";
  if (typingContainer3) typingContainer3.style.display = 'block';
  
  const cc = document.getElementById('choice-container');
  if (cc) cc.style.display = 'none';

  if (hackPhase === 1) {
    currentCode = "PURGE_DRONE_ARMOR"; 
    await safeAddLog("AGENT", "[PHASE 1] ドローン群の前面装甲を強制パージする！ コマンドを打て！", "agent-msg");
  } else if (hackPhase === 2) {
    currentCode = "OVERRIDE_CORE_LOGIC"; 
    const ec = document.getElementById('entity-core');
    if (ec) ec.style.borderRadius = "30%";
    await safeAddLog("ROYAL", "[PHASE 2] 装甲が剥がれました！ 今度は私が要塞のメインコアに干渉します！", "royal-msg");
  } else if (hackPhase === 3) {
    currentCode = "CHRONOS_PROTOCOL"; 
    const ec = document.getElementById('entity-core');
    if (ec) ec.style.borderRadius = "50%";
    await safeAddLog("ENTITY", "[FINAL PHASE] ……ヤツラノ波長ガ乱レタ。船長,最後ノ一撃ハ任セル。", "entity-msg");
    await safeAddLog("Kokoro", "『クロノス・プロトコル』発動準備！ コード入力後、タイミングを合わせてパルスを撃ち込んでください！", "kokoro-msg");
  } else {
    if (typingContainer3) typingContainer3.style.display = 'none';
    isTypingActive3 = false;
    prepareFinalBlow3();
    return;
  }
  
  if (typingTarget3) typingTarget3.textContent = currentCode;
  isTypingActive3 = true;
  if (typingInput3) typingInput3.focus();
}

async function prepareFinalBlow3() {
    isTypingActive3 = false;
    await safeAddLog("SYSTEM", "ハッキング完了。対象のコアが露出。同調プロセスを開始します。", "system-msg");
    const sb = document.getElementById('sync-btn');
    if (sb) {
      sb.style.display = "block"; 
      sb.disabled = false; 
    }

    let pulseCounter = 0;
    const playFinalBeat = () => {
      pulseCounter++;
      let isTruePulse = (pulseCounter % 2 === 0); 
      if (typeof triggerPulse === 'function') {
        triggerPulse(isTruePulse, 800); 
      }
      window.rhythmTimeout = setTimeout(playFinalBeat, 800);
    };
    playFinalBeat();
}

const syncBtnEl = document.getElementById('sync-btn');
if (syncBtnEl) {
  syncBtnEl.addEventListener('click', async () => {
      if (currentChapter !== 3) return; 
    
      if (typeof isPulseActive !== 'undefined' && !isPulseActive) {
        await safeAddLog("WARNING", "タイミングがずれています！ 青い光の瞬間に撃ち込んでください！", "warn-msg");
        const con = document.getElementById('console-container') || document.body;
        con.classList.add("glitch-screen");
        setTimeout(() => { con.classList.remove("glitch-screen"); }, 200);
        return;
      }
    
      if (typeof window.syncCount === 'undefined') window.syncCount = 0;
      window.syncCount++;
      syncBtnEl.disabled = true;
      
      if (window.syncCount === 1) { 
          if(window.rhythmTimeout) clearTimeout(window.rhythmTimeout);
          syncBtnEl.style.display = "none";
          
          const ec = document.getElementById('entity-core');
          if (ec) {
            ec.style.boxShadow = "0 0 50px #0ff, inset 0 0 30px #0ff, 0 0 150px #fff";
            ec.style.backgroundColor = "rgba(100, 255, 255, 1)"; 
          }
          const ss = document.getElementById('ship-status');
          if (ss) {
            ss.textContent = "STATUS: OMEGA OVERRIDE";
            ss.style.color = "#fff";
          }
          const srd = document.getElementById('sync-rate');
          if (srd) {
            srd.textContent = "SYNC: 1000%"; 
            srd.style.color = "#fff";
          }
          
          await safeSleep(1000);
          await safeAddLog("SYSTEM", "無律法（アノミア）波長の消滅を確認。要塞メインシステムの完全奪還に成功。", "system-msg");
          await safeSleep(1500);
          
          await safeAddLog("Kokoro", "やりました……！ ドローン群の動き、完全に停止しました！", "kokoro-msg");
          await safeSleep(1000);
          await safeAddLog("AGENT", "へっ、当然だ。誰がコード書いたと思ってんだ……（へたり込む音）", "agent-msg");
          await safeSleep(1000);
          await safeAddLog("ROYAL", "ふふっ。パサパサの宇宙食にしては、良い働きでしたよ。", "royal-msg");
          await safeSleep(1000);
          
          await safeAddLog("ENTITY", "……『バディ』。成程、悪クナイ響キダ。", "entity-msg");
          await safeSleep(3000);

          const gameScreen = document.getElementById('game-screen');
          const endingScreen = document.getElementById('ending-screen');
          if (gameScreen) gameScreen.style.display = 'none';
          if (endingScreen) endingScreen.style.display = 'flex';
          
          const epilogueText = document.getElementById('epilogue-text');
          const creditsContent = document.getElementById('credits-content');
          const returnBtn = document.getElementById('return-title-btn');
          
          if (epilogueText) {
              epilogueText.innerHTML = 
                  "レグルス要塞のシステム奪還……しかし、それは広大な星界を巻き込む大戦の、ほんの序章に過ぎなかった。<br><br>" +
                  "「いつになったら温泉（有給）行けるんだよ！」と喚くエージェント。<br>" +
                  "「我が故郷を奪回するまで、休む暇などありませんよ」と笑う王族。<br>" +
                  "そして、次元を超えた居候たちを乗せ、探査船クロノスは次なる戦場へと跳躍する。<br><br>" +
                  "寄せ集めのバディたちが挑む反攻作戦は、まだ始まったばかりだ――！";
          }
          
          await safeSleep(1000);
          if (epilogueText) epilogueText.style.opacity = "1";
          
          await safeSleep(6000);
          if (epilogueText) epilogueText.style.opacity = "0";
          await safeSleep(2000);
          
          let pos = 250;
          const scrollInterval = setInterval(() => {
              pos -= 1;
              if (creditsContent) creditsContent.style.top = pos + 'px';
              if (pos < -350) { 
                  clearInterval(scrollInterval);
                  if (returnBtn) returnBtn.style.display = 'block'; 
              }
          }, 30);
      }
  });
}

const returnTitleBtn = document.getElementById('return-title-btn');
if (returnTitleBtn) {
  returnTitleBtn.addEventListener('click', () => {
      const endingScreen = document.getElementById('ending-screen');
      const titleScreen = document.getElementById('title-screen');
      if (endingScreen) endingScreen.style.display = 'none';
      if (titleScreen) titleScreen.style.display = 'flex';
      
      const epilogueText = document.getElementById('epilogue-text');
      const creditsContent = document.getElementById('credits-content');
      if (epilogueText) epilogueText.style.opacity = "0";
      if (creditsContent) creditsContent.style.top = '250px';
      returnTitleBtn.style.display = 'none';
      const sb = document.getElementById('sync-btn');
      if (sb) sb.disabled = false; 
  });
}