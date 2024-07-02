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

// 변수 선언
let todoArr = [];
let mode = "modeAll";

// 할일 추가
btnAdd.disabled = true;
todoInput.addEventListener("keyup", function () {
    todoInput.value == ""
        ? (btnAdd.disabled = true)
        : (btnAdd.disabled = false);
});
todoInput.addEventListener("keydown", function (e) {
    e.key === "Enter" && todoInput.value !== "" && addTodo();
});
btnAdd.addEventListener("click", addTodo);

function addTodo() {
    const todo = {
        id: randomIDGenerate(),
        task: todoInput.value,
        isDone: false,
    };
    todoArr.push(todo);
    console.log(todoArr);
    render(todoArr);
    todoInput.value = "";
    btnAdd.disabled = true;
}

function render(arr) {
    let resultHTML = "";
    for (let i = 0; i < arr.length; i++) {
        resultHTML += `
        <li>
                    <div class="${arr[i].isDone ? "text-done" : ""}">${
            arr[i].task
        }</div>
                    <div>
                        <button class="btn btn-primary" onclick="toggleDone('${
                            arr[i].id
                        }')">${
            arr[i].isDone
                ? "<i class='fa-solid fa-rotate-right'></i>"
                : "<i class='fa-solid fa-check'></i>"
        }</button>
                        <button class="btn btn-secondary" onclick="deleteTodo('${
                            arr[i].id
                        }')"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </li>
        `;
    }
    todoList.innerHTML = resultHTML;
}

function toggleDone(id) {
    console.log("선택된 id", id);
    let selectMode = "";
    for (let i = 0; i < todoArr.length; i++) {
        if (todoArr[i].id == id) {
            console.log("상태", todoArr[i].isDone);
            todoArr[i].isDone = !todoArr[i].isDone;
            selectMode = todoArr[i].isDone ? "modeDone" : "modeOngoing";
            break; // 찾으면 더이상 for를 돌지 않도록
        }
    }
    // console.log(todoArr);
    modeChange(selectMode);
}

// 랜덤id 만들기
function randomIDGenerate() {
    return new Date().getTime();
}

// 할일 삭제
function deleteTodo(id) {
    // console.log(id);
    todoArr.map((item, index) => {
        if (item.id == id) {
            // console.log(item);
            todoArr.splice(index, 1);
        }
    });
    console.log(todoArr);
    modeChange("modeAll");
}

// innerHTML: 태그 안에있는 HTML 전체 내용을 들고옴
// textContent: 해상 노드가 가지고 있는 텍스트 값을 그대로 가져옴.

// 선택된 탭 표시하기
const tabs = document.querySelectorAll(".task-tabs button");
const bar = document.querySelector("#underline");
tabs.forEach((button) => {
    button.addEventListener("click", function (e) {
        // console.log(e.target.textContent);
        modeChange(e.target.id);
    });
});

function modeChange(mode) {
    // console.log("이벤트:", event);
    // if (event) {
    //     bar.style.width = event.target.offsetWidth + "px";
    //     bar.style.left = event.target.offsetLeft + "px";
    // }

    console.log("mode:", mode);
    let modeArr = [];
    if (mode === "modeOngoing") {
        bar.style.width = "71px";
        bar.style.left = "66px";

        for (let i = 0; i < todoArr.length; i++) {
            if (!todoArr[i].isDone) {
                modeArr.push(todoArr[i]);
            }
        }
    } else if (mode === "modeDone") {
        bar.style.width = "56px";
        bar.style.left = "147px";
        for (let i = 0; i < todoArr.length; i++) {
            if (todoArr[i].isDone) {
                modeArr.push(todoArr[i]);
            }
        }
    } else {
        bar.style.width = "56px";
        bar.style.left = "0";
        modeArr = todoArr;
    }

    render(modeArr);
}
