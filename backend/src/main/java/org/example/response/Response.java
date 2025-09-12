package org.example.response;

public record Response(long x, long y, long r, boolean hit, String currentTime, long execMs) {
}
