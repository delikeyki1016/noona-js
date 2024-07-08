// setTimeout(()=>console.log("1"), 5000) 를 실행한다면
// 자바스크립트는 알바생이 한명 ==> 싱글 스레드
// 브라우저 알바생 : Web API(Ajax, fetch, setTimeout, eventhandler) <= 자바스크립트의 비동기처리는 여기로 보냄
// setTimeout의 5초를 기다린후
// Task Queue로 보냄 (FIFO)
// Call Stack이 비워지면 Task Queue가 console.log("1")를 Stack으로 보냄

// pending : 보류중

// pageSize : 기사갯수
// page : 기사갯수가 10개면 10개의 기사가 있는 1page

// https://newsapi.org/v2/top-headlines?country=kr&apiKey=70a9dc1efaba49299c95e70ba34ae4ab&pageSize=1
const API_KEY = `70a9dc1efaba49299c95e70ba34ae4ab`;

let news = [];

const getNews = async () => {
    const url = new URL(
        `https://beautiful-torte-d702c9.netlify.app/v2/top-headlines?country=kr&apiKey=${API_KEY}`
    );
    console.log("url:", url);

    const response = await fetch(url);
    console.log("rsponse:", response);
    const data = await response.json(); // json파일형태로 data변수에 선언
    console.log("data:", data);
    news = data.articles;
    console.log("news:", news);
};

getNews();
