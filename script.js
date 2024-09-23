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

function selectEquation(eqNumber) {
    let a,
