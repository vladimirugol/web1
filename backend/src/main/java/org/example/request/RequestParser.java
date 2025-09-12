package org.example.request;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class RequestParser {
    public static Request parse(String requestBody) {
        Map<String, String> params = new HashMap<>();
        for (String param : requestBody.split("&")) {
            String[] pair = param.split("=");
            if (pair.length > 1) {
                String key = URLDecoder.decode(pair[0], StandardCharsets.UTF_8);
                String value = URLDecoder.decode(pair[1], StandardCharsets.UTF_8).replace(',', '.');
                params.put(key, value);
            }
        }

        long x = Long.parseLong(params.get("x"));
        long y = Long.parseLong(params.get("y"));
        long r = Long.parseLong(params.get("r"));

        return new Request(x, y, r);
    }
}
