const $alarmForm = document.querySelector("#alarm-form"); // alarm-form등록 선택자
const $alarmWrapper = document.querySelector(".alarm"); // alarm현황 선택자
const alarms = []; // 알람배열

  // 로컬 스토리지에서 알람 데이터를 불러와서 초기화합니다.
const storedAlarms = localStorage.getItem("alarms"); // 로컬스토리지 현황담은 변수
if (storedAlarms) { // 로컬스토리지에 값이 있으면
    alarms.push(...JSON.parse(storedAlarms)); // alarms 배열에 넣기
    renderAlarms(); // 랜더링
}

$alarmForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const hourInput = document.querySelector(".hour");
    const minuteInput = document.querySelector(".minute");
    const secondInput = document.querySelector(".second");
    const hour = parseInt(hourInput.value);
    const minute = parseInt(minuteInput.value);
    const second = parseInt(secondInput.value);

    if (isNaN(hour) || isNaN(minute) || isNaN(second) || hour < 0 || hour >= 24 || minute < 0 || minute >= 60 || second < 0 || second >= 60) {
    alert("올바른 시간을 입력하세요.");
    return;
    }
    
    if (alarms.length >= 3) {
        alert("최대 3개의 알람까지만 설정할 수 있습니다.");
        return;
    }

    const alarmTime = `${hour}:${minute}:${second}`; // 알람등록시간

    alarms.push(alarmTime); // 알람현황배열에 저장

    // 로컬스토리지에 저장
    localStorage.setItem("alarms", JSON.stringify(alarms)); 
    renderAlarms();

    // input값 초기화
    hourInput.value = "";
    minuteInput.value = "";
    secondInput.value = "";
    });

function renderAlarms() {  // 알람 랜더링
    $alarmWrapper.innerHTML = ""; // 알람현황 초기화
    for (let i = 0; i < alarms.length; i++) { // 알람 배열의 길이만큼 반복하기
      const alarmItem = document.createElement("li"); // 리스트 생성
      const alarmDeleteBtn = document.createElement("button"); // 삭제 버튼생성
      alarmDeleteBtn.innerText = "삭제";

      console.log(storedAlarms);
      alarmItem.textContent = `알람: ${alarms[i]}`;
      $alarmWrapper.appendChild(alarmItem);
      alarmItem.appendChild(alarmDeleteBtn);

      alarmDeleteBtn.addEventListener("click", function () {
        alarms.splice(i, 1);
        localStorage.setItem("alarms", JSON.stringify(alarms));
        renderAlarms();
      });
    }
  }

  setInterval(checkAlarms, 1000);

  renderAlarms();
