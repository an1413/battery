const $battery = document.querySelector(".battery-percent");
const $batteryReset = document.querySelector(".battery-subs");
const $clockWrapper = document.querySelector(".clock-wrapper");
let batteryPercent = parseInt($battery.innerHTML); // 문자열을 정수로 변환해야 합니다.
console.log($battery);
console.log(batteryPercent);

function batteryColorChange(){
  if(batteryPercent === 0){
    $clockWrapper.classList.add("off");
  } else {
    $clockWrapper.classList.remove("off");
  }
}

function battery_operate() {
  setInterval(function () {
    if (batteryPercent > 95) {
      batteryPercent -= 1; // 1씩 감소시킵니다.
      $battery.innerHTML = batteryPercent.toString(); // 화면에 표시를 업데이트합니다.
    }
    batteryColorChange();
  }, 1000);
}

$batteryReset.addEventListener('click', function(e) {
  $battery.innerHTML = "100";
  batteryPercent = 100;
});

battery_operate();
