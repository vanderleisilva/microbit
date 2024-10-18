const up = document.getElementById("up");
const left = document.getElementById("left");
const right = document.getElementById("right");
const down = document.getElementById("down");

const send = (data) => (e) => {
  e.preventDefault();
  sendToMicrobit(data);
};

// Add event listeners for buttons
up.addEventListener("mousedown", send("4"));
left.addEventListener("mousedown", send("3"));
right.addEventListener("mousedown", send("2"));
down.addEventListener("mousedown", send("1"));

up.addEventListener("mouseup", send("X"));
left.addEventListener("mouseup", send("X"));
right.addEventListener("mouseup", send("X"));
down.addEventListener("mouseup", send("X"));

// Add event listeners for mobile
up.addEventListener("touchstart", send("4"));
left.addEventListener("touchstart", send("3"));
right.addEventListener("touchstart", send("2"));
down.addEventListener("touchstart", send("1"));

up.addEventListener("touchend", send("X"));
left.addEventListener("touchend", send("X"));
right.addEventListener("touchend", send("X"));
down.addEventListener("touchend", send("X"));

document
  .getElementById("connect-btn")
  .addEventListener("click", connectToMicrobit);
