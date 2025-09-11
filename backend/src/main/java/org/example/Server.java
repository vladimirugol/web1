package org.example;

import com.fastcgi.FCGIInterface;
import org.example.request.RequestHandler;

public class Server implements Runnable {

    private final RequestHandler requestHandler;

    public Server() {
        HistoryManager historyManager = new HistoryManager();
        DataService checkService = new DataService(historyManager);
        this.requestHandler = new RequestHandler(checkService, historyManager);
    }

    @Override
    public void run() {
        System.out.println("FastCGI сервер запущен...");
        while (new FCGIInterface().FCGIaccept() >= 0) {
            requestHandler.handleRequest();
        }
        System.out.println("FastCGI сервер завершил работу.");
    }
}