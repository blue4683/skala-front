const btnGame = document.querySelector("#btn-game");

btnGame.addEventListener("click", function () {
  var computerNum = Math.floor(Math.random() * 50) + 1;
  var count = 0;

  console.log("이번 판 컴퓨터의 비밀 숫자: " + computerNum);
  const regex = /\d+/; // 숫자만 있는지 확인하는 정규식
  while (true) {
    var userGuess = prompt(
      "1부터 50 사이의 숫자 중 컴퓨터가 생각한 숫자는 무엇일까요?",
    );

    if (userGuess === null) {
      alert("게임이 취소되었습니다.");
      break;
    }

    if (!regex.test(userGuess)) {
      alert("⚠️ 올바른 숫자를 입력하지 않으셨습니다. 다시 시도해 주세요.");
      continue;
    }

    userGuess = Number(userGuess);
    if (userGuess < 1 || userGuess > 50 || isNaN(userGuess)) {
      alert("⚠️ 1부터 50 사이의 숫자를 입력해 주세요.");
      continue;
    }

    count += 1;
    if (userGuess === computerNum) {
      alert(
        "🎉 정답입니다! 축하합니다!\n👉 도전 횟수: " +
          count +
          "번 만에 맞추셨습니다.",
      );
      break;
    } else if (userGuess > computerNum) {
      alert(
        "🔽 Down! 더 작은 숫자를 입력해 보세요. (현재 " + count + "회 도전 중)",
      );
    } else if (userGuess < computerNum) {
      alert(
        "🔼 Up! 더 큰 숫자를 입력해 보세요. (현재 " + count + "회 도전 중)",
      );
    } else {
      alert("⚠️ 올바른 숫자를 입력하지 않으셨습니다. 다시 시도해 주세요.");
    }
  }
});
