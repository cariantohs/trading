const priceElement = document.getElementById("price");
const analysisElement = document.getElementById("analysis");
const priceChart = document.getElementById("priceChart").getContext("2d");

let prices = [];
let timestamps = [];

const chart = new Chart(priceChart, {
  type: 'line',
  data: {
    labels: timestamps,
    datasets: [{
      label: 'XAUT/USDT',
      data: prices,
      borderColor: 'blue',
      borderWidth: 2,
      fill: false
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: { display: true, title: { display: true, text: 'Time' }},
      y: { display: true, title: { display: true, text: 'Price (USDT)' }}
    }
  }
});

async function fetchPrice() {
  try {
    const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=XAUTUSDT");
    const data = await res.json();
    const price = parseFloat(data.price);
    const now = new Date().toLocaleTimeString();

    // Update HTML
    priceElement.textContent = `$${price.toFixed(2)}`;

    // Update Chart
    prices.push(price);
    timestamps.push(now);
    if (prices.length > 20) {
      prices.shift();
      timestamps.shift();
    }
    chart.update();

    // Basic Analysis
    if (prices.length >= 2) {
      const trend = prices[prices.length - 1] > prices[0] ? "📈 Uptrend" : "📉 Downtrend";
      analysisElement.textContent = `Trend: ${trend}`;
    }
  } catch (err) {
    priceElement.textContent = "Error fetching price!";
    console.error(err);
  }
}

// Fetch price every 5 seconds
fetchPrice();
setInterval(fetchPrice, 5000);
