const $clock = document.querySelector(".clock");

function updateDateAndTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const date = now.getDate();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const formattedDay = `${year}-${month}-${date}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  render(formattedDay, formattedTime);
}

function render(formattedDay, formattedTime) {
  $clock.textContent = `${formattedDay}  ${formattedTime}`;
}

// 페이지가 로드될 때 시계 업데이트
updateDateAndTime();

// 1초마다 시계 업데이트
setInterval(updateDateAndTime, 1000);
