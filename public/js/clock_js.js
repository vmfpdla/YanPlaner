var amCanvas = document.getElementById("amCanvas");
var amCtx = amCanvas.getContext("2d");

var pmCanvas = document.getElementById("pmCanvas");
var pmCtx = pmCanvas.getContext("2d");

var radius = amCanvas.height / 2;

var data = document.getElementById("data");

amCtx.translate(radius, radius);
pmCtx.translate(radius, radius);

radius = radius * 0.90

drawClock(amCtx, 'am');
drawClock(pmCtx, 'pm');

function changeAM() {
    var amCanvas = document.getElementById('amCanvasDiv');
    amCanvas.style.display = 'block';
    // 누르면 display 안보이게( 아예 자리도 안차지하게)
    var pmCanvas = document.getElementById('pmCanvasDiv');
    pmCanvas.style.display = 'none';
}

function changePM() {
    var amCanvas = document.getElementById('amCanvasDiv');
    amCanvas.style.display = 'none';
    // 누르면 display 안보이게( 아예 자리도 안차지하게)
    var pmCanvas = document.getElementById('pmCanvasDiv');
    pmCanvas.style.display = 'block';
}

function drawClock(ctx, check) {
    drawFace(ctx, radius, check);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius, check);
}

function drawFace(ctx, radius, check) {
    var grd;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    if (check == 'am') {
        grd = ctx.createLinearGradient(0, 0, 30, 150);
        grd.addColorStop(0, '#2980B9');
        grd.addColorStop(0.35, '#6DD5FA');
        grd.addColorStop(1, '#ffffff');
        ctx.fillStyle = grd;
        ctx.fill();
    } else {
        grd = ctx.createLinearGradient(0, 0, 0, 130);
        grd.addColorStop(0, '#2c3e50');
        grd.addColorStop(1, '#bdc3c7');
        ctx.fillStyle = grd;
        ctx.fill();
    }

    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.025, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius, check) {

    var data1 = data.innerText;
    data1 = JSON.parse(data1);
    if (check == 'am') {
        for (i = 0; i < data1.length; i++) {
            var now_start = data1[i].sch_start.split(":");
            var hour_start = now_start[0];
            var minute_start = now_start[1];
            var second_start = now_start[2];

            var now_end = data1[i].sch_end.split(":");
            var hour_end = now_end[0];
            var minute_end = now_end[1];
            var second_end = now_end[2];

            if (hour_start >= 00 && hour_start <= 12) //시작이 오전 일정인 경우
            {
                hour_start = hour_start % 12;
                hour_start = (hour_start * Math.PI / 6) +
                    (minute_start * Math.PI / (6 * 60)) +
                    (second_start * Math.PI / (360 * 60));
                drawHand(ctx, hour_start, radius, radius * 0.02);

                if (hour_end >= 00 && hour_end <= 12) { // 끝나는 시간도 오전인 경우
                    hour_end = hour_end % 12;
                    hour_end = (hour_end * Math.PI / 6) +
                        (minute_end * Math.PI / (6 * 60)) +
                        (second_end * Math.PI / (360 * 60));
                    drawHand(ctx, hour_end, radius, radius * 0.02);
                    var hour_mid = (hour_end - hour_start) * 0.5;
                } else { // 끝나는 시간이 오휴인경우
                    var hour_mid = (0 - hour_start) * 0.5;
                }
                fillText(ctx, data1[i].sch_title, hour_mid, radius * 0.5);
            } else { // 시작이 오후 일정인 경우
                if (hour_end >= 00 && hour_end <= 12) { // 끝나는 시간이 오전인 경우
                    hour_end = hour_end % 12;
                    hour_end = (hour_end * Math.PI / 6) +
                        (minute_end * Math.PI / (6 * 60)) +
                        (second_end * Math.PI / (360 * 60));
                    drawHand(ctx, hour_end, radius, radius * 0.02);
                    var hour_mid = (hour_start - 0) * 0.5;

                    fillText(ctx, data1[i].sch_title, hour_mid, radius * 0.5);
                }
            }
        }
    } else {
        for (i = 0; i < data1.length; i++) {
            var now_start = data1[i].sch_start.split(":");
            var hour_start = now_start[0];
            var minute_start = now_start[1];
            var second_start = now_start[2];

            var now_end = data1[i].sch_end.split(":");
            var hour_end = now_end[0];
            var minute_end = now_end[1];
            var second_end = now_end[2];

            if (hour_start > 12) //시작이 오후면서
            {
                hour_start = hour_start % 12;
                hour_start = (hour_start * Math.PI / 6) +
                    (minute_start * Math.PI / (6 * 60)) +
                    (second_start * Math.PI / (360 * 60));
                drawHand(ctx, hour_start, radius, radius * 0.02);

                if (hour_end > 12) { // 끝나는 시간도 오후면
                    //여기에 그려야함
                    //hour
                    hour_end = hour_end % 12;
                    hour_end = (hour_end * Math.PI / 6) +
                        (minute_end * Math.PI / (6 * 60)) +
                        (second_end * Math.PI / (360 * 60));
                    drawHand(ctx, hour_end, radius, radius * 0.02);

                    var hour_mid = (hour_end - hour_start) * 0.5;
                } else { // 끝나는 시간은 오전이면
                    var hour_mid = (0 - hour_start) * 0.5;
                }
                fillText(ctx, data1[i].sch_title, hour_mid, radius * 0.5);
            } else { // 시작이 오전이고

                if (hour_end > 12) { // 끝나는 시간은 오후면
                    hour_end = hour_end % 12;
                    hour_end = (hour_end * Math.PI / 6) +
                        (minute_end * Math.PI / (6 * 60)) +
                        (second_end * Math.PI / (360 * 60));
                    drawHand(ctx, hour_end, radius, radius * 0.02);
                    var hour_mid = (hour_end - 0) * 0.5;

                    fillText(ctx, data1[i].sch_title, hour_mid, radius * 0.5);
                }
            }
        }
    }
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function fillText(ctx, text, pos, radius) {
    // var position = pos * length * 0.3;
    // console.log("pos :" + pos + "   length:" + length);
    // ctx.moveTo(0, 0);
    // ctx.fillText(text, position, position);
    ctx.font = "bold 20pt '맑은 고딕'"
    var ang = pos;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(text, 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
}

var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

//console.log(modal);

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);

window.addEventListener("click", windowOnClick);