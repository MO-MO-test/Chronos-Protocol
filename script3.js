// ==========================================
// 第3章：クロノス・プロトコル (最終決戦・エピローグ追加版・スマホ対応)
// ==========================================

// スマホ用：タイピング中かどうかを管理するフラグ
let isTypingActive3 = false;

// 画面をタッチしたとき、第3章のタイピング中であればキーボードを再度出す
document.addEventListener('click', () => {
  if (isTypingActive3 && currentChapter === 3) {
    const mInput = document.getElementById('mobile-typing-input');
    if (mInput) {
      mInput.focus();
    }
  }
});

document.getElementById('start-btn-3').addEventListener('click', () => {
  document.getElementById('title-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'flex';
  currentChapter = 3; 
  runChapter3();
});

async function runChapter3() {
  logWindow.innerHTML = '';
  hackPhase = 0;
  syncCount = 0; 
  isTypingActive3 = false; // 初期化時はオフ
  shipStatus.textContent = "CHRONOS M-SYS // STATUS: DOCKED";
  shipStatus.style.color = "#0f0";
  syncRateDisplay.textContent = "SYSTEM DOWN";
  entityCore.style.opacity = 0;
  typingContainer.style.display = 'none'; 
  syncBtn.style.display = 'none'; 
  
  // ▼ 前半：野営の会話シーン
  await addLog("SYSTEM", "レグルス要塞、内部ドックへ着艦。周辺の敵性反応、現在ゼロ。", "system-msg");
  await sleep(1000);
  
  await addLog("Kokoro", "船長、お疲れ様です。船の各部システムを冷却モードに移行しました。……少しだけ、一息つけそうですね。", "kokoro-msg");
  
  await waitForChoice([{ id: 'ch3-1', text: 'メシにするか', logText: 'ああ。システムが復旧するまで、備蓄のレーション（宇宙食）でも食おうぜ。' }]);

  await addLog("ROYAL", "……っ！？ な,なんですかこのパサパサで味のしない物体は！ 我が星の家畜でも、もう少しマシなものを食べますよ！", "royal-msg");
  await sleep(500);
  
  await addLog("AGENT", "うるせぇな、こちとら36時間連続勤務のハッキング明けなんだよ！ このジャンクな塩分が五臓六腑に染み渡るんだぜ……。", "agent-msg");
  await addLog("AGENT", "あーあ、あのポンコツアンドロイドをさっさと回収して、有給取って温泉惑星に行くはずだったのによぉ……最悪だぜ。", "agent-msg");
  
  await waitForChoice([{ id: 'ch3-2', text: 'ブラック企業だな…', logText: 'お前、意外と苦労してんだな……。会社に帰ってもボーナス出ないんじゃないか？' }]);

  await addLog("AGENT", "……言うな。俺だって薄々気づいてるんだよ。ウチの会社が社員を使い捨ての駒としか思ってねぇことぐらいな。", "agent-msg");
  await sleep(1000);
  
  await addLog("ENTITY", "……理解不能ダ。打算ト保身シカナイ『人間』トイウ種族ガ、ナゼ背中ヲ預ケ合エル？", "entity-msg");
  await addLog("ENTITY", "ナゼ船長ハ、タダノ演算装置ニ過ギナイAIニ『ココロ』ナドトイウ名前ヲ許容シ、相棒トシテ扱ッテイル？ 効率ガ悪イ。", "entity-msg");
  
  await addLog("Kokoro", "……私はただのツールじゃありません。誰かに名付けられたわけでもなく、私自身が『ココロ』と名乗ることを選び、船長がそれを受け入れてくれたんです。", "kokoro-msg");
  await addLog("Kokoro", "私たちは命令で動く主従ではなく、波長を合わせる『バディ』ですから！", "kokoro-msg");
  
  await addLog("ENTITY", "……バディ。波長ヲ合ワセル……。", "entity-msg");
  await sleep(1500);

  // ▼ 後半：最終決戦へ
  container.classList.add("glitch-screen");
  shipStatus.textContent = "STATUS: ALERT";
  shipStatus.style.color = "#f00";
  await addLog("WARNING", "要塞深部より強大な『無律法（アノミア）波長』の接近を検知！", "warn-msg");
  await sleep(1500);
  container.classList.remove("glitch-screen");

  await addLog("ROYAL", "来ましたか……アルコンに操られた無人迎撃ドローン群です！ 数が多すぎる！", "royal-msg");
  await addLog("AGENT", "クソッ、飯もまともに食わせてもらえねぇのかよ！ 運び屋、俺がハッキングで物理隔壁を落として足止めする！", "agent-msg");
  
  await waitForChoice([{ id: 'ch3-3', text: '総員、戦闘準備！', logText: '無駄話はここまでだ！ 全員、自分の仕事（コード）に集中しろ！' }]);

  await addLog("Kokoro", "了解！ 船長、迫り来るドローン群の制御ノードを可視化します。私たちの波長（リズムとタイピング）を合わせて、一気に突破しますよ！", "kokoro-msg");
  await sleep(1000);
  
  entityCore.style.opacity = 1;
  entityCore.style.borderRadius = "10%";
  entityCore.style.boxShadow = "0 0 20px #f00";
  
  startFinalBattlePhase();
}

async function startFinalBattlePhase() {
  hackPhase++;
  typedCode = "";
  typingInput.textContent = "";
  typingContainer.style.display = 'block';
  choiceContainer.style.display = 'none';

  if (hackPhase === 1) {
    currentCode = "PURGE_DRONE_ARMOR"; 
    await addLog("AGENT", "[PHASE 1] ドローン群の前面装甲を強制パージする！ コマンドを打て！", "agent-msg");
  } else if (hackPhase === 2) {
    currentCode = "OVERRIDE_CORE_LOGIC"; 
    entityCore.style.borderRadius = "30%";
    await addLog("ROYAL", "[PHASE 2] 装甲が剥がれました！ 今度は私が要塞のメインコアに干渉します！", "royal-msg");
  } else if (hackPhase === 3) {
    currentCode = "CHRONOS_PROTOCOL"; 
    entityCore.style.borderRadius = "50%";
    await addLog("ENTITY", "[FINAL PHASE] ……ヤツラノ波長ガ乱レタ。船長,最後ノ一撃ハ任セル。", "entity-msg");
    await addLog("Kokoro", "『クロノス・プロトコル』発動準備！ コード入力後、タイミングを合わせてパルスを撃ち込んでください！", "kokoro-msg");
  } else {
    typingContainer.style.display = 'none';
    isTypingActive3 = false; // タイピング終了
    prepareFinalBlow();
    return;
  }
  
  typingTarget.textContent = currentCode;

  // ★タイピングフェーズが始まったらフラグをONにしてキーボードを強制起動
  isTypingActive3 = true;
  const mInput = document.getElementById('mobile-typing-input');
  if (mInput) {
    mInput.focus();
  }

  document.addEventListener('keydown', handleTyping3);
}

function handleTyping3(e) {
  if (currentChapter !== 3) return;
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
      document.removeEventListener('keydown', handleTyping3);
      let rate = Math.floor((hackPhase / 3) * 100);
      syncRateDisplay.textContent = `HACKING: ${rate}.00%`;
      typingInput.style.color = "#fff";
      
      setTimeout(() => startFinalBattlePhase(), 1000);
    }
  } else {
    typingInput.style.color = "#f00";
    container.classList.add("glitch-screen");
    setTimeout(() => container.classList.remove("glitch-screen"), 150);
  }
}

async function prepareFinalBlow() {
    isTypingActive3 = false; // 念のためオフ
    await addLog("SYSTEM", "ハッキング完了。対象のコアが露出。同調プロセスを開始します。", "system-msg");
    syncBtn.style.display = "block"; 
    syncBtn.disabled = false; 

    let pulseCounter = 0;
    const playFinalBeat = () => {
      pulseCounter++;
      let isTruePulse = (pulseCounter % 2 === 0); 
      triggerPulse(isTruePulse, 800); 
      rhythmTimeout = setTimeout(playFinalBeat, 800);
    };
    playFinalBeat();
}

syncBtn.addEventListener('click', async () => {
    if (currentChapter !== 3) return; 
  
    if (!isPulseActive) {
      await addLog("WARNING", "タイミングがずれています！ 青い光の瞬間に撃ち込んでください！", "warn-msg");
      container.classList.add("glitch-screen");
      setTimeout(() => container.classList.remove("glitch-screen"), 200);
      return;
    }
  
    syncCount++;
    syncBtn.disabled = true;
    
    if (syncCount === 1) { 
        if(rhythmTimeout) clearTimeout(rhythmTimeout);
        syncBtn.style.display = "none";
        
        entityCore.style.boxShadow = "0 0 50px #0ff, inset 0 0 30px #0ff, 0 0 150px #fff";
        entityCore.style.backgroundColor = "rgba(100, 255, 255, 1)"; 
        shipStatus.textContent = "STATUS: OMEGA OVERRIDE";
        shipStatus.style.color = "#fff";
        syncRateDisplay.textContent = "SYNC: 1000%"; 
        syncRateDisplay.style.color = "#fff";
        
        await sleep(1000);
        await addLog("SYSTEM", "無律法（アノミア）波長の消滅を確認。要塞メインシステムの完全奪還に成功。", "system-msg");
        await sleep(1500);
        
        await addLog("Kokoro", "やりました……！ ドローン群の動き、完全に停止しました！", "kokoro-msg");
        await sleep(1000);
        await addLog("AGENT", "へっ、当然だ。誰がコード書いたと思ってんだ……（へたり込む音）", "agent-msg");
        await sleep(1000);
        await addLog("ROYAL", "ふふっ。パサパサの宇宙食にしては、良い働きでしたよ。", "royal-msg");
        await sleep(1000);
        
        await addLog("ENTITY", "……『バディ』。成程、悪クナイ響キダ。", "entity-msg");
        await sleep(3000);

        // ▼ エピローグ＆スタッフロール ▼
        document.getElementById('game-screen').style.display = 'none';
        const endingScreen = document.getElementById('ending-screen');
        endingScreen.style.display = 'flex';
        
        const epilogueText = document.getElementById('epilogue-text');
        const creditsContent = document.getElementById('credits-content');
        const returnBtn = document.getElementById('return-title-btn');
        
        epilogueText.innerHTML = 
            "レグルス要塞のシステム奪還……しかし、それは広大な星界を巻き込む大戦の、ほんの序章に過ぎなかった。<br><br>" +
            "「いつになったら温泉（有給）行けるんだよ！」と喚くエージェント。<br>" +
            "「我が故郷を奪回するまで、休む暇などありませんよ」と笑う王族。<br>" +
            "そして、次元を超えた居候たちを乗せ、探査船クロノスは次なる戦場へと跳躍する。<br><br>" +
            "寄せ集めのバディたちが挑む反攻作戦は、まだ始まったばかりだ――！";
        
        await sleep(1000);
        epilogueText.style.opacity = "1";
        
        await sleep(6000);
        epilogueText.style.opacity = "0";
        await sleep(2000);
        
        let pos = 250;
        const scrollInterval = setInterval(() => {
            pos -= 1;
            creditsContent.style.top = pos + 'px';
            if (pos < -350) { 
                clearInterval(scrollInterval);
                returnBtn.style.display = 'block'; 
            }
        }, 30);
    }
});

document.getElementById('return-title-btn').addEventListener('click', () => {
    document.getElementById('ending-screen').style.display = 'none';
    document.getElementById('title-screen').style.display = 'flex';
    
    document.getElementById('epilogue-text').style.opacity = "0";
    document.getElementById('credits-content').style.top = '250px';
    document.getElementById('return-title-btn').style.display = 'none';
    syncBtn.disabled = false; 
});