//document.getElementById('mpayment-button').addEventListener('change', calculateMonthlyPayment, false);


google.charts.load('current', { packages: ['corechart']});

/**
 * *********************************************************
 *  Draw the chart
 * *********************************************************
**/
function drawChart(data) {
   var options = {
   chart: {
   title: 'Interest vs Principal credit paid',
   },
   width: 1600,
   height: 500,
   hAxis: {
    title: 'Years',
    viewWindow: {
    min: [7, 30, 0],
    max: [17, 30, 0]
    } },
    vAxis: {
        title: 'Interest, principal credit paid'
    } }; 
    var materialChart = new google.visualization.LineChart(document.getElementById('output-chart'));
    materialChart.draw(data, options);
}

/**
 * *********************************************************
 *  Read the rate, principal and number of monthly payments.
 *  Calculate the monthly payment. 
 * *********************************************************
**/
function calculateMonthlyPayment() {
    rate = document.getElementById("rate").value
    rate = rate / 100 / 12
    N = document.getElementById("no-mpayments").value
    principal = document.getElementById("principal").value
    principal = principal / 1.0

    c = rate * principal / (1 - Math.pow((1+rate), -N))
    tipaid = c * N - principal 
    cipaid = (principal * rate - c) * (Math.pow((1+rate), N) - 1) / rate + c * N


    array = [['Year', 'Debt', 'Interest paid']]
    array.push([0, principal, 0])
    years = N / 12
    y = 1
    while (y <= years) {
        cipy = (principal * rate - c) * (Math.pow((1+rate), y*12) - 1) / rate + c * y*12
        debt = principal - c*y*12 + cipy
        array.push([y, debt, cipy])
        y++
    }

    document.getElementById("output-mpayments").innerHTML = "Monthly payments: " + c
    document.getElementById("output-total-interest-paid").innerHTML = "Total interest paid: " + tipaid 
    document.getElementById("output-cumulative-interest-paid").innerHTML = "Cumulative interest paid: " +cipaid 
    var data = google.visualization.arrayToDataTable(array);
    drawChart(data)
}
