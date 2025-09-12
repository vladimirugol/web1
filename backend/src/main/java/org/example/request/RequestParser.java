package org.example.request;

import java.math.BigDecimal;
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

        BigDecimal x = new BigDecimal(params.get("x"));
        BigDecimal y = new BigDecimal(params.get("y"));
        BigDecimal r = new BigDecimal(params.get("r"));

        return new Request(x, y, r);
    }
}
