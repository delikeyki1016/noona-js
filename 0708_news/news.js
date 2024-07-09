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

const getNews = async () => {
    const url = new URL(
        `https://beautiful-torte-d702c9.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`
    );
    console.log("url:", url);

    const response = await fetch(url);
    console.log("rsponse:", response);
    const data = await response.json(); // json파일형태로 data변수에 선언
    console.log("data:", data);
    newsList = data.articles;
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
                        ? `<img src=${item.urlToImage} alt="" class="photo-size"  />`
                        : `<i class="fa-regular fa-image photo-size"></i>`
                }
                </div>
                <div class="col-lg-8 d-flex flex-column">
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
                    <div class="mt-auto">${item.author} | ${
                item.publishedAt
            }</div>
                </div>
            </div>`;
        })
        .join("");
    console.log("newsHTML", newsHTML); // newsList는 배열이기 때문에 ','까지 출력이 된다. join()을 사용하여 배열을 string타입으로 변환하여 ''을 넣어 ,를 삭제하자
    document.getElementById("newsBoard").innerHTML = newsHTML;
};

getNews();
