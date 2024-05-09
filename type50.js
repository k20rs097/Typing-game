// 出題される単語
let question = ["high level language", "low level language", "source code", "executable file", "compiler language",
                "interpreter language", "commit", "rollback", "bug", "debug",
                "path", "variable", "assignment", "boolean datatype", "arithmetic operator",
                "comparison operator", "logical operator", "function", "comment", "client",
                "server", "model-view-controller", "database", "SQL", "framework"];

// fetch("/source/questions.json")
//     .then(response => response.json())
//     .then(data => {
//         // dataはJSONファイルの内容を表すJavaScriptオブジェクトです
//         data.forEach(item => {
//         console.log(item.question); // questionを表示する
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching JSON:', error);
//     });
// カウントダウン
let readyTime = 2;
// ゲームの残り時間
let remainingTime = 100;
// 出題する単語をランダムで決める
let questionNumber = Math.floor(Math.random() * question.length);
// 変数question_numberを記憶
let questionPrevious = questionNumber;
// 正しく入力した単語の文字の数、初期値は0
let questionAnswer = 0;
// 出題される単語の文字数を取得
let questionLength = question[questionNumber].length;
// 入力したキーボードの数
let typed = 0;
// ミスの数
let missType = 0;
// タイピングし終えた単語の数
let answered = 0;
// マウスを押すとカウントダウン開始
window.addEventListener("mousedown", ready, {once: true});
window.addEventListener("keypress", keyPressed);

// ここに作った関数をまとめる
function keyPressed(e) {
    let keyCode = e.key;
    typed++;
    if (readyTime < 0 && remainingTime >= 0) {
        if (questionLength == questionLength - questionAnswer) {
            displayWords();
        }
        keyCodeCheck(keyCode);
        if (questionLength - questionAnswer === 0) {
            setQuestion();
            answered += 1;
            document.getElementById("typed-words").innerHTML = "Typed words: " + answered;
        }
    }
}

// ゲーム開始までのカウントダウン
function ready() {
    readyTimer = setInterval(function(){
        document.getElementById("start").innerHTML = "READY...";
        readyTime -= 1;
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
    let remainingTimer = setInterval(function(){
        remainingTime -= 1;
        document.getElementById("time-remaining").innerHTML = remainingTime;
        if (remainingTime <= 0) {
            clearInterval(remainingTimer);
            finish();
            document.getElementById("result").style.zIndex = 30;
        }
    }, 1000);
}

// 問題を表示する
function displayWords() {
    document.getElementById("time-remaining").innerHTML = remainingTime;
    document.getElementById("word-question").innerHTML = question[questionNumber].substring(questionAnswer, questionLength);
    document.getElementById("word-remaining").innerHTML = question[questionNumber].substring(questionAnswer, questionLength);
    document.getElementById("typed-words").innerHTML = "Typed words: " + answered;
}

// 変数のセット、問題の表示
function setQuestion() {
    // 前の問題と被らないようにする
    while (questionNumber === questionPrevious) {
        questionNumber = Math.floor(Math.random() * question.length);
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
        document.getElementById("word-remaining").innerHTML = "|" + question[questionNumber].substring(questionAnswer, questionLength);
    } else {
        missType += 1;
        document.getElementById("miss").currentTime = 0;
        document.getElementById("miss").play()
    }
}

// 変数をリセットする関数
function reset() {
    readyTime = 0;
    remainingTime = 60;
    questionAnswer = 0;
    answered = 0;
    typed = 0;
    missType = 0;
    document.getElementById("word-remaining").innerHTML = "";
    document.getElementById("time-remaining").innerHTML = "";
}

// 変数のリセット、結果の表示
function finish() {
    let accuracy = Math.round((typed - missType) / typed * 1000) / 10
    if (isNaN(accuracy)) {
        accuracy = 0;
    }
    let score = Math.round((typed - missType) * answered * accuracy);
    if (isNaN(score)) {
        score = 0;
    }
    document.getElementById("finish").innerHTML = "Finish!";
    document.getElementById("score").innerHTML = "Score: " + score;
    document.getElementById("resultAnswered").innerHTML = "Typed words: " + answered;
    document.getElementById("typed").innerHTML = "typed: " + typed;
    document.getElementById("missType").innerHTML = "Miss typed: " + missType;
    document.getElementById("accuracy").innerHTML = "Accuracy: " + accuracy + "%";
    reset();
}