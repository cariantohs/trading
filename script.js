async function fetchPrice() {
    try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=XAUTUSDT');
        const data = await response.json();
        document.getElementById('price').innerText = `Harga: ${data.price} USDT`;

        // Analisis sederhana
        let analysisText = parseFloat(data.price) > 1000 ? "Harga tinggi, pertimbangkan untuk menjual." : "Harga rendah, ini bisa jadi kesempatan membeli.";
        document.getElementById('analysis').innerText = analysisText;
    } catch (error) {
        console.error("Error fetching price:", error);
        document.getElementById('price').innerText = "Gagal mengambil data.";
    }
}

// Refresh data saat tombol klik
document.getElementById('refreshButton').addEventListener('click', fetchPrice);

// Ambil harga saat pertama kali dimuat
fetchPrice();
