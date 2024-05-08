// 出題される単語
var question = ["high level language", "low level language", "source code", "executable file", "compiler language",
                "interpreter language", "commit", "rollback", "bug", "debug",
                "path", "variable", "assignment", "boolean datatype", "arithmetic operator",
                "comparison operator", "logical operator", "function", "comment", "client",
                "server", "model-view-controller", "database", "SQL", "framework"];

// カウントダウン
var readyTime = 2;

// ゲームの残り時間
var remainingTime = 60;

// 出題する単語をランダムで決める
var questionNumber = Math.floor(Math.random() * question.length);

// 変数question_numberを記憶
var questionPrevious = questionNumber;

// 正しく入力した単語の文字の数、初期値は0
var questionAnswer = 0;

// 出題される単語の文字数を取得
var questionLength = question[questionNumber].length;

// 入力したキーボードの数
var typed = 0;

// ミスの数
var missType = 0;

// タイピングし終えた単語の数
var answerd = 0;


// マウスを押すとカウントダウン開始
window.addEventListener("mousedown", ready, {once: true});

window.addEventListener("keypress", keyPress);

// ここに作った関数をまとめる
function keyPress(e) {

    var keyCode = e.key;
    typed++;

    if (readyTime < 0 && remainingTime >= 0) {
        //
        if (questionLength == questionLength - questionAnswer) {
            displayWords();
        }

        keyCodeCheck(keyCode);

        // 全部正解したら
        if (questionLength-questionAnswer === 0) {
            setQuestion();
            answerd++;
            document.getElementById("answerd").innerHTML = "Typed words: " + answerd;
        }

    }

}


// ゲーム開始までのカウントダウン
function ready() {
        readyTimer = setInterval(function(){
        document.getElementById("start").innerHTML = "READY...";
        readyTime--;
        // BUG!!!!! readyTimeが2以下の時になぜか実行される
        if (readyTime <= 0) {
            document.getElementById("start").innerHTML = "START!";
        }
        // 時間が0以下になるとタイマー処理をストップする
        if (readyTime < 0) {
            countDown();
            clearInterval(readyTimer);
            displayWords();
            document.getElementById("main").style.zIndex = 20;
        }
    }, 1000);
}


// ゲームの残り時間をカウントダウン
function countDown() {
    var remainingTimer = setInterval(function(){
        remainingTime--;
        document.getElementById("remaining").innerHTML = remainingTime;
        if (remainingTime <= 0) {
            clearInterval(remainingTimer);
            finish();
            document.getElementById("result").style.zIndex = 30;
        }
    }, 1000);
}

// 問題を表示する
function displayWords() {
    document.getElementById("upper").innerHTML =
    question[questionNumber].substring(questionAnswer, questionLength);

    document.getElementById("downer").innerHTML =
    question[questionNumber].substring(questionAnswer, questionLength);

    document.getElementById("remaining").innerHTML = remainingTime;

    document.getElementById("answerd").innerHTML = "Typed words: " + answerd;

}


// 変数のセット、問題の表示
function setQuestion() {
    // 前の問題と被らないようにする
    while (questionNumber === questionPrevious) {
        questionNumber = Math.floor( Math.random() * question.length);
    }
    questionPrevious = questionNumber;
    questionAnswer = 0;
    questionLength = question[questionNumber].length;

    displayWords();
}


// 入力されたキーが合っているか判定する
function keyCodeCheck(keyCode) {

    // 押したキーが合っていたら
    if (question[questionNumber].charAt(questionAnswer) == keyCode) {
        // 正解した文字数を1増やす
        questionAnswer += 1;
        document.getElementById("correct").currentTime = 0;
        document.getElementById("correct").play()
        // 問題の解答状況を更新、正解した文字を削除する
        document.getElementById("downer").innerHTML =
        question[questionNumber].substring(questionAnswer, questionLength);
    } else {
        missType++;
        document.getElementById("miss").currentTime = 0;
        document.getElementById("miss").play()
    }

}


// 変数をリセットする関数
function reset() {
    readyTime = 0;
    remainingTime = 60;
    questionAnswer = 0;
    answerd = 0;
    typed = 0;
    missType = 0;

    document.getElementById("downer").innerHTML = "";

    document.getElementById("remaining").innerHTML = "";

}


// 変数のリセット、結果の表示
function finish() {
    // 正答率を計算
    var accuracy = ((typed - missType) / typed) * 1000;
    accuracy = Math.round(accuracy);
    accuracy /= 10;
    var score = Math.round((typed - missType) * answerd * accuracy);

    document.getElementById("finish").innerHTML = "Finish!";
    document.getElementById("score").innerHTML = "Score: " + score;
    document.getElementById("resultAnswerd").innerHTML = "Typed words: " + answerd;
    document.getElementById("typed").innerHTML = "typed: " + typed;
    document.getElementById("missType").innerHTML = "Miss typed: " + missType;
    document.getElementById("accuracy").innerHTML = "Accuracy: " + accuracy + "%";
    reset();
}