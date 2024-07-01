package com.codecamp.assignmentservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.reactive.function.client.WebClient;

public class UserServiceApi {

    @Autowired
    private final WebClient webClient;

    public void userApi() {
        webClient.get("http://localhost:8081/api/user")
                .retrieve()
                .bodyToMono()
    }

}
