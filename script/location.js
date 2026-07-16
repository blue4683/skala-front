function initGeocoding(lat, lng) {
  const geocoder = new kakao.maps.services.Geocoder();
  return new Promise((resolve, reject) => {
    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve(result[0].address.address_name);
      } else {
        reject(new Error("주소를 가져오지 못했습니다."));
      }
    });
  });
}

async function updateLocation(latitude, longitude) {
  try {
    console.log(`위도: ${latitude}, 경도: ${longitude}`);

    const location = await initGeocoding(latitude, longitude);
    document.getElementById("location-box").innerHTML = `<p>${location}</p>`;
  } catch (error) {
    console.log(error);
    document.getElementById("location-box").innerHTML =
      `<p>주소를 가져올 수 없습니다.</p>`;
  }
}

navigator.geolocation.watchPosition(
  async (position) => {
    const { latitude, longitude } = position.coords;
    await updateLocation(latitude, longitude);
  },
  async (error) => {
    console.error("위치 정보를 가져오는 중 오류 발생:", error);

    // 기본 좌표(예: 광주)
    const latitude = 35.1536606;
    const longitude = 126.7942767;

    await updateLocation(latitude, longitude);
  },
);
