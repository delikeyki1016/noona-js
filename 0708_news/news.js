// setTimeout(()=>console.log("1"), 5000) 를 실행한다면
// 자바스크립트는 알바생이 한명 ==> 싱글 스레드
// 브라우저 알바생 : Web API(Ajax, fetch, setTimeout, eventhandler) <= 자바스크립트의 비동기처리는 여기로 보냄
// setTimeout의 5초를 기다린후
// Task Queue로 보냄 (FIFO)
// Call Stack이 비워지면 Task Queue가 console.log("1")를 Stack으로 보냄

// pending : 보류중

// pageSize : 기사갯수
// page : 기사갯수가 10개면 10개의 기사가 있는 1page

// 누나 API : https://beautiful-torte-d702c9.netlify.app/top-headlines?country=kr&apiKey=
// https://newsapi.org/v2/top-headlines?country=kr&apiKey=70a9dc1efaba49299c95e70ba34ae4ab&pageSize=1
const API_KEY = `70a9dc1efaba49299c95e70ba34ae4ab`;

let newsList = [];
let category = "";
const defaultImage =
    "https://static-00.iconduck.com/assets.00/no-image-icon-2048x2048-2t5cx953.png";

const getNews = async () => {
    const url = new URL(
        `${
            category && category !== ""
                ? `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`
                : `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
        } `
    );
    console.log("url:", url);

    const response = await fetch(url);
    console.log("rsponse:", response);
    const data = await response.json(); // json파일형태로 data변수에 선언
    console.log("data:", data);
    newsList = [];
    console.log("다시배열내용", newsList);
    if (Array.isArray(data.sources)) {
        newsList = data.sources;
    } else if (data.articles) {
        newsList = data.articles;
    }
    console.log("newsList:", newsList);
    render();
};

const render = () => {
    let newsHTML = ``;

    newsHTML = newsList
        .map((item) => {
            return `<div class="row p-2 border-bottom">
                <div class="col-lg-4">
                ${
                    item.urlToImage && item.urlToImage
                        ? `<img src=${item.urlToImage} alt="" class="photo-size" onerror="this.onerror=null;this.src='${defaultImage}';" />`
                        : `<img src=${defaultImage} alt="" class="photo-size" />`
                }
                </div>
                <div class="col-lg-8 d-flex flex-column">
                    <h2><a href=${item.url} target="_new">${item.title}</a></h2>
                    <p>${
                        item.description === null || item.description === ""
                            ? "내용없음"
                            : truncateText(item.description)
                    }</p>
                    <div class="mt-auto">${
                        item.author === null ? "no source" : item.author
                    } | 
                    ${moment(item.publishedAt).startOf("hour").fromNow()}</div>
                </div>
            </div>`;
        })
        .join("");
    // console.log("newsHTML", newsHTML); // newsList는 배열이기 때문에 ','까지 출력이 된다. join()을 사용하여 배열을 string타입으로 변환하여 ''을 넣어 ,를 삭제하자
    document.getElementById("newsBoard").innerHTML = newsHTML;
};

getNews();

// UI
const searchForm = document.getElementById("searchBox");
const showInputBox = () => {
    searchForm.style.display === "none"
        ? (searchForm.style.display = "block")
        : (searchForm.style.display = "none");
};

const navBar = document.getElementById("navBar");
const showMenu = () => {
    navBar.style.display = "block";
    document.querySelector("html").style.overflow = "hidden";
};

const navBarClose = () => {
    navBar.style.display = "none";
    document.querySelector("html").style.overflow = "auto";
};

// 문자열 자르기 200자까지 되는 것이 별로 없어보여서 100자로 자름
function truncateText(text) {
    return text.length > 101 ? text.substring(0, 100) + "..." : text;
}

// 카테고리별 뉴스 검색
const categoryAll = document.querySelectorAll(".list-category > li > a"); //노드리스트임
console.log("카테고리", categoryAll);
const categoryArr = Array.from(categoryAll); // map함수를 사용하기 위해 배열로 변환 ==> forEach로 사용할것이므로 필요없음
console.log("카테고리 배열", categoryArr);

// 모바일에서 카테고리를 클릭하면 해당 레이어가 닫히게 처리
let maxScreenWidth = 576; //체크할 최대 가로 사이즈
function isBrowserWidthBelow(maxWidth) {
    var currentWidth = window.innerWidth; //현재 브라우저의 가로 사이즈 가져오기
    return currentWidth <= maxWidth; //기준사이즈보다 작거나같으면 true 반환
}

categoryAll.forEach((cate) => {
    cate.addEventListener("click", (event) => {
        category = event.target.textContent;
        console.log("변경된 카테고리", category);
        if (isBrowserWidthBelow(maxScreenWidth)) {
            // 모바일에서는 카테고리 클릭 시 카테고리영역 닫기
            navBar.style.display = "none";
            document.querySelector("html").style.overflow = "auto";
        }
        getNews();
    });
});

// 로고를 누르면 첫로딩때 처럼 topheadline으로 랜더링되기
const btnHome = document.getElementById("btn-home");
btnHome.addEventListener("click", function () {
    category = "";
    getNews();
});
