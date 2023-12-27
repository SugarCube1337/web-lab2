
const form = document.querySelector('.user-form');
form.addEventListener('submit', (evt) => {
    // Отменяем действие по умолчанию
    evt.preventDefault();
    let x = document.querySelector("#param_x").value;
    let y = document.querySelector("#y").value;
    let r = document.querySelector("#param_r").value;
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    // Проверяем, введены ли все данные
    if (!x ||!y || !r) {
        errorMessage.textContent = 'Please enter all data.';
        successMessage.textContent = '';
        return;
    }

    // Check if the entered values are numbers
    if (isNaN(y) || isNaN(r)) {
        errorMessage.textContent = 'Coordinate Y and radius R must be numbers.';
        successMessage.textContent = '';
        return;
    }

    if (y < -3 || y > 5) {
        errorMessage.textContent = 'Coordinate Y must be within the range of -3 to 5.';
        successMessage.textContent = '';
        return;
    }

    // Clear the error message if the data is entered correctly
    errorMessage.textContent = '';
    successMessage.textContent = 'Data entered successfully!';
    //drawPointe(x*40+250, (-y*40+250), x, y)
    sendDataPoint(x, y, r);

});

function sendDataPoint(x, y, r){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "lab", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var resultContainer = document.getElementById("result");
            var jsonResponse = JSON.parse(xhr.responseText);
            var attemptTime = jsonResponse.attemptTime.toString();
            var scriptDuration = jsonResponse.scriptDuration.toString();
            var hit = jsonResponse.hit.toString();
            resultContainer.insertAdjacentHTML("afterend",
                "<tr>"+
                "<td>"+jsonResponse.x+"</td>"+
                "<td>"+jsonResponse.y+"</td>"+
                "<td>"+jsonResponse.r+"</td>"+
                "<td>"+hit +"</td>"+
                "<td>"+attemptTime +"</td>"+
                "<td>"+scriptDuration +"</td>"+
                "</tr>"
            );
        }
    };

    var data = "x=" + encodeURIComponent(x) + "&y=" + encodeURIComponent(y) + "&r=" + encodeURIComponent(r);
    xhr.send(data);
}

function deleteData(){
    fetch("lab", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function(response) {
            if (response.ok) {
                var resultTable = document.getElementById("result");
                while (resultTable.nextElementSibling) {
                    resultTable.nextElementSibling.remove();
                }
                console.log("Запрос DELETE успешно выполнен.");
                drawG(0);
            } else {
                console.error("Произошла ошибка при выполнении запроса DELETE.");
            }
        })
        .catch(function(error) {
            console.error("Произошла ошибка при выполнении запроса DELETE:", error);
        });
}

function showValue(value) {
    var form = document.querySelector("#param_r");
    form.value = value;
    drawG(Number.parseInt(value));
}
function showValueX() {
    var selectElement = document.getElementById("x");
    var hiddenInput = document.getElementById("param_x");
    hiddenInput.value = selectElement.value;
}