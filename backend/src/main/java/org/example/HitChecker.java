package org.example;

import org.example.request.Request;

public class HitChecker {

    /**
     * Вспомогательный метод для удобства вызова.
     */
    public static boolean checkHit(Request req) {
        return checkHit(req.x(), req.y(), req.r());
    }

    /**
     * Основной метод, проверяющий попадание точки в заданную область.
     *
     * @param x координата X точки
     * @param y координата Y точки
     * @param r текущий радиус R
     * @return true, если точка попадает в область, иначе false
     */
    public static boolean checkHit(double x, double y, double r) {
        if (x >= 0 && y >= 0) {
            return y <= -2 * x + r;
        }
        if (x < 0 && y >= 0) {
            return x >= -r / 2 && y <= r;
        }
        if (x <= 0 && y < 0) {
            // Используем r/2 для радиуса окружности
            return x * x + y * y <= (r / 2) * (r / 2);
        }
        return false;
    }
}