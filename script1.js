let currentChapter = 1; // 今何章をプレイしているかの目印

const titleScreen = document.getElementById('title-screen');
const gameScreen = document.getElementById('game-screen');
const startBtn = document.getElementById('start-btn-1');

const logWindow = document.getElementById('log-window');
const entityCore = document.getElementById('entity-core');
const syncBtn = document.getElementById('sync-btn');
const choiceContainer = document.getElementById('choice-container');
const container = document.getElementById('console-container');
const syncRateDisplay = document.getElementById('sync-rate');
const shipStatus = document.getElementById('ship-status');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// タイピングエフェクト付きの addLog
function addLog(speaker, message, className) {
  return new Promise((resolve) => {
    const div = document.createElement('div');
    div.className = `log-entry ${className}`;
    logWindow.appendChild(div);
    
    const speakerText = speaker ? `[${speaker}] ` : "";
    div.textContent = speakerText;
    
    let i = 0;
    function typeWriter() {
      if (i < message.length) {
        div.textContent += message.charAt(i);
        i++;
        logWindow.scrollTop = logWindow.scrollHeight; 
        setTimeout(typeWriter, 20); 
      } else {
        resolve(); 
      }
    }
    typeWriter();
  });
}

function waitForChoice(choices) {
  return new Promise(resolve => {
    choiceContainer.innerHTML = ''; 
    choiceContainer.style.display = 'flex';
    syncBtn.style.display = 'none'; 

    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice.text;
      btn.onclick = async () => {
        choiceContainer.style.display = 'none';
        // 選択肢のセリフにも await をつける
        await addLog("CAPTAIN", choice.logText || choice.text, "captain-msg");
        resolve(choice.id);
      };
      choiceContainer.appendChild(btn);
    });
  });
}

let rhythmTimeout;
let isPulseActive = false;
let syncCount = 0;
let currentPhase = 1;
let pulseCounter = 0;
const maxSync = 3; 

function triggerPulse(isTrue, duration) {
  entityCore.style.transition = "all 0.2s ease-out";
  entityCore.style.transform = "scale(1.5)";

  if (isTrue) {
    entityCore.style.boxShadow = "0 0 30px #0ff, inset 0 0 20px #0ff";
    entityCore.style.borderColor = "#0ff";
    isPulseActive = true;
  } else {
    entityCore.style.boxShadow = "0 0 30px #f00, inset 0 0 20px #f00";
    entityCore.style.borderColor = "#f00";
    isPulseActive = false;
  }

  setTimeout(() => {
    entityCore.style.transform = "scale(0.8)";
    entityCore.style.boxShadow = "0 0 5px #0f0";
    entityCore.style.borderColor = "#0f0";
  }, duration * 0.4);

  if (isTrue) {
    setTimeout(() => { isPulseActive = false; }, duration * 0.85);
  }
}

function startRhythm(level) {
  if (rhythmTimeout) clearTimeout(rhythmTimeout);
  entityCore.classList.remove("pulse-anim"); 
  pulseCounter = 0;
  syncBtn.style.display = "block";

  const playBeat = () => {
    pulseCounter++;
    let speed = 1500;
    let isTruePulse = true;

    if (level === 1) {
      speed = 1500;
      isTruePulse = true;
    } else if (level === 2) {
      speed = 1200;
      isTruePulse = (pulseCounter % 3 !== 0);
    } else if (level === 3) {
      speed = 900;
      isTruePulse = (pulseCounter % 2 !== 0);
    } else if (level === 4) {
      speed = 1000;
      isTruePulse = true;
    }

    triggerPulse(isTruePulse, speed);
    rhythmTimeout = setTimeout(playBeat, speed);
  };

  playBeat();
}

async function runStory() {
  logWindow.innerHTML = '';
  syncCount = 0;
  currentPhase = 1;
  shipStatus.textContent = "CHRONOS M-SYS // STATUS: NOMINAL";
  shipStatus.style.color = "#0f0";
  syncRateDisplay.textContent = "SYNC: 0.00%";
  entityCore.style.opacity = 0;
  entityCore.style.transform = "scale(1)";
  entityCore.style.boxShadow = "0 0 15px #0f0";

  // すべての addLog の前に await を追加！
  await addLog("SYSTEM", "探査船クロノス、指定宙域の観測ミッションを完了。", "system-msg");
  await sleep(1000);
  await addLog("SYSTEM", "これより帰還のための次元跳躍シーケンスへ移行します。", "system-msg");
  await sleep(1000);

  await addLog("Kokoro", "船長、長時間のオペレーションお疲れ様です。帰還軌道の計算、順調ですよ。", "kokoro-msg");
  
  await waitForChoice([
    { id: 'coffee', text: 'ああ、頼りにしてるよ', logText: 'ああ、頼りにしてるよ、ココロ。あとの航法制御は任せたぞ。' }
  ]);

  await addLog("Kokoro", "ふふっ、お任せください。……あれ？ 船長、貨物ベイの第3ブロックから微弱な生体反応のようなシグナルを検知しました。", "kokoro-msg");
  
  await waitForChoice([
    { id: 'cargo', text: '積み荷の検査データを確認する', logText: 'なんだって？ そんな積荷の予定は聞いてないぞ。データを出せ。' }
  ]);

  await addLog("SYSTEM", "警告。極秘積荷[UNIT-09：戦闘型アンドロイド]のロックが強制解除されました。", "warn-msg");
  await sleep(1000);

  container.classList.add("glitch-screen");
  shipStatus.textContent = "STATUS: OVERRIDE";
  shipStatus.style.color = "#ff0";
  await addLog("WARNING", "航法コンピュータが外部からの高次元波形によって乗っ取られています！ 座標強制書換え！", "warn-msg");
  await sleep(1500);
  container.classList.remove("glitch-screen");

  await addLog("Kokoro", "船長！貨物ベイのアンドロイドが勝手に起動し、何者かがその体に意識を定着させようとしています……まるで、自分を収める『器』にするかのように！", "kokoro-msg");
  await addLog("Kokoro", "このままでは船の制御が奪われ、空間ごと押し潰されます。……対抗するには、私たちもその通信に割り込んで主導権を奪い返すしかありません！", "kokoro-msg");
  
  entityCore.style.opacity = 1;
  entityCore.style.borderRadius = "10%";
  
  await waitForChoice([
    { id: 'sync', text: 'アンドロイドの回線に強行接続する', logText: '勝手にうちの船を乗っとらせるかよ！ココロ、回線を直結しろ！' }
  ]);

  await addLog("Kokoro", "了解！メインモニターに波長を可視化しました。コアの明滅（青い光）に合わせて、パルスを撃ち込んでください！", "kokoro-msg");
  
  currentPhase = 1;
  startRhythm(1); 
}

syncBtn.addEventListener('click', async () => {
  if (currentChapter !== 1) return; // 第1章じゃない時はここで止める

  if (!isPulseActive) {
    await addLog("WARNING", "弾かれました！相手からの反撃ノイズを避けて、青い光に同調してください！", "warn-msg");
    container.classList.add("glitch-screen");
    setTimeout(() => container.classList.remove("glitch-screen"), 200);
    return;
  }

  syncCount++;
  syncBtn.disabled = true;
  let rate = Math.floor((syncCount / maxSync) * 100);
  
  if (currentPhase === 1) {
    syncRateDisplay.textContent = `SYNC: ${rate}.00%`;
    await addLog("SYSTEM", `パルス直撃。回線掌握率 ${rate}%`, "system-msg");

    if (syncCount === 1) {
      entityCore.style.borderRadius = "30%";
      if(rhythmTimeout) clearTimeout(rhythmTimeout); 
      
      await sleep(500);
      await addLog("Kokoro", "回線の一部を確保！……ですが、相手の強固な自己防衛プログラムが反撃してきました！", "kokoro-msg");
      await addLog("Kokoro", "赤い光は向こうからの拒絶波長です。青い光の時だけパルスを撃ち込んで、押し返してください！", "kokoro-msg");
      
      syncBtn.disabled = false;
      startRhythm(2); 
      
    } else if (syncCount === 2) {
      entityCore.style.borderRadius = "40%";
      if(rhythmTimeout) clearTimeout(rhythmTimeout);
      
      await sleep(500);
      await addLog("Kokoro", "防壁を押し返しています！ しかし、流れ込んでくるデータから……膨大な戦火の記憶が聞こえる？", "kokoro-msg");
      await addLog("UNKNOWN", "……ワレワレノ星界ガ……侵略者ニ……クチ果テテイク……。", "entity-msg");
      await addLog("Kokoro", "彼らは高次元の戦争から逃れるため、この船の積荷を『器』にして逃げ込んできたのです……！ 波長が乱れます、気をつけて！", "kokoro-msg");
      
      syncBtn.disabled = false;
      startRhythm(3); 

    } else if (syncCount >= maxSync) {
      if(rhythmTimeout) clearTimeout(rhythmTimeout);
      syncBtn.style.display = "none";
      entityCore.style.borderRadius = "50%";
      
      await sleep(500);
      await addLog("Kokoro", "制圧完了！戦闘型アンドロイドを介して、相手の意識と直接対話できる回路を開きました！", "kokoro-msg");

      await addLog("ENTITY", "……通信確立。驚イタ。私ノ意識ノ乗っ取りヲ、人間トAIノ演算デ押し返ストハ。", "entity-msg");
      await addLog("ENTITY", "私ハ彼方ノ星界ヨリ、侵略者カラ逃レテコノ器ニ意識ヲ移そうとした。ダガ、ヤツラハコノ次元マデ追イテキテイル。", "entity-msg");
      await addLog("Kokoro", "船長、相手の目的が分かりました。彼らは追手から逃れるためにこの船を利用しただけで、こちらを滅ぼす意図はないようです。", "kokoro-msg");
      
      await waitForChoice([
        { id: 'buddy1', text: '勝手に人の船を使うなよ', logText: '勝手に積み荷を開けて乗っ取りをかけるわ、追っ手を引き連れてくるわ、いい度胸だな。' }
      ]);

      await addLog("ENTITY", "……危険ナ航海ニナルド云ッタハズダ。ダガ、生キ残リタイナラ協力シロ。", "entity-msg");
      await addLog("ENTITY", "侵略者ヲ撃退スル為ニハ、シシ座アルファ星『レグルス』ニアル古ノ要塞へ向カネバナラナイ。ソコニ反攻ノ鍵ガアル。", "entity-msg");
      
      container.classList.add("glitch-screen");
      await addLog("WARNING", "敵性高次元生命体（侵略者）の追尾波長を検知！！脱出急げ！！", "warn-msg");
      await sleep(1500);
      container.classList.remove("glitch-screen");
      
      await addLog("ENTITY", "……追手ガ来タ。ココハ一時的ニ私ガ迎撃ヲ担当スル。クロノス、先ニ離脱シロ。", "entity-msg");
      await addLog("Kokoro", "ここで彼を置いていったら、私たちの航路も追跡されて終わりです！", "kokoro-msg");
      
      await waitForChoice([
        { id: 'logic', text: '勝手に置いていけるか、乗っていくぞ', logText: '置いていったら後が面倒だ。仕方がねぇ、お前の要塞まで付き合ってやるよ。' }
      ]);

      await addLog("ENTITY", "……フッ。勝手ナ人間ダ。……ガ、悪クナイ判断だ。", "entity-msg");
      await addLog("Kokoro", "船長、機関出力120％へオーバーライド！戦闘型アンドロイドとメインエンジンを直結、強行突破します！", "kokoro-msg");
      
      syncCount = 0;
      currentPhase = 2;
      shipStatus.textContent = "STATUS: OVERDRIVE";
      shipStatus.style.color = "#ff0";
      
      startRhythm(4); 
      syncBtn.disabled = false;
    }
  } else if (currentPhase === 2) {
    syncRateDisplay.textContent = `ENGINE SYNC: ${rate}.00%`;
    await addLog("SYSTEM", `機関直結。ドライブ同期率 ${rate}%`, "system-msg");

    if (syncCount === 1) {
      entityCore.style.backgroundColor = "rgba(0, 255, 255, 0.4)";
      await addLog("Kokoro", "臨界点突破！追尾波長を強行排除します！", "kokoro-msg");
      syncBtn.disabled = false;
    } else if (syncCount === 2) {
      entityCore.style.backgroundColor = "rgba(0, 255, 255, 0.7)";
      await addLog("ENTITY", "出力全開。……振り切るぞ、運び屋。", "entity-msg");
      syncBtn.disabled = false;
    } else if (syncCount >= maxSync) {
      if(rhythmTimeout) clearTimeout(rhythmTimeout);
      syncBtn.style.display = "none";
      
      entityCore.style.boxShadow = "0 0 50px #0ff, inset 0 0 30px #0ff, 0 0 100px #fff";
      entityCore.style.backgroundColor = "rgba(100, 255, 255, 0.9)";
      shipStatus.textContent = "STATUS: CHAPTER 1 COMPLETE";
      shipStatus.style.color = "#0ff";
      syncRateDisplay.style.color = "#0ff";
      
      await addLog("SYSTEM", "同期率 100%。次元跳躍エンジンの制御を一時的に共有。", "system-msg");
      
      await waitForChoice([
        { id: 'fly', text: 'レグルスの要塞へ、跳躍開始！', logText: '全クルー、目標設定！しし座アルファ星レグルスへ跳躍する！' }
      ]);

      await addLog("Kokoro", "了解！……追尾波長の振り切りを確認。空間跳躍、完了します。", "kokoro-msg");
      
      await addLog("SYSTEM", "HYPER SPACE JUMP ---------- INITIATED. -- [CHAPTER 1 COMPLETED] --", "system-msg");
      
      setTimeout(() => {
        alert("CHRONOS PROTOCOL\n\n- CHAPTER 1 COMPLETED -\n\nご遊プレイありがとうございました！\n（第2章へ続く……）");
        gameScreen.style.display = 'none';
        titleScreen.style.display = 'flex';
        syncBtn.style.display = 'none';
      }, 1500);
    }
  }
});

// タイトル画面のスタートボタンを押したとき
startBtn.addEventListener('click', () => {
  titleScreen.style.display = 'none';
  gameScreen.style.display = 'flex';
  currentChapter = 1;
  runStory();
});

// スマホで画面をタッチしたときにキーボードを起動する
document.addEventListener('click', () => {
  const mInput = document.getElementById('mobile-typing-input');
  if (mInput) {
    mInput.focus();
  }
});