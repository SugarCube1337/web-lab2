// window.onload = function () {
//     drawG(0);
// }

const canvas = document.getElementById("coordinate-system");
const ctx = canvas.getContext("2d");

canvas.addEventListener('click', function (event) {
    var mouseX = (event.clientX - canvas.getBoundingClientRect().left-250)/40;
    var mouseY = -(event.clientY - canvas.getBoundingClientRect().top-250)/40;

    mouseX = mouseX.toFixed(2);
    mouseY = mouseY.toFixed(2);


    var mouseXe = event.clientX - canvas.getBoundingClientRect().left;
    var mouseYe = event.clientY - canvas.getBoundingClientRect().top;

    drawPointe(mouseXe, mouseYe, mouseX, mouseY);

    x = Number.parseFloat(mouseX);
    y = Number.parseFloat(mouseY);
    var form = document.querySelector("#param_r");
    r = Number.parseInt(form.value );

    if(isNaN(r)){
        sendDataPoint(x, y, 0);
    }else{
        sendDataPoint(x, y, r);
    }


});

function drawG(r){

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = 500;
    canvas.height = 500;

    const radiusSpec = 200*r/5;
    const radius = 100;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const pointRadius = 3;

    ctx.strokeStyle = "#c6c6c6c6";
    ctx.lineWidth = 2;
    ctx.fillStyle = "#ffffff";


    ctx.fillStyle = "#ff9000";
    // sign x axis
    ctx.fillText("X", canvas.width - 10, centerY + 20);
    ctx.fillStyle = "#ff9000";
    // sign y axis
    ctx.fillText("Y", centerX - 20, 20);


    ctx.fillStyle = 'blue';
    ctx.strokeStyle = '#ff9000';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX , centerY, radiusSpec/2, 6/2*Math.PI, 3/2*Math.PI); // Adjusted centerX
    ctx.fillStyle = "#15151515";
    ctx.fill();
    ctx.stroke();


    // triangle
    ctx.beginPath();
    ctx.moveTo(centerX + radiusSpec/2, centerY);
    ctx.lineTo(centerX , centerY  +radiusSpec/2);
    ctx.lineTo(centerX, centerY);
    ctx.fillStyle = "#15151515";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY + radiusSpec/2);
    ctx.lineTo(centerX - radiusSpec, centerY + radiusSpec/2);
    ctx.lineTo(centerX - radiusSpec, centerY);
    ctx.closePath();
    ctx.fillStyle = "#15151515";
    ctx.fill();
    ctx.stroke();


    ctx.strokeStyle = "#c6c6c6c6";
    ctx.lineWidth = 2;
    ctx.fillStyle = "#ff9000";


    // x
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();

    // x arrow
    ctx.beginPath();
    ctx.moveTo(canvas.width - 18, centerY - 14);
    ctx.lineTo(canvas.width, centerY);
    ctx.lineTo(canvas.width - 18, centerY + 14);
    ctx.fillStyle = '#c6c6c6c6';
    ctx.fill();

    // x arrow
    ctx.beginPath();
    ctx.moveTo(canvas.width - 15, centerY - 10);
    ctx.lineTo(canvas.width, centerY);
    ctx.lineTo(canvas.width - 15, centerY + 10);
    ctx.fillStyle = '#ff9000';
    ctx.fill();

    // y axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();

    // y arrow
    ctx.beginPath();
    ctx.moveTo(centerX - 14, 18);
    ctx.lineTo(centerX, 0);
    ctx.lineTo(centerX + 14, 18);
    ctx.fillStyle = '#c6c6c6c6';
    ctx.fill();

    // y arrow
    ctx.beginPath();
    ctx.moveTo(centerX - 10, 15);
    ctx.lineTo(centerX, 0);
    ctx.lineTo(centerX + 10, 15);
    ctx.fillStyle = '#ff9000';
    ctx.fill();


}

function validate(x, y, r){
    if ((x >= 0 && x <= r) && (y >= 0 && y <= r))
        return Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2);
    else if ((x <= 0 && x >= -r) && (y >= 0 && y <=  r / 2))
        return y <= r / 2;
    else if (x < 0 && y < 0)
        return false;
    else if ((x >= 0 && x <= r) && (y <= 0 && y >= -r))
        return y >= x - r;
    else
        return false;
}