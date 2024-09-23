document.getElementById('recurrence-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Coletando os valores dos inputs
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const t0 = parseFloat(document.getElementById('t0').value);
    const n = parseInt(document.getElementById('n').value);

    // Função para calcular os valores de T(n)
    function solveRecurrence(a, b, t0, n) {
        let results = [t0];  // Armazenar T(0)
        let tn = t0;
        for (let i = 1; i <= n; i++) {
            tn = a * tn + b;
            results.push(tn);  // Armazenar T(i)
        }
        return results;
    }

    // Calculando a sequência de T(n)
    const recurrenceValues = solveRecurrence(a, b, t0, n);

    // Exibindo o último resultado (T(n))
    document.getElementById('result').innerHTML = `T(${n}) = ${recurrenceValues[n]}`;

    // Atualizando o gráfico com os novos valores de T(n)
    const labels = Array.from({ length: n + 1 }, (_, i) => i);  // [0, 1, 2, ..., n]
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

    // Renderizando o gráfico no canvas
    const ctx = document.getElementById('recurrenceChart').getContext('2d');
    if (window.myChart) {
        window.myChart.destroy();  // Remover gráfico antigo se já existir
    }
    window.myChart = new Chart(ctx, config);
});
