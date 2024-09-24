document.getElementById('recurrence-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);

    document.getElementById('result').innerHTML = solveRecurrence(a, b, c);

});

function solveRecurrence(a, b, c) {

    const discriminant = b * b - 4 * a * c;
    let r1, r2, result;

    if (discriminant > 0) {

        r1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        r2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        result = `<br>Raízes reais distintas:<br><br> r1 = ${r1},<br> r2 = ${r2}<br><br>`;

    } else if (discriminant === 0) {

        r1 = r2 = -b / (2 * a);
        result = `<br>Raízes reais iguais:<br><br> r1 = ${r1} <br>r2 = ${r1}<br><br>`;

    } else {

        const realPart = -b / (2 * a);
        const imaginaryPart = Math.sqrt(-discriminant) / (2 * a);
        result = `<br>Raízes complexas:<br><br> r1 = ${realPart} + ${imaginaryPart}i, <br>r2 = ${realPart} - ${imaginaryPart}i<br><br>`;

    }

    return result;
}

function selectEquation(eqNumber) {
    let a, b, c;

    switch (eqNumber) {
        case 1:
            a = 1;
            b = -5;
            c = 6;
            break;
        case 2:
            a = 1;
            b = -4;
            c = 4;
            break;
        case 3:
            a = 1;
            b = 2;
            c = 5;
            break;
    }

    // Preencher os valores nos campos do formulário
    document.getElementById('a').value = a;
    document.getElementById('b').value = b;
    document.getElementById('c').value = c;

    document.getElementById('submitButton').click()

}