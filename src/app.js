async function fetchData() {
    const response = await fetch('data.csv');
    const data = await response.text();
    return data;
}

function parseCSV(data) {
    const rows = data.split('\n').slice(1);
    let totalSales = 0;
    let salesData = '';
    rows.forEach(row => {
        const columns = row.split(',');
        const product = columns[0];
        const region = columns[1];
        const sales = parseFloat(columns[2]); // Assuming sales is in the third column
        if (!isNaN(sales)) {
            totalSales += sales;
            salesData += `<tr><td>${product}</td><td>${region}</td><td>${sales.toFixed(2)}</td></tr>`;
        }
    });
    document.querySelector('#product-sales tbody').innerHTML = salesData;
    return totalSales;
}

async function displayTotalSales() {
    const data = await fetchData();
    const totalSales = await parseCSV(data);
    document.querySelector('#total-sales').textContent = totalSales.toFixed(2);
    document.querySelector('#total-currency').textContent = `Total Sales in selected currency: ${totalSales.toFixed(2)}`;
}

displayTotalSales();