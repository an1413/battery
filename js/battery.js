const $battery = document.querySelector(".battery-percent");

console.log($battery);
console.log($battery.innerHTML);
let batteryPercent = parseInt($battery.innerHTML); // 문자열을 정수로 변환해야 합니다.

console.log(typeof batteryPercent);

function battery_operate() {
  setInterval(function () {
    if (batteryPercent > 0) {
      batteryPercent -= 1; // 1씩 감소시킵니다.
      $battery.innerHTML = batteryPercent.toString(); // 화면에 표시를 업데이트합니다.
    }
  }, 1000);
}

battery_operate();
