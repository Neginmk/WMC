for (let num = 1; num <= 300; num++) {
    let output = "";

    if (num % 12 === 0) {
        output += "BoomCrackZapPop";
    } else if (num % 8 === 0) {
        output += "BoomZap";
    } else if (num % 6 === 0) {
        output += "Crack";
    } else if (num % 4 === 0) {
        output += "Boom";
    }

    console.log(output || num);
}
