package com.hcc.controllers;

import com.hcc.entities.User;
import com.hcc.testhelper.TestUserHelper;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthCredentialControllerTest {

    // test users
    private final User user1 = TestUserHelper.user1();

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    void setup() {}

    @Test
    void login_withValidCredentials_return_HttpStatus_OK() throws Exception {
        // GIVEN
        String content = "{\"username\":\"user1\",\"password\":\"password\"}";

        // WHEN - THEN
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content))
                .andExpect(header().exists("Authorization"))
                .andExpect(status().isOk());
    }

    @Test
    void login_withInvalidUsername_return_HttpStatus_UNAUTHORIZED() throws Exception {
        // GIVEN
        String content = "{\"username\":\"notexistant\",\"password\":\"password\"}";

        // WHEN - THEN
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void login_withInvalidPassword_return_HttpStatus_UNAUTHORIZED() throws Exception {
        // GIVEN
        String content = "{\"username\":\"user1\",\"password\":\"wrongpassword\"}";

        // WHEN - THEN
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content))
                .andExpect(status().isUnauthorized());
    }
}
