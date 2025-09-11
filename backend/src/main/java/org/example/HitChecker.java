package org.example;

import org.example.request.Request;

public class HitChecker {
    public static boolean checkHit(Request req){
        return checkHit(req.x(), req.y(), req.r());
    }

    public static boolean checkHit(double x, double y, double r) {
        if (x <= 0 && y >= 0) {
            return (y <= 2 * x + r);
        }
        if (x <= 0 && y <= 0) {
            return (x >= -r / 2) && (y >= -r);
        }
        if (x >= 0 && y <= 0) {
            return (x * x + y * y <= r * r);
        }
        return false;
    }
}
