package org.example.request;

import org.example.exception.ValidationException;

import java.math.BigDecimal;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import static org.example.util.ValidationService.validate;

public class RequestParser {
    public static Request parse(String requestBody) throws ValidationException {
        Map<String, String> params = new HashMap<>();
        for (String param : requestBody.split("&")) {
            String[] pair = param.split("=");
            if (pair.length > 1) {
                String key = URLDecoder.decode(pair[0], StandardCharsets.UTF_8);
                String value = URLDecoder.decode(pair[1], StandardCharsets.UTF_8).replace(',', '.');
                params.put(key, value);
            }
        }
        if (!params.containsKey("x") || !params.containsKey("y") || !params.containsKey("r")){
            throw new ValidationException("missing params");
        }
        BigDecimal x, y, r;
        try {
            x = new BigDecimal(params.get("x"));
            y = new BigDecimal(params.get("y"));
            r = new BigDecimal(params.get("r"));
        } catch (NumberFormatException e) {
            throw new ValidationException("x, y and r must be valid numbers");
        }

        validate(x, BigDecimal.valueOf(-5), BigDecimal.valueOf(5));
        validate(y, -5, 3);
        validate(r, 1, 5);
        return new Request(x, y, r);
    }
}
