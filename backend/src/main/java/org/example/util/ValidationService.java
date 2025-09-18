package org.example.util;

import org.example.exception.ValidationException;

import java.math.BigDecimal;

public class ValidationService {
    public static void validate(BigDecimal value, BigDecimal min, BigDecimal max) throws ValidationException {
        if (value.compareTo(min) < 0 || value.compareTo(max) > 0) {
            throw new ValidationException(
                    String.format("param must be from %s to %s.", min, max)
            );
        }
    }
    public static void validate(BigDecimal value, int min, int max) throws ValidationException {
        if (value.stripTrailingZeros().scale() > 0) {
            throw new ValidationException("must be celoe chislo");
        }
        BigDecimal minBd = BigDecimal.valueOf(min);
        BigDecimal maxBd = BigDecimal.valueOf(max);
        if (value.compareTo(minBd) < 0 || value.compareTo(maxBd) > 0) {
            throw new ValidationException(
                    String.format("must be from %d to %d.", min, max)
            );
        }
    }
}
