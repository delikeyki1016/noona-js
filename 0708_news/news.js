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
// const API_KEY = `70a9dc1efaba49299c95e70ba34ae4ab`;
const noonaURL = `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`;

let newsList = [];
let category = "";
const defaultImage =
    "https://static-00.iconduck.com/assets.00/no-image-icon-2048x2048-2t5cx953.png";

let totalArticles = 0; // 전체 기사수
let pageSize = 10; // 한페이지에 보여줄 페이지수
let totalPage = 0; // 총 페이지 수 : Math.ceil(totalArticles/pageSize)
let pageNum = 1; // 현재 페이지넘버
let pagePerGroup = 5; // 한페이지에 보여줄 페이지그룹 수
let pageGroup = 0; //총 페이지 그룹 : Math.ceil(totalPage / pagePerGroup)
let currentPageGroup = 1; // 현재 페이지 그룹 : Math.ceil(pageNum / pagePerGroup)

// 뉴스 API 호출
const getNews = async (getPageNum) => {
    console.log("넘겨받은페이지번호", getPageNum);
    pageNum = getPageNum;
    console.log("현재페이지넘버1", pageNum);
    let makeUrl = ``;
    if (category && category !== "") {
        makeUrl = `${noonaURL}?category=${category}&pageSize=${
            pageNum * pageSize
        }`;
    } else if (keyword && keyword !== "") {
        makeUrl = `${noonaURL}?q=${keyword}&pageSize=${pageNum * pageSize}`;
    } else {
        makeUrl = `${noonaURL}?country=kr?&pageSize=${pageNum * pageSize}`;
    }
    const url = new URL(makeUrl);
    console.log("url", url);
    try {
        // url뒤에 쿼리들을 아래처럼 붙여줄 수 있다.
        // url.searchParams.set("page", page); // &page=page
        // url.searchParams.set("pageSize", pageSize); //&pageSize=pageSize
        const response = await fetch(url);
        const data = await response.json(); // json파일형태로 data변수에 선언
        console.log("data", data);
        if (response.status === 200) {
            newsList = data.articles;
            newsList.splice(0, (pageNum - 1) * pageSize);
            console.log("잘라낸리스트", newsList);
            if (newsList.length === 0) {
                // document.getElementById("newsBoard").innerHTML =
                //     "<div class='text-center p-3'>뉴스 결과 없음</div>";
                throw new Error("검색결과가 없습니다."); // 여기로 들어오면 catch로 넘어감
            }
            totalArticles = data.totalResults;
            totalPage = Math.ceil(totalArticles / pageSize);
            pageGroup = Math.ceil(totalPage / pagePerGroup);
            console.log(totalArticles, totalPage, pageGroup);
            render();
            pageRender();
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        errorRender(error.message);
    }
};

const errorRender = (errMsg) => {
    const errorHTML = `<div class="alert alert-danger text-center" role="alert">${errMsg}</div>`;
    document.getElementById("newsBoard").innerHTML = errorHTML;
};

// 뉴스 그리기
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

// pagination
const pageRender = () => {
    // console.log("현재페이지넘버2", pageNum);
    let pageItems = "";
    let endPage =
        pagePerGroup > totalPage ? totalPage : currentPageGroup * pagePerGroup;
    for (
        let i = currentPageGroup * pagePerGroup - (pagePerGroup - 1);
        i <= endPage;
        i++
    ) {
        pageItems += `<li class="page-item"><a class="page-link ${
            pageNum === i ? "active" : ""
        }" href="#N" onclick="getNews(${i})">${i}</a></li>`;
    }
    const pageHTML = `
    ${
        currentPageGroup > 1
            ? `<li class="page-item">
                        <a class="page-link" href="#N" aria-label="Previous page group" onclick="minusGroup()">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>`
            : ""
    }
    ${
        pageNum > currentPageGroup * pagePerGroup - (pagePerGroup - 1)
            ? `<li class="page-item">
                        <a class="page-link" href="#N" aria-label="Previous" onclick="getNews(${
                            pageNum - 1
                        })">
                            <span aria-hidden="true">&lt;</span>
                        </a>
                    </li>`
            : ""
    }
                    
                    ${pageItems}
                    ${
                        pageNum < currentPageGroup * pagePerGroup &&
                        pageNum < totalPage
                            ? `<li class="page-item">
                        <a class="page-link" href="#N" aria-label="Next" onclick="getNews(${
                            pageNum + 1
                        })">
                            <span aria-hidden="true">&gt;</span>
                        </a>
                    </li>`
                            : ""
                    }
                    ${
                        currentPageGroup === pageGroup
                            ? ""
                            : `<li class="page-item">
                        <a class="page-link" href="#N" aria-label="Next page Group" onclick="plusGroup()
                        ">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>`
                    }
                    
    `;
    document.querySelector(".pagination").innerHTML = pageHTML;
};

const plusGroup = () => {
    currentPageGroup++;
    pageNum = currentPageGroup * pagePerGroup - (pagePerGroup - 1);
    getNews(pageNum);
};

const minusGroup = () => {
    currentPageGroup--;
    pageNum = currentPageGroup * pagePerGroup - (pagePerGroup - 1);
    getNews(pageNum);
};

// 키워드 검색
let keyword = "";
const iptKeyword = document.getElementById("inputKeyword");
const btnSearch = document.getElementById("buttonSearch");
btnSearch.addEventListener("click", () => {
    category = "";
    if (iptKeyword.value === "") {
        alert("키워드를 입력하세요!");
    } else {
        keyword = iptKeyword.value;
        getNews(1);
    }
});
btnSearch.addEventListener("keydown", function (e) {
    category = "";
    e.preventDefault();
    if (e.key === "Enter") {
        if (iptKeyword.value === "") {
            alert("키워드를 입력하세요!");
        } else {
            keyword = iptKeyword.value;
            getNews(1);
        }
    }
});
iptKeyword.addEventListener("focus", () => {
    iptKeyword.value = "";
});
iptKeyword.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
    }
});

// 카테고리별 뉴스 검색
const categoryAll = document.querySelectorAll(".list-category > li > a"); //노드리스트임
// const categoryArr = Array.from(categoryAll); // map함수를 사용하기 위해 배열로 변환 ==> forEach로 사용할것이므로 필요없음
// console.log("카테고리 배열", categoryArr);

categoryAll.forEach((cate) => {
    cate.addEventListener("click", (event) => {
        keyword = "";
        category = event.target.textContent;
        console.log("변경된 카테고리", category);
        if (isBrowserWidthBelow(maxScreenWidth)) {
            // 모바일에서는 카테고리 클릭 시 카테고리영역 닫기
            navBar.style.display = "none";
            document.querySelector("html").style.overflow = "auto";
        }
        getNews(1);
    });
});

// 로고를 누르면 첫로딩때 처럼 topheadline으로 랜더링되기
const btnHome = document.getElementById("btn-home");
btnHome.addEventListener("click", function () {
    category = "";
    keyword = "";
    getNews(1);
});

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

// 모바일에서 카테고리를 클릭하면 해당 레이어가 닫히게 처리
let maxScreenWidth = 576; //체크할 최대 가로 사이즈
function isBrowserWidthBelow(maxWidth) {
    var currentWidth = window.innerWidth; //현재 브라우저의 가로 사이즈 가져오기
    return currentWidth <= maxWidth; //기준사이즈보다 작거나같으면 true 반환
}

// 첫 로딩 시 그리기
getNews(1);
