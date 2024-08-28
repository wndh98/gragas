package com.green.gragas.subscribe.service;

import com.green.gragas.subscribe.mapper.SubscribePMMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class SubscribePMServiceImpl implements SubscribePMService{
    @Autowired
    private SubscribePMMapper spmm;
    public String createVirtualAccount() throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.tosspayments.com/v1/virtual-accounts"))
                .header("Authorization", "Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==")
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString("{\"amount\":15000,\"orderId\":\"B5Ex4dK4_OLQxy_VWD0ya\",\"orderName\":\"토스 티셔츠 외 2건\",\"customerName\":\"박토스\",\"bank\":\"20\"}"))
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }
}
