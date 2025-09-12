package org.example;

import org.example.request.Request;

import java.math.BigDecimal;

public class HitChecker {

    public static boolean checkHit(Request req) {
        return checkHit(req.x(), req.y(), req.r());
    }
    public static boolean checkHit(BigDecimal x, BigDecimal y, BigDecimal r) {
        BigDecimal ZERO = BigDecimal.ZERO;
        BigDecimal TWO = BigDecimal.valueOf(2).negate();
        BigDecimal H = BigDecimal.valueOf(0.5);
        if (x.compareTo(ZERO) >= 0 && y.compareTo(ZERO) >= 0) {
            return y.compareTo(x.multiply(TWO).add(r)) <= 0;
        }
        else if (x.compareTo(ZERO) < 0 && y.compareTo(ZERO) >= 0) {
            return x.compareTo(r.multiply(H).negate()) >= 0  && y.compareTo(r) <= 0;
        }
        else if (x.compareTo(ZERO) <= 0 && y.compareTo(ZERO) < 0) {
            return x.pow(2).add(y.pow(2)).compareTo(r.multiply(H).pow(2)) <= 0;
        }
        return false;
    }
}