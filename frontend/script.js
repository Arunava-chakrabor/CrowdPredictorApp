const API = "http://127.0.0.1:5000";

async function loadStations() {
  let res = await fetch(API + "/stations");
  let data = await res.json();
  let sel = document.getElementById("station");
  data.forEach(s => {
    let opt = document.createElement("option");
    opt.value = s.code;
    opt.innerText = s.name;
    sel.appendChild(opt);
  });
}

async function predictNow() {
  let station = document.getElementById("station").value;
  let res = await fetch(API + "/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ station_code: station })
  });
  let data = await res.json();
  document.getElementById("result").innerText =
    `Predicted crowd: ${data.predicted_crowd}, Live crowd: ${data.live_crowd}`;
}

async function sendFeedback() {
  let station = document.getElementById("station").value;
  let level = document.getElementById("feedbackLevel").value;
  let comment = document.getElementById("feedbackComment").value;
  await fetch(API + "/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ station_code: station, crowd_level: level, comment: comment })
  });
  alert("Feedback submitted!");
}

loadStations();
