package org.example.request;

import org.example.DataService;
import org.example.FCGIUtil;
import org.example.HistoryManager;
import org.example.response.ResponseUtil;


public class RequestHandler {

    private final DataService checkService;
    private final HistoryManager historyManager;
    public RequestHandler(DataService checkService, HistoryManager historyManager) {
        this.checkService = checkService;
        this.historyManager = historyManager;
    }
    public void handleRequest() {
        try {
            String requestBody = FCGIUtil.readRequestBody();
            if (requestBody == null || requestBody.trim().isEmpty()) {
                sendSuccessResponse();
                return;
            }
            Request params = RequestParser.parse(requestBody);
            checkService.processData(params);
            sendSuccessResponse();

        } catch (Exception e) {
            sendErrorResponse(400, "Bad Request: " + e.getMessage());
        }
    }

    private void sendSuccessResponse() {
        String jsonResponse = ResponseUtil.buildSuccessResponse(historyManager.getHistory());
        System.out.print(jsonResponse);
    }

    private void sendErrorResponse(int statusCode, String message) {
        String errorResponse = ResponseUtil.buildErrorResponse(statusCode, message);
        System.out.print(errorResponse);
    }
}