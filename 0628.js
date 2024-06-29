// 문제1
function greet() {
    console.log("안녕 내 이름은 제시카야!");
}
greet();

//문제2
function greet2(par) {
    console.log(`안녕 내 이름은 ${par}야!`);
}
greet2("안드레");

//문제3
function greet3(par) {
    return par;
}
console.log(greet3("이동국"));

// 문제4
function meetAt(par1, par2, par3) {
    if (par1 && par2 && par3) {
        // par3만 써도 3개의 매개변수가 들어왔다는 것이므로 가능
        return `${par1}/${par2}/${par3}`;
    } else if (par1 && par2) {
        // 그렇다면 여기는 par2만 써도 되겠지
        return `${par1}년 ${par2}월`;
    } else if (par1) {
        return `${par1}년`;
    }
}
console.log(meetAt(2022));
console.log(meetAt(2032, 3));
console.log(meetAt(1987, 10, 28));

//문제5 : 가장 작은 수 찾기
const findSmallestElement = (arr) => {
    if (arr.length !== 0) {
        return Math.min.apply(null, arr);
    } else {
        return 0;
    }
};
console.log(findSmallestElement([100, 200, 3, 2, 1]));
console.log(findSmallestElement([]));

// 문제5 Math.min 사용하지 않고 풀이
const findSmallestElement2 = (arr) => {
    if (arr.length > 0) {
        let result = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (result > arr[i]) {
                result = arr[i];
            }
        }
        return result;
    } else {
        return 0;
    }
};
console.log(findSmallestElement2([100, 200, 3, 2, 1]));
console.log(findSmallestElement2([]));

// 문제6 : 거스름돈 계산
const howMuch = (money) => {
    let m50000 = Math.floor(money / 50000);
    let m10000 = Math.floor((money % 50000) / 10000);
    let m5000 = Math.floor(((money % 50000) % 10000) / 5000);
    let m1000 = Math.floor((((money % 50000) % 10000) % 5000) / 1000);
    let m500 = Math.floor(((((money % 50000) % 10000) % 5000) % 1000) / 500);
    let m100 = Math.floor(
        (((((money % 50000) % 10000) % 5000) % 1000) % 500) / 100
    );
    return `
    50000 X ${m50000}
    10000 X ${m10000}
    5000 X ${m5000}
    1000 X ${m1000}
    500 X ${m500}
    100 X ${m100}
    `;
};

console.log(howMuch(12300));

// 문제 6을 for문을 이용해서
let unit2 = [50000, 10000, 5000, 1000, 500, 100];
const calcMoney = (money) => {
    for (let i = 0; i < unit2.length; i++) {
        let count = Math.floor(money / unit2[i]);
        console.log(`${unit2[i]} X ${count}`);
        money = money - unit2[i] * count;
    }
};
calcMoney(12300);

// 문제6 누나의 풀이 이해한 후 재작성 => 와우~!! 언빌리버블!
// 분명히 이전에도 풀었을텐데 어쩜 이렇게 기억이 하나도 안날까요 ㅠㅠ
let unit = [50000, 10000, 5000, 1000, 500, 100];

const changeMoney = (money) => {
    for (let i = 0; i < unit.length; i++) {
        let count = Math.floor(money / unit[i]);
        console.log(unit[i] + " X " + count);
        money = money % unit[i];
    }
};
changeMoney(12300);
