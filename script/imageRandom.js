const images = [
  {
    src: "../media/제주도.jpeg",
    alt: "제주도 성산일출봉",
    caption: "제주도의 성산일출봉을 촬영한 모습 (2016년 촬영)",
  },
  {
    src: "../media/순천.jpeg",
    alt: "순천 순천만",
    caption: "순천 순천만에서 촬영한 모습 (2025년 촬영)",
  },
  {
    src: "../media/전주.jpeg",
    alt: "전주 한옥마을",
    caption: "전주 한옥마을에서 촬영한 모습 (2024년 촬영)",
  },
  {
    src: "../media/세부.jpg",
    alt: "세부 해변",
    caption: "세부 해변에서 촬영한 모습",
  },
  {
    src: "../media/리장.jpg",
    alt: "리장",
    caption: "리장에서 촬영한 모습 (2023년 촬영)",
  },
  {
    src: "../media/홋카이도.jpg",
    alt: "홋카이도",
    caption: "홋카이도에서 촬영한 모습 (2023년 촬영)",
  },
];

const img = document.getElementById("random-image");
const caption = document.getElementById("image-caption");

let prevIndex = -1;

function changeRandomImage() {
  let index;

  do {
    index = Math.floor(Math.random() * images.length);
  } while (index === prevIndex);

  prevIndex = index;

  img.classList.add("fade-out");
  caption.classList.add("fade-out");

  setTimeout(() => {
    img.src = images[index].src;
    img.alt = images[index].alt;
    caption.textContent = images[index].caption;
    img.classList.remove("fade-out");
    caption.classList.remove("fade-out");
  }, 500);
}

// 처음 한 번 실행
changeRandomImage();

// 3초마다 변경
setInterval(changeRandomImage, 3000);
