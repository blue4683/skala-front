const citySelect = document.querySelector("#city-select");
const weatherBox = document.querySelector("#weather-box");
console.log(citySelect, weatherBox);

citySelect.addEventListener("change", async function (event) {
  const selectedValue = event.target.value;

  if (selectedValue === "none") {
    weatherBox.innerHTML = "<p>도시를 선택하면 좌표가 표시됩니다.</p>";
    return;
  }

  const coords = selectedValue.split(",");
  const lat = coords[0];
  const lon = coords[1];
  const cityName = citySelect.options[citySelect.selectedIndex].text;

  weatherBox.innerHTML = "<p>실시간 날씨 로딩 중... ⏳</p>";

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    const currentTemp = data.current.temperature_2m;
    const currentHumidity = data.current.relative_humidity_2m;

    weatherBox.innerHTML = `
            <div style="background-color: #f1f2f6; padding: 15px; border-radius: 6px; margin-top: 10px;">
                <h4>🌍 ${cityName} 실시간 날씨</h4>
                <p>${currentTemp > 25 ? "🔥" : "🌡️"} 현재 기온: <strong>${currentTemp}°C</strong></p>
                <p> ${currentHumidity > 50 ? "💧" : "☀️"} 현재 습도: <strong>${currentHumidity}%</strong></p>
            </div>
        `;
  } catch (error) {
    weatherBox.innerHTML = "<p>⚠️ 날씨 정보를 가져오는데 실패했습니다.</p>";
    console.error(error);
  }
});
