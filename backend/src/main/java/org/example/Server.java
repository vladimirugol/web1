package org.example;

import com.fastcgi.FCGIInterface;
import org.example.request.RequestHandler;

public class Server implements Runnable {

    private final RequestHandler requestHandler;

    public Server() {
        DataService checkService = new DataService();
        this.requestHandler = new RequestHandler(checkService);
    }

    @Override
    public void run() {
        FCGIInterface fcgi = new FCGIInterface();
        System.out.println("сервер запущен");
        try {
            while (fcgi.FCGIaccept() >= 0) {
                requestHandler.handleRequest();
            }
        } catch (Exception e) {
            System.err.println("Критическая ошибка в главном цикле FCGI: " + e.getMessage());
        }
    }
}