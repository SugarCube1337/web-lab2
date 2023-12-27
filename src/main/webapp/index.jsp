<%@ page import="com.sugarcube.weblab2.dao.HitStorage" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>JSP - Hello World</title>
    <style><%@include file="styles.css"%></style>

</head>
<body onload="drawG(0)">
<header class="header">
    <h1>Попадание точки на координатной плоскости в заданную область</h1>
    <div class="info">
        <p>ФИО студента: Печкуров Данила Алексеевич</p>
        <p>Номер группы: P3208</p>
        <p>Номер варианта: 1816/5877024/</p>
    </div>
</header>

<canvas id="coordinate-system"></canvas>

<section class="card">
    <form method="post" class="user-form">
        <div class="card">
            <div>
                <legend>Выберите радиус R:</legend>
                <div>
                    <input type="radio" id="1" name="r" onclick="showValue(1)">
                    <label for="1">1</label>
                    <input type="radio" id="1,5" name="r" onclick="showValue(1,5)" >
                    <label for="1,5">1,5</label>
                    <input type="radio" id="2" name="r" onclick="showValue(2)">
                    <label for="2">2</label>
                    <input type="radio" id="2,5" name="r"  onclick="showValue(2,5)">
                    <label for="2,5">2,5</label>
                    <input type="radio" id="3" name="r" onclick="showValue(3)" >
                    <label for="3">3</label>
                    <input type="hidden" id="param_r" name="r" value="" >
                </div>
            </div>
            <div>
                <legend>Введите координату Y {-3, ..., 5}:</legend>
                <div>
                    <input type="number" id="y" name="y" step="0.1" min="-3" max="5">
                </div>
            </div>
        </div>

        <div>
            <legend>Выберите координату X:</legend>
            <div>
                <select id="x" name="x" onchange="showValueX()">
                    <option value="" selected disabled hidden>     </option>
                    <option value="-5">-5</option>
                    <option value="-4">-4</option>
                    <option value="-3">-3</option>
                    <option value="-2">-2</option>
                    <option value="-1">-1</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <input type="hidden" id="param_x" name="x" value="" required>
                </select>
            </div>
        </div>

        <div>
            <input class="submit-button" type="submit" value="Проверить">
            <input class="clear_table" type="button" value="Очистить" onclick="deleteData()">
        </div>
    </form>
</section>

<div class="messages-container">
    <div id="error-message" class="error-message"></div>
    <div id="success-message" class="success-message"></div>
</div>

<table class="table">
    <tr id="result">
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Is Hit</th>
        <th>Attempt Time</th>
        <th>Script Duration</th>
    </tr>
    <%
        HitStorage hitStorage = (HitStorage) request.getAttribute("HitStorage");
        for (int i = 0; i < hitStorage.getHits().size(); i++) {
            out.println("<tr>" +
                    "<td>" + hitStorage.getHits().get(i).getX() + "</td>" +
                    "<td>" + hitStorage.getHits().get(i).getY() + "</td>" +
                    "<td>" + hitStorage.getHits().get(i).getR() + "</td>" +
                    "<td>" + hitStorage.getHits().get(i).isHit() + "</td>" +
                    "<td>" + hitStorage.getHits().get(i).getAttemptTime() + "</td>" +
                    "<td>" + hitStorage.getHits().get(i).getScriptDuration() + "</td>" +
                    "</tr>");
        }
    %>
</table>

<script>
    <%@ include file="index.js" %>
</script>
<script>
    <%@ include file="decart.js" %>
</script>

</body>
</html>
