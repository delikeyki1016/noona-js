// 1. 유저가 할일을 입력한다.
// 2. ADD 버튼을 클릭하면 할일이 추가된다.
// 3. delete버튼을 클릭하면 할일이 삭제된다.
// 4. check버튼을 클릭하면 할일이 끝나면서 밑줄이 간다.
// 5. 진행중, 완료 탭을 누르면 언더바가 이동한다.
// 6. 진행중은 진행중인 리스트만, 완료는 완료된 리스트만 보여준다.
// 7. 모두 탭을 누르면 모든 리스트가 보여진다.

// 요소가져오기
const todoInput = document.getElementById("todoInput");
const btnAdd = document.getElementById("addTodo");
const todoList = document.querySelector(".task-list");

// 변수 선언
let todoArr = [];

// 할일 추가
btnAdd.addEventListener("click", addTodo);

function addTodo() {
    const todo = todoInput.value;
    todoArr.push(todo);
    console.log(todoArr);
    render();
}

function render() {
    let resultHTML = "";
    for (let i = 0; i < todoArr.length; i++) {
        resultHTML += `
        <li>
                    <div>${todoArr[i]}</div>
                    <div>
                        <button class="btn btn-primary">done</button>
                        <button class="btn btn-secondary">delete</button>
                    </div>
                </li>
        `;
    }
    todoList.innerHTML = resultHTML;
}
