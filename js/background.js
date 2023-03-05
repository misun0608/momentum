/**
 * 앱 처음에 실행했을 때 배경화면 나오게
 */
const images = [
  "0.jpeg",
  "1.jpeg",
  "2.jpeg",
  "3.jpeg",
  "4.jpeg",
  "5.jpeg",
  "6.jpeg",
];

const body = document.querySelector("body");

const chosenImage = images[Math.floor(Math.random() * images.length)];

function paintImage(chosenImage) {
  const image = new Image(); // 이미지를 삽입하는 함수이다
  image.src = `img/${chosenImage}.jpeg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * images.length);
  console.log(number);
  return number;
}

function init() {
  const random = genRandom();
  paintImage(random);
}

init();
