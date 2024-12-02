let currentIndex = 0;

function changeBackground() {
  const images = [1, 2, 3];

  const body = document.body;
  const background = document.getElementById('background');

  background.style.backgroundImage = `url('../images/background${images[currentIndex]}.png')`;

  currentIndex = (currentIndex + 1) % images.length;
}

document
  .getElementById("changeBackground")
  .addEventListener("click", changeBackground);
