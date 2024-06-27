let su = 5;
let isPrime = true;
if (su === 1) {
    isPrime = false;
} else {
    for (let i = 2; i < su; i++) {
        console.log(i);
        if (su % i === 0) {
            isPrime = false;
        }
    }
}
console.log(isPrime ? "소수" : "소수 아님");
