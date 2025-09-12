package org.example.response;

import java.math.BigDecimal;

public record Response(BigDecimal x, BigDecimal y, BigDecimal r, boolean hit, String currentTime, long execMs) {
}
