async function fetchData() {
    const response = await fetch('data.csv');
    const data = await response.text();
    return data;
}

function parseCSV(data) {
    const rows = data.split('\n').slice(1);
    let totalSales = 0;
    rows.forEach(row => {
        const columns = row.split(',');
        const sales = parseFloat(columns[2]); // Assuming sales is in the third column
        if (!isNaN(sales)) {
            totalSales += sales;
        }
    });
    return totalSales;
}

async function displayTotalSales() {
    const data = await fetchData();
    const totalSales = parseCSV(data);
    document.querySelector('#total-sales').textContent = totalSales.toFixed(2);
}

displayTotalSales();