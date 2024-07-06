// 1. 유저가 할일을 입력한다.
// 2. ADD 버튼을 클릭하면 할일이 추가된다.
// 2-1. 각 task는 할일정보, 완료여부 정보를 포함하는 객체를 만들어 배열에 추가함
// 3. delete버튼을 클릭하면 할일이 삭제된다.
// 4. check버튼을 클릭하면 할일이 끝나면서 밑줄이 간다.
// 4-1. check버튼 클릭 시 isDone이 true => 할일에 가운데줄이 표기
// 5. 진행중, 완료 탭을 누르면 언더바가 이동한다.
// 6. 진행중은 진행중인 리스트만, 완료는 완료된 리스트만 보여준다.
// 7. 모두 탭을 누르면 모든 리스트가 보여진다.

// 요소가져오기
const todoInput = document.getElementById("todoInput");
const btnAdd = document.getElementById("addTodo");
const todoList = document.querySelector(".task-list");

// 초기 변수 선언
let todoObj = {};
let mode = "modeAll";
let storageIndexArr = [];
let storageIndex = 0;

// 할일 추가
// 초기 설정 Add버튼 disabled
btnAdd.disabled = true;
// input 창에 입력값이 있으면 Add버튼 활성화
todoInput.addEventListener("keyup", function () {
    todoInput.value == ""
        ? (btnAdd.disabled = true)
        : (btnAdd.disabled = false);
});
// input 입력값이 있고 엔터키를 누르면 할일 추가
todoInput.addEventListener("keydown", function (e) {
    e.key === "Enter" && todoInput.value !== "" && addTodo();
});
// 클릭 시 할일 추가
btnAdd.addEventListener("click", addTodo);

// 랜덤id 만들기
function randomIDGenerate() {
    return new Date().getTime();
}

// 할일 생성 날짜 구하기
function formatDateTime() {
    const d = new Date();
    return (
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        d.getDate().toString().padStart(2, "0") +
        " " +
        d.getHours().toString().padStart(2, "0") +
        ":" +
        d.getMinutes().toString().padStart(2, "0") +
        ":" +
        d.getSeconds().toString().padStart(2, "0")
    );
}

function addTodo() {
    const todo = {
        id: randomIDGenerate(),
        task: todoInput.value,
        isDone: false,
        createDate: formatDateTime(),
        endDate: "",
    };
    storageIndex += 1;
    console.log(storageIndex);
    todoObj[storageIndex] = todo;
    window.localStorage.setItem(storageIndex, JSON.stringify(todo));
    render();
    todoInput.value = "";
    btnAdd.disabled = true;
}

function render() {
    // console.log("현재모드:", mode);
    // console.log("현재객체", todoObj);
    let modeObj = {};
    if (mode === "modeDone") {
        for (const key in todoObj) {
            if (todoObj[key].isDone) {
                modeObj[key] = todoObj[key];
            }
        }
    } else if (mode === "modeOngoing") {
        for (const key in todoObj) {
            if (!todoObj[key].isDone) {
                modeObj[key] = todoObj[key];
            }
        }
    } else {
        modeObj = todoObj;
    }
    // console.log("편집된객체", modeObj);

    let resultHTML = "";
    for (const key in modeObj) {
        resultHTML += `
        <li>
                    <div class="text-dodo ${
                        modeObj[key].isDone ? "text-done" : ""
                    }">
                        <span class="text-task">${modeObj[key].task}</span>
                        <span class="text-date">(생성일: ${
                            modeObj[key].createDate
                        } ${
            modeObj[key].isDone ? `/ 완료일: ${modeObj[key].endDate}` : ""
        })</span>
                    </div>
                    <div>
                        <button class="btn btn-primary" onclick="toggleDone('${key}')">
                        ${
                            modeObj[key].isDone
                                ? "<i class='fa-solid fa-rotate-right'></i>"
                                : "<i class='fa-solid fa-check'></i>"
                        }</button>
                        <button class="btn btn-secondary" onclick="deleteTodo('${key}')"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </li>
        `;
    }
    todoList.innerHTML = resultHTML;
}

function toggleDone(getKey) {
    todoObj[getKey].isDone = !todoObj[getKey].isDone;
    // console.log("토글된객체", todoObj[getKey]);
    todoObj[getKey].endDate = formatDateTime();
    const getTodo = JSON.parse(window.localStorage.getItem(getKey));
    getTodo.isDone = todoObj[getKey].isDone;
    getTodo.endDate = todoObj[getKey].endDate;
    window.localStorage.setItem(getKey, JSON.stringify(getTodo));
    render();
}

// 할일 삭제
function deleteTodo(getKey) {
    // console.log("기존객체", todoObj);
    delete todoObj[getKey];
    // console.log("삭제된객체", todoObj);
    window.localStorage.removeItem(getKey);
    render();
}

// 탭 클릭 이벤트
const tabs = document.querySelectorAll(".task-tabs button");
const bar = document.querySelector("#underline");
tabs.forEach((button) => {
    button.addEventListener("click", function (e) {
        modeChange(e);
    });
});

function modeChange(event) {
    bar.style.width = event.target.offsetWidth + "px";
    bar.style.left = event.target.offsetLeft + "px";

    // console.log("클릭된 mode:", event.target.id);
    if (event.target.id === "modeOngoing") {
        mode = "modeOngoing";
    } else if (event.target.id === "modeDone") {
        mode = "modeDone";
    } else {
        mode = "modeAll";
    }

    render();
}

// 1. 첫 로딩 시, 로컬스토리지에 값을 가져와 그려줌
for (const key in window.localStorage) {
    // 현재 키가 로컬스토리지의 객체의 고유속성인지 확인
    if (window.localStorage.hasOwnProperty(key)) {
        console.log("key확인", key, typeof key);
        const valueString = window.localStorage.getItem(key);
        // 가져온 값은 string
        // console.log("valueString", valueString, typeof valueString);
        // 가져온 값이 JSON문자열인지 확인
        if (valueString && valueString[0] === "{") {
            // json객체로 변환
            const objParse = JSON.parse(valueString);
            // console.log("objParse", objParse);
            //할일객체에 추가
            todoObj[key] = objParse;
            storageIndexArr.push(key);
        }
        // console.log("투두객체:", todoObj);
    }
}
// 초기에 아무것도 없을때는 storageIndex를 맨위에서 선언한 대로 0으로 사용함
// 로컬스토리지에 내용이 있을 때는 키값을 정렬시키고 가장 마지막의 키값의 값을 넘버로 변환후 storageIndex에 할당
// 로컬스토리지에 내용이 없을때는 아래 if문을 거치는 않는다면, strogeIndex가 NaN가 된다.
if (storageIndexArr.length > 0) {
    storageIndexArr.sort(); // 숫자정렬 storageIndexArr.sort((a, b) => a - b)
    console.log(storageIndexArr);
    storageIndex = Number(storageIndexArr[storageIndexArr.length - 1]);
}
console.log(storageIndex);
render();
