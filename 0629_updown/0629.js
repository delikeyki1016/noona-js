// 1. 컴퓨터가 랜덤한 값을 가진다.
// 2. 사용자 입력값을 가져온다.
// 3. 사용자가 입력한 값과 랜덤 값을 비교한다. 사용자값 > 랜덤값  down! / 사용자값 < 랜덤값 up!
// 4. 총 기회는 5번이고, 체크를 한번 할 때마다 -1되고 0이 되면 게임 오버, 체크버튼 비활성화, 재도전을 누르면 게임 리셋
// 5. 결과를 표시한다.

const userInput = document.getElementById("userInput"); //사용자 입력
const btnCheck = document.getElementById("btnCheck"); //체크버튼
const result = document.querySelector("#result img"); //결과영역
const chanceText = document.getElementById("chance"); //남은기회영역
const hint = document.getElementById("hint"); //up down 표시영역
const btnReset = document.getElementById("btnReset"); //재도전 버튼
let chance = 10; // 기회
let randomNum = 0; // 랜덤값
let userInputArr = []; // 입력한 값 배열

userInput.addEventListener("focus", function () {
    userInput.value = "";
});

btnCheck.addEventListener("click", play);
userInput.addEventListener("keydown", function (e) {
    if (chance > 0 && e.key === "Enter") {
        play();
    }
});
btnReset.addEventListener("click", reset);

reset();

function reset() {
    btnCheck.disabled = false;
    userInputArr = [];
    chance = 5;
    chanceText.innerText = chance;
    userInput.value = "";
    hint.innerText = "Up & Down";
    result.src =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWf0VzLor2o0meZjZTsgWNFGcd-cx6g2qcaw&s";
    randomNum = Math.floor(Math.random() * 10) + 1; //1~10 랜덤값 뽑기
    console.log("정답", randomNum);
}

function play() {
    const userNum = Number(userInput.value); //input type이 number여도 받아오는 값은 string이다. 형변환 필요
    console.log("입력값", userNum);
    if (userNum < 1 || userNum > 10) {
        alert("1~10사이의 값을 입력하세요");
        return;
    }

    if (userInputArr.includes(userNum)) {
        alert("이미 입력한 값입니다.");
        return;
    }

    chance--;
    chanceText.innerText = chance;
    userInputArr.push(userNum);
    // 비교
    if (userNum < randomNum) {
        hint.innerHTML = `<i class="fa-solid fa-arrow-up"></i> Up`;
    } else if (userNum > randomNum) {
        hint.innerHTML = `<i class="fa-solid fa-arrow-down"></i> Down`;
    } else {
        hint.innerText = "-";
        result.src =
            "https://mblogthumb-phinf.pstatic.net/MjAxNzA3MDRfMTA2/MDAxNDk5MTIzNzA3ODcw._9JENoaDKbcC01JQ6PBWneJVBY1VntvR3YmO1Nsa_Q0g.UmjYH7SkMchjoVlqSuWDcP0Hglv3-XGSEMH_ayjM3ncg.PNG.enen202/%EC%A0%95%EB%8B%B5%EC%86%8C%EB%85%80_%EA%B9%80%EC%88%98%EC%A0%95.PNG?type=w800";
        btnCheck.disabled = true;
        // btnReset.disabled = true; // 정답일 경우 재도전을 막음
        chance = 0;
        return;
    }
    if (chance === 0) {
        result.src =
            "https://d3kxs6kpbh59hp.cloudfront.net/community/COMMUNITY/9c2c1fec149744c6a8f5eb386530eba6/ad050bc31abb431ba3f0a59c28d4ff39.jpg";
        btnCheck.disabled = true;
    }
}

// if (gameover) {실행코드} 의 의미는 gameover가 true일때만 실행코드가 실행되는 것이기 때문에
// if (gaemeover == true) 와 같은 의미이다.
