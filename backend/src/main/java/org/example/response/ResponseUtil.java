package org.example.response;

import com.google.gson.Gson;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

public class ResponseUtil {
    private static final Gson gson = new Gson();

    public static String buildSuccessResponse(List<Response> history) {
        Map<String, List<Response>> responseMap = Map.of("history", history);
        String jsonContent = gson.toJson(responseMap);
        return buildHttpResponse(200, jsonContent);
    }

    public static String buildErrorResponse(int statusCode, String errorMessage) {
        Map<String, String> errorMap = Map.of("error", errorMessage);
        String jsonContent = gson.toJson(errorMap);
        return buildHttpResponse(statusCode, jsonContent);
    }
    private static String buildHttpResponse(int statusCode, String content) {
        String statusMessage = getStatusMessage(statusCode);
        byte[] contentBytes = content.getBytes(StandardCharsets.UTF_8);

        return "HTTP/1.1 " + statusCode + " " + statusMessage + "\r\n" +
                "Content-Type: application/json; charset=UTF-8\r\n" +
                "Content-Length: " + contentBytes.length + "\r\n" +
                "\r\n" +
                content;
    }

    private static String getStatusMessage(int statusCode) {
        switch (statusCode) {
            case 200: return "OK";
            case 400: return "Bad Request";
            case 500: return "Internal Server Error";
            default: return "OK";
        }
    }
}