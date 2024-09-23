document.getElementById('recurrence-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const t0 = parseFloat(document.getElementById('t0').value);
    const t1 = parseFloat(document.getElementById('t1').value) || 0; 
    const n = parseInt(document.getElementById('n').value);

    function solveRecurrence(a, b, t0, t1, n, equationType) {
        let results = [t0];
        let tn = t0;

        if (equationType === 'fibonacci') {
            results.push(t1);
            for (let i = 2; i <= n; i++) {
                tn = results[i-1] + results[i-2];
                results.push(tn);
            }
        } else {
            for (let i = 1; i <= n; i++) {
                tn = a * tn + b;
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
            b = 0;  // Não utilizado no Fibonacci
            t0 = 0;
            t1 = 1;
            n = 10;
            break;
        case 2:
            // Torre de Hanói: T(n) = 2T(n-1) + 1
            equationType = 'linear';
            a = 2;
            b = 1;
            t0 = 1;
            n = 10;
            break;
        case 3:
            // Progressão Aritmética: T(n) = T(n-1) + c
            equationType = 'linear';
            a = 1;
            b = 3; // c
            t0 = 2;
            n = 10;
            break;
        case 4:
            // Progressão Geométrica: T(n) = aT(n-1)
            equationType = 'linear';
            a = 2;
            b = 0; // Sem constante aditiva
            t0 = 1;
            n = 10;
            break;
        case 5:
            // Substituição Linear: T(n) = aT(n-1) + b
            equationType = 'linear';
            a = 3;
            b = 2;
            t0 = 4;
            n = 10;
            break;
        case 6:
            // Expansão Binária: T(n) = T(n/2) + O(1)
            equationType = 'linear'; // Aproximação, assume O(1) = 1
            a = 0.5;
            b = 1;
            t0 = 1;
            n = 10;
            break;
    }

    // Preencher os valores nos campos do formulário
    document.getElementById('a').value = a;
    document.getElementById('b').value = b;
    document.getElementById('t0').value = t0;
    if (t1 !== undefined) {
        document.getElementById('t1').value = t1;
        document.getElementById('t1').style.display = 'block';
    } else {
        document.getElementById('t1').style.display = 'none';
    }
    document.getElementById('n').value = n;

    // Adicionar o tipo de equação no dataset
    document.getElementById('recurrence-form').dataset.equationType = equationType;
}
