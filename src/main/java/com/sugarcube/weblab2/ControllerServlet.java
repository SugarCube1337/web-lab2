package com.sugarcube.weblab2;

import com.sugarcube.weblab2.dao.HitStorage;
import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


import java.io.IOException;

public class ControllerServlet extends HttpServlet {

    @EJB
    private HitStorage hitstorage;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setAttribute("HitStorage", hitstorage);
        request.getRequestDispatcher("/index.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/check").forward(request, response);
    }


    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Cookie sessionIdCookie = null;

        // Проверка, что cookies не является null
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("JSESSIONID")) {
                    sessionIdCookie = cookie;
                    break;
                }
            }
        }

        // Проверка, что cookie был найден
        if (sessionIdCookie != null) {
            String sessionId = sessionIdCookie.getValue();

            hitstorage.deleteUserHits(sessionId);

            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            // Обработка случая, когда cookie не был найден
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().println("JSESSIONID cookie not found");
        }
    }

}
