document.getElementById('recurrence-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Coletando os valores dos inputs
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const t0 = parseFloat(document.getElementById('t0').value);
    const n = parseInt(document.getElementById('n').value);

    // Função para calcular T(n) baseado na equação de recorrência
    function solveRecurrence(a, b, t0, n) {
        if (n === 0) return t0;

        let tn = t0;
        for (let i = 1; i <= n; i++) {
            tn = a * tn + b;
        }
        return tn;
    }

    // Calculando T(n)
    const result = solveRecurrence(a, b, t0, n);

    // Exibindo o resultado
    document.getElementById('result').innerHTML = `T(${n}) = ${result}`;
});
