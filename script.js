document.getElementById('recurrence-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const t0 = parseFloat(document.getElementById('t0').value);
    const n = parseInt(document.getElementById('n').value);

    function solveRecurrence(a, b, t0, n) {
        let results = [t0];
        let tn = t0;
        for (let i = 1; i <= n; i++) {
            tn = a * tn + b;
            results.push(tn);
        }
        return results;
    }

    const recurrenceValues = solveRecurrence(a, b, t0, n);
    document.getElementById('result').innerHTML = `T(${n}) = ${recurrenceValues[n]}`;

    const labels = Array.from({ length: n + 1 }, (_, i) => i);
    const data = {
        labels: labels,
        datasets: [{
            label: 'Valores de T(n)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            data: recurrenceValues,
            fill: false,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'n (Passo)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'T(n)'
                    },
                    beginAtZero: true
                }
            }
        }
    };

    const ctx = document.getElementById('recurrenceChart').getContext('2d');
    if (window.myChart) {
        window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, config);
});

// Função para preencher o formulário com valores ao clicar em uma equação
function selectEquation(eqNumber) {
    let a, b, t0, n;

    switch (eqNumber) {
        case 1:
            // T(n) = 2T(n-1) + 3
            a = 2;
            b = 3;
            t0 = 4;  // Supondo T(0) = 4
            n = 5;
            break;
        case 2:
            // T(n) = 2T(n-1) + 1 (Torre de Hanói)
            a = 2;
            b = 1;
            t0 = 0;
            n = 5;
            break;
        case 3:
            // T(n) = 3^n + T(n-1)
            a = 1;  // T(n-1) multiplicado por 1
            b = Math.pow(3, n);  // 3^n (calculado dinamicamente)
            t0 = 1;
            n = 5;
            break;
    }

    // Preencher os valores nos campos do formulário
    document.getElementById('a').value = a;
    document.getElementById('b').value = b;
    document.getElementById('t0').value = t0;
    document.getElementById('n').value = n;

    // Simular o envio do formulário para calcular o resultado
    document.getElementById('recurrence-form').dispatchEvent(new Event('submit'));
}
