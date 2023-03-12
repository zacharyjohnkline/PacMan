const gameArea = document.querySelector(".boundaries-area");
let pacMen = [];

function randomPos(a, b) {
  return {
    x: Math.floor(Math.random() * (a - 50)),
    y: Math.floor(Math.random() * (b -50)),
  };
}
function randomValue(num) {
  return {
    x: Math.floor(Math.random() * num) + 1,
    y: Math.floor(Math.random() * num) + 1,
  };
}

function makePacmen() {
  const gameAreaMea = document
    .querySelector(".boundaries-area")
    .getBoundingClientRect();
  const rightBoundary = gameAreaMea.width;
  const bottomBoundary = gameAreaMea.height;
  let position = randomPos(
    rightBoundary,
    bottomBoundary,
  );
  var velocity = randomValue(10);
  let pacImg = document.createElement("img");
  pacImg.src = "PacMan1.png";
  pacImg.style.position = "absolute";
  pacImg.style.top = position.y + "px";
  pacImg.style.left = position.x + "px";
  pacImg.width = 50;
  pacImg.style.width = pacImg.width + "px";
  gameArea.appendChild(pacImg);
  return {
    velocity,
    position,
    pacImg,
  };
}
function addPacman() {
  pacMen.push(makePacmen());
}
function subtractPacman() {
  if (pacMen.length === 0) {
    return;
  } else {
    let lastOne = pacMen[pacMen.length - 1];
    lastOne.pacImg.remove();
    pacMen = pacMen.slice(0, pacMen.length - 1);
  }
}
function changeImage(item, a, b) {
  if (item.pacImg.getAttribute("src") == `PacMan${a}.png`) {
    item.pacImg.setAttribute("src", `PacMan${b}.png`);
    return;
  }
  if (item.pacImg.getAttribute("src") == `PacMan${b}.png`) {
    item.pacImg.setAttribute("src", `PacMan${a}.png`);
    return;
  }
}
function start() {
  //loop over pacmen array and move each one and move image in DOM
  if (pacMen.length > 0) {
    pacMen.forEach((item) => {
      checkCollisions(item);
      if (item.velocity.x > 0) {
        if (
          item.pacImg.getAttribute("src") === "PacMan3.png" ||
          item.pacImg.getAttribute("src") === "PacMan4.png"
        ) {
          item.pacImg.setAttribute("src", "PacMan1.png");
        } else {
          changeImage(item, 1, 2);
        }
      } else {
        if (
          item.pacImg.getAttribute("src") !== "PacMan3.png" ||
          item.pacImg.getAttribute("src") !== "PacMan3.png"
        ) {
          item.pacImg.setAttribute("src", "PacMan3.png");
        } else {
          changeImage(item, 3, 4);
        }
      }
      item.position.x += item.velocity.x;
      item.position.y += item.velocity.y;

      item.pacImg.style.left = item.position.x + "px";
      item.pacImg.style.top = item.position.y + "px";
    });
    setTimeout(start, 50);
  } else {
    clearTimeout();
  }
}

function checkCollisions(item) {
  const gameAreaMea = document
    .querySelector(".boundaries-area")
    .getBoundingClientRect();
  const rightBoundary = gameAreaMea.width;
  const bottomBoundary = gameAreaMea.height;
  if (
    item.position.x + item.pacImg.width >= rightBoundary ||
    item.position.x <= 0
  )
    item.velocity.x = -item.velocity.x;
  if (
    item.position.y + item.pacImg.height >= bottomBoundary ||
    item.position.y <= 0
  )
    item.velocity.y = -item.velocity.y;
}
