document.addEventListener("DOMContentLoaded", function () {
const $alarmForm = document.querySelector("#alarm-form");
const $alarmWrapper = document.querySelector(".alarm");
const alarms = [];

  // 로컬 스토리지에서 알람 데이터를 불러와서 초기화합니다.
const storedAlarms = localStorage.getItem("alarms");
if (storedAlarms) {
    alarms.push(...JSON.parse(storedAlarms));
    renderAlarms();
}

$alarmForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const hourInput = document.querySelector(".hour");
    const minuteInput = document.querySelector(".minute");
    const secondInput = document.querySelector(".second");

    const hour = parseInt(hourInput.value);
    const minute = parseInt(minuteInput.value);
    const second = parseInt(secondInput.value);

    if (isNaN(hour) || isNaN(minute) || isNaN(second)) {
        alert("올바른 시간을 입력하세요.");
        return;
    }

    if (alarms.length >= 3) {
        alert("최대 3개의 알람만 설정할 수 있습니다.");
        return;
    }

    const alarmTime = `${hour}:${minute}:${second}`;

    alarms.push(alarmTime);

    localStorage.setItem("alarms", JSON.stringify(alarms));

    renderAlarms();

    hourInput.value = "00";
    minuteInput.value = "00";
    secondInput.value = "00";
});

function renderAlarms() {
    $alarmWrapper.innerHTML = ""; // 목록 초기화

    for (let i = 0; i < alarms.length; i++) {
    //   const alarmItemWrapper = document.createElement("div"); // 래퍼 요소 추가
      const alarmItem = document.createElement("li");
      const alarmDeleteBtn = document.createElement("button");
      alarmDeleteBtn.innerText = "삭제";

      const [hour, minute, second] = alarms[i].split(":").map(Number);

      if (isNaN(hour) || isNaN(minute) || isNaN(second)) {
        // 알람 데이터가 올바르지 않은 경우 스킵
        continue;
      }

      alarmItem.textContent = `알람: ${hour}시 ${minute}분 ${second}초`;
      $alarmWrapper.appendChild(alarmItem);
      alarmItem.appendChild(alarmDeleteBtn);
    //   $alarmWrapper.appendChild(alarmItem);

      alarmDeleteBtn.addEventListener("click", function () {
        alarms.splice(i, 1);
        localStorage.setItem("alarms", JSON.stringify(alarms));
        renderAlarms();
      });
    }
  }

  function checkAlarms() {
    const now = new Date();

    for (let i = 0; i < alarms.length; i++) {
      const [hour, minute, second] = alarms[i].split(":").map(Number);

      if (isNaN(hour) || isNaN(minute) || isNaN(second)) {
        // 알람 데이터가 올바르지 않은 경우 스킵
        continue;
      }

      const alarmTime = new Date();
      alarmTime.setHours(hour);
      alarmTime.setMinutes(minute);
      alarmTime.setSeconds(second);

      if (now >= alarmTime) {
        alert("알람이 울립니다!");
        alarms.splice(i, 1);
        localStorage.setItem("alarms", JSON.stringify(alarms));
        renderAlarms();
        i--;
      }
    }
  }

  setInterval(checkAlarms, 1000);

  renderAlarms();
});
