document.getElementById('recurrence-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const t0 = parseFloat(document.getElementById('t0').value);
    const t1 = parseFloat(document.getElementById('t1').value);
    const n = parseInt(document.getElementById('n').value);

    function solveRecurrence(a, b, t0, t1, n, equationType) {
        let results = [t0, t1];
        let tn = 0;

        if (equationType === 'fibonacci') {
            for (let i = 2; i <= n; i++) {
                tn = results[i-1] + results[i-2];
                results.push(tn);
            }
        } else if (equationType === 'linear') {
            for (let i = 2; i <= n; i++) {
                tn = a * results[i-1] + b * results[i-2];
                results.push(tn);
            }
        } else if (equationType === 'non-homogeneous') {
            for (let i = 2; i <= n; i++) {
                tn = a * results[i-1] + b * results[i-2] + i; // Exemplo com f(n) = n
                results.push(tn);
            }
        }
        return results;
    }

    const equationType = document.getElementById('recurrence-form').dataset.equationType || 'linear';
    const recurrenceValues = solveRecurrence(a, b, t0, t1, n, equationType);
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
    let a, b, t0, t1, n, equationType;

    switch (eqNumber) {
        case 1:
            // Fibonacci: T(n) = T(n-1) + T(n-2)
            equationType = 'fibonacci';
            a = 1;
            b = 1;
            t0 = 0;
            t1 = 1;
            n = 10;
            break;
        case 2:
            // Equação de segunda ordem linear: T(n) = aT(n-1) + bT(n-2)
            equationType = 'linear';
            a = 2;
            b = 3;
            t0 = 1;
            t1 = 2;
            n = 10;
            break;
        case 3:
            // Equação homogênea: T(n) = aT(n-1) + bT(n-2)
            equationType = 'linear';
            a = 3;
            b = 1;
            t0 = 1;
            t1 = 1;
            n = 10;
            break;
        case 4:
            // Equação não homogênea: T(n) = aT(n-1) + bT(n-2) + f(n)
            equationType = 'non-homogeneous';
            a = 1;
            b = 2;
            t0 = 0;
            t1 = 1;
            n = 10;
            break;
    }

    // Preencher os valores nos campos do formulário
    document.getElementById('a').value = a;
    document.getElementById('b').value = b;
    document.getElementById('t0').value = t0;
    document.getElementById('t1').value = t1;
    document.getElementById('n').value = n;

    // Adicionar o tipo de equação no dataset
    document.getElementById('recurrence-form').dataset.equationType = equationType;
}
