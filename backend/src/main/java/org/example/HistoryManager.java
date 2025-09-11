package org.example;

import org.example.response.Response;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedDeque;

public class HistoryManager {
    private final ConcurrentLinkedDeque<Response> resultsHistory = new ConcurrentLinkedDeque<>();

    public void addResult(Response response) {
        resultsHistory.addFirst(response);
    }

    public List<Response> getHistory() {
        return new ArrayList<>(resultsHistory);
    }
}
