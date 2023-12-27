package com.sugarcube.weblab2;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class UrlFilter extends HttpFilter {


    private static final String LAB_URI = "/lab";
    private static final String INDEX_JS_URI = "/index.js";

    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {
            String uri = request.getRequestURI();

            if (uri.endsWith(LAB_URI) || uri.endsWith(INDEX_JS_URI)) {
                request.getServletContext().getNamedDispatcher("ControllerServlet").forward(request, response);
            } else if (uri.endsWith("/")) {
                response.sendRedirect(uri + LAB_URI);
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            }

        } catch (IOException | ServletException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

}
