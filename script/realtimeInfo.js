import { getLiveWeather } from "./weatherAPI.js";

const citySelect = document.querySelector("#city-select");
const weatherBox = document.querySelector("#weather-box");

citySelect.addEventListener("change", async function (event) {
  console.log("선택된 옵션의 값:", event.target.value); // 디버깅용 로그

  const selectedValue = event.target.value;
  if (selectedValue === "none") {
    weatherBox.innerHTML = "<p>도시를 선택하세요.</p>";
    return;
  }

  const coords = selectedValue.split(",");
  const cityName = citySelect.options[citySelect.selectedIndex].text;

  weatherBox.innerHTML = "<p>모듈을 통해 실시간 수신 중... 📡</p>";

  const weatherInfo = await getLiveWeather(coords[0], coords[1]);

  if (weatherInfo) {
    weatherBox.innerHTML = `
            <div style="background-color: #f1f2f6; padding: 15px; border-radius: 6px; margin-top: 10px;">
                <h4>🌍 ${cityName} 실시간 날씨</h4>
                <p>${weatherInfo.temp > 25 ? "🔥" : "🍃"} 현재 기온: <strong>${weatherInfo.temp}°C</strong></p>
                <p> ${weatherInfo.humidity > 50 ? "💧" : "☀️"} 현재 습도: <strong>${weatherInfo.humidity}%</strong></p>
            </div>
        `;
  } else {
    weatherBox.innerHTML = "<p>데이터를 불러오지 못했습니다.</p>";
  }
});
