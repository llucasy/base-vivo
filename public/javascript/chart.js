var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: estoque_labels,
        datasets: [{
            label: 'Estoque_CT',
            data: estoque_data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{ticks: {beginAtZero: true, autoSkip: true, maxTicksLimit: 70} }]
        },
        title: {
            display: true,
            text: 'Linhas por DDD - Local'
        },
        animation: {
            duration: 3000
        },
        aspectRatio: 1.5
    }
});