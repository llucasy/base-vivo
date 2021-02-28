var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27', '28', '31', '32', '33', '34', '35', '37', '38', '41', '42', '43', '44', '45', '46', '47', '48', '49', '51', '53', '54', '55', '61', '62', '63', '64', '65', '66', '67', '68', '69', '71', '73', '74', '75', '77', '79', '81', '82', '83', '84', '85', '86', '87', '88', '89', '91', '92', '93', '94', '95', '96', '97', '98', '99'],
        datasets: [{
            label: 'Estoque_CT',
            data: estoque_data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2
        },
        {
            label: 'Pulmão',
            data: pulmao_data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2
        }]
    },
    
    options: {
        scales: {
            xAxes: [{ticks: {beginAtZero: true, autoSkip: false, maxTicksLimit: 10} }]
        },
        title: {
            display: false,
            text: 'Linhas por DDD - Local'
        },
        animation: {
            duration: 3000
        },
        aspectRatio: 1.5
    }
});

ctx.onclick = (evt) => {
    let activePoints = myChart.getElementAtEvent(evt);
    // => activePoints is an array of points on the canvas that are at the same position as the click event.

    if (activePoints.length === 1) {
        const DDD = activePoints[0]['_model']['label']
        if (activePoints[0]['_datasetIndex'] === 0) {
            window.open(`/?pesqCamp=${DDD}&local=Estoque_CT&razao=&plano=&status=&grupo=&extra=&limit=30`, '_blank')
        } else {
            window.open(`/?pesqCamp=${DDD}&local=&razao=&plano=&status=&grupo=Pulmão&extra=&limit=30`, '_blank')
        }
    }

};