package com.codecamp.assignmentservice.userapi.service;

import com.codecamp.assignmentservice.dto.UserResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@Transactional
public class UserService {

    @Autowired
    private final WebClient.Builder webclientBuilder;

    public UserService(WebClient.Builder webclientBuilder) {
        this.webclientBuilder = webclientBuilder;
    }

    public Mono<UserResponseDto> getUserByUsername(String username) {
        return webclientBuilder.build().get()
                .uri("http://localhost:8081/api/user/{username}", username)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(UserResponseDto.class);
    }
}
