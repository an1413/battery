const $alarmForm = document.querySelector("#alarm-form");
const $alarmWrapper = document.querySelector(".alarm");
const alarms = loadAlarms(); // 알람을 로드하는 함수 사용

$alarmForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const [hour, minute, second] = getAlarmInputs();
    if (!isValidTime(hour, minute, second)) {
        alert("올바른 시간을 입력하세요.");
        return;
    }
    if (alarms.length >= 3) {
        alert("최대 3개의 알람까지만 설정할 수 있습니다.");
        return;
    }
    const alarmTime = `${hour}:${minute}:${second}`;
    alarms.push(alarmTime);
    saveAlarms(alarms); // 알람을 저장하는 함수 사용
    renderAlarms();
    clearInputFields();
});

function loadAlarms() {
    const storedAlarms = JSON.parse(localStorage.getItem("alarms")) || [];
    return storedAlarms.filter(isValidTime);
}

function saveAlarms(alarms) {
    localStorage.setItem("alarms", JSON.stringify(alarms));
}

function isValidTime(hour, minute, second) {
    return (
        !isNaN(hour) &&
        !isNaN(minute) &&
        !isNaN(second) &&
        hour >= 0 &&
        hour < 24 &&
        minute >= 0 &&
        minute < 60 &&
        second >= 0 &&
        second < 60
    );
}

function getAlarmInputs() {
    const hourInput = document.querySelector(".hour");
    const minuteInput = document.querySelector(".minute");
    const secondInput = document.querySelector(".second");
    return [
        parseInt(hourInput.value),
        parseInt(minuteInput.value),
        parseInt(secondInput.value)
    ];
}

function clearInputFields() {
    const inputs = document.querySelectorAll("#alarm-form input[type='number']");
    inputs.forEach((input) => (input.value = ""));
}

function renderAlarms() {
    $alarmWrapper.innerHTML = "";
    alarms.forEach((alarm, index) => {
        const alarmItem = document.createElement("li");
        const alarmDeleteBtn = document.createElement("button");
        alarmDeleteBtn.innerText = "삭제";
        alarmItem.textContent = `알람: ${alarm}`;
        $alarmWrapper.appendChild(alarmItem);
        alarmItem.appendChild(alarmDeleteBtn);
        alarmDeleteBtn.addEventListener("click", function () {
            alarms.splice(index, 1);
            saveAlarms(alarms);
            renderAlarms();
        });
    });
}

setInterval(checkAlarms, 1000);
renderAlarms();