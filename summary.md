화살표함수는 this를 생성할 수 없다. 화살표함수내에서 this는 window이다.
function함수에는 this(function을 부른 객체)를 사용할 수 있다.

forEach는 리턴값이 없다.
map함수에는 반드시 array 리턴값이 있다.
filter는 조건이 true인 값을 모두 찾아 array 리턴을 해줌, 조건은 return구문에 넣어줌
some은 return에 조건을 넣고, 조건에 true에 해당하는 아이템이 있으면 true를 반환, 없으면 false
every는 return의 조건에 모두 만족하면 true 반환
find는 return 조건에 맞는 아이템을 찾고 첫번째 찾은 아이템을 string으로 반환
findIndex는 find에서 index를 찾아줌

자바스크립트의 비동기실행
setTimeout(()=>console.log("1"), 5000) 를 실행한다면
자바스크립트는 알바생이 한명 ==> 싱글 스레드
브라우저 알바생 : Web API(Ajax, fetch, setTimeout, eventhandler) <= 자바스크립트의 비동기처리는 여기로 보냄
setTimeout의 5초를 기다린후
Task Queue로 보냄 (FIFO)
Call Stack이 비워지면 Task Queue가 console.log("1")를 Stack으로 보냄

pending : 보류중
