// 1. 컴퓨터가 랜덤한 값을 가진다.
// 2. 사용자 입력값을 가져온다.
// 3. 사용자가 입력한 값과 랜덤 값을 비교한다. 사용자값 > 랜덤값  down! / 사용자값 < 랜덤값 up!
// 4. 총 기회는 5번이고, 체크를 한번 할 때마다 -1되고 0이 되면 게임 오버, 체크버튼 비활성화, 재도전을 누르면 게임 리셋
// 5. 결과를 표시한다.

const userInput = document.getElementById("userInput");
const btnCheck = document.getElementById("btnCheck"); //체크버튼
const result = document.getElementById("result"); //결과영역
const chanceText = document.getElementById("chance"); //남은기회영역
const hint = document.getElementById("hint"); //up down 표시영역
const btnReset = document.getElementById("btnReset"); //재도전 버튼
let chance; // 기회
let randomNum; // 랜덤값
let userInputArr = []; // 입력한 값 배열

function reset() {
    btnCheck.disabled = false;
    userInputArr = [];
    chance = 5;
    chanceText.innerText = chance;
    userInput.value = "";
    hint.innerText = "Up & Down";
    result.textContent = "결과";
    randomNum = Math.floor(Math.random() * 100) + 1; //1~100랜덤값 뽑기
    console.log("정답", randomNum);
}

btnCheck.addEventListener("click", function () {
    const userNum = Number(userInput.value); //input type이 number여도 받아오는 값은 string이다. 형변환 필요
    console.log("입력값", userNum);
    if (userNum < 1 || userNum > 100) {
        alert("1~100사이의 값을 입력하세요");
    } else {
        if (userInputArr.includes(userNum)) {
            alert("이미 입력한 값입니다.");
        } else {
            userInputArr.push(userNum);
            chance -= 1;
            chanceText.innerText = chance;
            // 비교
            if (userNum === randomNum) {
                result.innerText = "정답입니다!";
                hint.innerText = "-";
                btnCheck.disabled = true;
                return false; // 마지막에 정답일 때
            } else if (userNum < randomNum) {
                hint.innerHTML = `<i class="fa-solid fa-arrow-up"></i> Up`;
            } else {
                hint.innerHTML = `<i class="fa-solid fa-arrow-down"></i> Down`;
            }
            if (chance === 0) {
                result.innerText = "기회를 다 썼습니다. 재도전하세요!";
                btnCheck.disabled = true;
            }
        }
    }
});

btnReset.addEventListener("click", reset);

reset();
