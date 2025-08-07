async function fetchPrice() {
  try {
    const url = "https://corsproxy.io/?" + encodeURIComponent("https://api.binance.com/api/v3/ticker/price?symbol=XAUTUSDT");
    const res = await fetch(url);
    const data = await res.json();

    if (!data.price) {
      priceElement.textContent = "No price found!";
      return;
    }

    const price = parseFloat(data.price);
    const now = new Date().toLocaleTimeString();

    priceElement.textContent = `$${price.toFixed(2)}`;

    prices.push(price);
    timestamps.push(now);
    if (prices.length > 20) {
      prices.shift();
      timestamps.shift();
    }
    chart.update();

    if (prices.length >= 2) {
      const trend = prices[prices.length - 1] > prices[0] ? "📈 Uptrend" : "📉 Downtrend";
      analysisElement.textContent = `Trend: ${trend}`;
    }
  } catch (err) {
    priceElement.textContent = "Error fetching price!";
    console.error("Fetch failed:", err);
  }
}
