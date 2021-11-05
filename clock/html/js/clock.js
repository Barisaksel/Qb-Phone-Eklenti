const timer = document.getElementById('cronometer');

var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;

function startTimer() {
  if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}
function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
    if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }

    timer.innerHTML = hr + ':' + min + ':' + sec;

    setTimeout("timerCycle()", 1000);
  }
}

function resetTimer() {
    timer.innerHTML = "00:00:00";
    stoptime = true;
    hr = 0;
    sec = 0;
    min = 0;
}

var Cronometer = {
    started: false,
}
$(document).on('click', '.start-stop', function(e){
    if (!Cronometer.started) {
        $(".start-stop").html("Durdur")
        $(".reset-tur").html("Tur")
        $(".start-stop").css({
            "background-color": "#701729",
            color: "#fc3158"
        })
        startTimer()
    } else {
        $(".start-stop").html("Başlat")
        if (tourCount != 1) {
            $(".reset-tur").html("Tur")
        }
    

        $(".start-stop").css({
            "background-color": "rgb(21, 87, 37)",
            color: "rgb(39, 184, 75)"
        })
        stopTimer()
    }
    Cronometer.started = !Cronometer.started
});

//var tourCount = 1
//$(document).on('click', '.reset-tur', function(e){
//    resetTimer()
//});

$(document).on('click', '.clock-app-header-button', function(e){
    MI.Phone.Notifications.Add("fas fa-clock", MI.Phone.Functions.Lang("ALARM_SOON"), "Alarm Sistemi Yakında Sizlerle!", "#badc58", 1750);
})

var tourCount = 1
$(document).on('click', '.reset-tur', function(e){
    var currentTime = $("#cronometer").html();
    if (currentTime != "00:00,00") {
        $(".clock-app-invoices-list").append('<div class="clock-app-invoice"><p>'+tourCount+'.Tur</p><span>'+ currentTime +'</span></div>');
        tourCount += 1    
    }
    if ($(".reset-tur").html() == "Sıfırla") {
        $("#cronometer").html("00:00,00")
        $(".reset-tur").html("Tur")
        $(".clock-app-invoices-list").html("")
        tourCount = 1
    }
});
