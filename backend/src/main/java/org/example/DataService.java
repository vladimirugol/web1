package org.example;

import org.example.request.Request;
import org.example.response.Response;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import static org.example.HitChecker.checkHit;

public class DataService {

    private static final DateTimeFormatter DTF = DateTimeFormatter.ofPattern("HH:mm:ss");



    public Response processData(Request request) {
        long startTime = System.nanoTime();

        boolean isHit = checkHit(request);


        String currentTime = LocalTime.now().format(DTF);

        Response response = new Response(
                request.x(),
                request.y(),
                request.r(),
                isHit,
                currentTime,
                System.nanoTime()-startTime
        );

        return response;
    }
}