for (let i = 1; i <= 33; i++) {
    const iString = i.toString();
    let result = "";
    for (let j = 0; j < iString.length; j++) {
        if (iString[j] == "3" || iString[j] == "6" || iString[j] == "9") {
            result = result + "짝";
        }
    }
    console.log(result.length > 0 ? result : iString);
}
