function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function checkPrime() {
    let input = document.getElementById("number").value;
    let result = document.getElementById("result");

    if (input.trim() === "") {
        result.textContent = "Ungültige Eingabe!";
        result.style.color = "red";
        return;
    }

    let number = parseFloat(input);

    if (!Number.isInteger(number) || number < 0) {
        result.textContent = "Ungültig";
        result.style.color = "orange";
        return;
    }

    if (isPrime(number)) {
        result.textContent = number + " ist eine Primzahl.";
        result.style.color = "green";
    } else {
        result.textContent = number + " ist keine Primzahl.";
        result.style.color = "red";
    }
}
