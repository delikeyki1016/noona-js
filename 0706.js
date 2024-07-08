let name = "noona store";
let fruits = ["banana", "apple", "mango"];
let address = {
    country: "Korea",
    city: "Seoul",
};

function findStore(obj) {
    let {
        name,
        address: { city },
    } = obj;
    console.log(name, city);
    return name === "noona store" && city === "Seoul";
}

console.log(findStore({ name, fruits, address })); // true가 나오게 수정

function getNumber() {
    let array = [1, 2, 3, 4, 5, 6];
    let [first, , third, forth] = array;
    console.log(first);
    return { first, third, forth };
}

console.log(getNumber()); // 결과값 { first: 1, third: 3, forth: 4 }

function getCalendar(first, ...rest) {
    return (
        first === "January" &&
        rest[0] === "Febuary" &&
        rest[1] === "March" &&
        rest[2] === undefined
    );
}
console.log(getCalendar("January", "Febuary", "March"));

function getMinimum() {
    let a = [45, 23, 78];
    let b = [54, 11, 9];
    return Math.min(...a, ...b);
}
console.log(getMinimum());
