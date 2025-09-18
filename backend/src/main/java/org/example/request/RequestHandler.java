package org.example.request;

import org.example.DataService;
import org.example.exception.ValidationException;
import org.example.response.Response;
import org.example.response.ResponseUtil;

import static org.example.util.FCGIUtil.getRequestMethod;
import static org.example.util.FCGIUtil.readRequestBody;


public class RequestHandler {

    private final DataService checkService;
    public RequestHandler(DataService checkService) {
        this.checkService = checkService;
    }
    public synchronized void handleRequest() {
        try {
            if (!"POST".equalsIgnoreCase(getRequestMethod())) {
                sendErrorResponse(405, "Method Not Allowed");
                return;
            }
            String requestBody = readRequestBody();
            if (requestBody == null || requestBody.trim().isEmpty()) {
                sendSuccessResponse(null);
                return;
            }
            System.out.println("пришел запрос");
            Request params = RequestParser.parse(requestBody);
            sendSuccessResponse(checkService.processData(params));
        } catch (ValidationException e) {
            sendErrorResponse(400, "Bad Request: " + e.getMessage());
        } catch (Exception e){
            sendErrorResponse(500, "Internal server error: " + e.getMessage() );
        }
    }

    private void sendSuccessResponse(Response response) {
        String jsonResponse = ResponseUtil.buildSuccessResponse(response);
        System.out.print(jsonResponse);
    }

    private void sendErrorResponse(int statusCode, String message) {
        String errorResponse = ResponseUtil.buildErrorResponse(statusCode, message);
        System.out.print(errorResponse);
    }
}