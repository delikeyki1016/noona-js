// forEach는 리턴값이 없다.
// map함수에는 반드시 array 리턴값이 있다.
// filter는 조건이 true인 값을 모두 찾아 array 리턴을 해줌, 조건은 return구문에 넣어줌
// some은 return에 조건을 넣고, 조건에 true에 해당하는 아이템이 있으면 true를 반환, 없으면 false
// every는 return의 조건에 모두 만족하면 true 반환
// find는 return 조건에 맞는 아이템을 찾고 첫번째 찾은 아이템을 string으로 반환
// findIndex는 find에서 index를 찾아줌

let names = [
    "Steven Paul Jobs",
    "Bill Gates",
    "Mark Elliot Zuckerberg",
    "Elon Musk",
    "Jeff Bezos",
    "Warren Edward Buffett",
    "Larry Page",
    "Larry Ellison",
    "Tim Cook",
    "Lloyd Blankfein",
];

// map 문제
// 1. 모든 이름을 대문자로 바꾸어서 출력하시오.

let upper = names.map((name) => name.toUpperCase());
console.log(upper);

// 2. 성을제외한 이름만 출력하시오. (예-[“Steven”,“Bill”,“Mark”,“Elon”…])
let nameOnly = names.map((name) => name.split(" ")[0]);
console.log(nameOnly);

// 3. 이름의 이니셜만 출력하시오. (예-[“SPU”,“BG”,“MEZ”,“EM”…])
let nameInitial = names.map((name) => {
    let first = name.split(" ").map((item) => {
        return item.charAt(0);
    });
    return first.join("");
});
console.log(nameInitial);

// filter 문제
// 1.이름에 a를 포함한 사람들을 출력하시오.
let aInclude = names.filter((name) => name.includes("a"));
console.log(aInclude);
// 2. 이름에 같은 글자가 연속해서 들어간 사람을 출력하시오. (예-tt,ff,ll 이런 글자들)
let sameLetter = names.filter((name) => {
    let split = name.split("");
    // console.log("split:", split);
    let yesno = split.some((letter, index) => letter === split[index + 1]);
    // console.log(yesno);
    return yesno;
    // return split.some((letter, index) => letter === split[index + 1]); 동일
});
console.log("sameLetter:", sameLetter);

// some 문제
// 전체 이름의 길이가 20자 이상인 사람이 있는가?
let tweentyMore = names.some((name) => {
    return name.length > 21;
});
console.log(tweentyMore);
// 성을 제외한 이름에 p를 포함한 사람이 있는가?(대소문자 상관 no)
let pInclude = names.some((name) => {
    let fisrtSecondName = name.split(" ");
    fisrtSecondName.pop();
    return fisrtSecondName.some((item) => item.toUpperCase().includes("P"));
});
console.log(pInclude);

// every 문제
// 모두의 전체 이름의 길이가 20자 이상인가?
let allName = names.every((name) => name.length > 21); // 화살표함수를 한줄로 쓰면 return 글자 생략가능
console.log("allName", allName);

// 모두의 이름에 a 가 포함되어 있는가?
let allNameA = names.every((name) => {
    return name.includes("a");
});
console.log("allNameA:", allNameA);
// find 문제
// 전체 이름의 길이가 20자 이상인 사람을 찾으시오.
let find20 = names.find((name) => {
    return name.length > 21; // 줄바꿈이 일어나고{}을 만들면 return 시에 return을 생략하면 안됨
});
console.log("find20:", find20);

// 미들네임이 포함되어있는 사람을 찾으시오.(예-Steven Paul Jobs)
let findMiddle = names.find((name) => name.split(" ").length >= 3);
console.log(findMiddle);

// findIndex 문제
// 전체 이름의 길이가 20자 이상인 사람의 인덱스 번호를 찾으시오.
let findIdx = names.findIndex((name) => {
    name.length >= 20;
});
console.log(findIdx); // -1 이 나오고
let findIdx2 = names.findIndex((name) => {
    return name.length >= 20;
});
console.log(findIdx2); // 2가 나옵니다. return 유무의 차이점

// 미들네임이 포함되어있는 사람의 인덱스 번호를 찾으시오.
let findMiddle2 = names.findIndex((name) => name.split(" ").length >= 3);
console.log(findMiddle2);
