package com.hcc.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hcc.entities.Assignment;
import org.junit.jupiter.api.*;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class AssignmentControllerTest {

    private String token;

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    void setup() throws Exception {
        MockitoAnnotations.openMocks(this);

        MockHttpServletResponse response = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user1\",\"password\":\"password\"}"))
                .andReturn().getResponse();

        token = response.getHeader("Authorization");
    }

    @Test
    void getAssignmentsByUser_ReturnsAssignments() throws Exception {
        // WHEN - THEN
        mockMvc.perform(get("/api/assignments/")
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void getAssignmentById_WithValidId_ReturnsAssignment() throws Exception {
        // GIVEN
        Long validAssignmentId = 1L;

        // WHEN - THEN
        mockMvc.perform(get("/api/assignments/{id}", validAssignmentId)
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void getAssignmentById_InvalidId_ReturnsNotFound() throws Exception {
        // GIVEN
        Long invalidAssignmentId = 44L;

        // WHEN - THEN
        mockMvc.perform(get("/api/assignments/{id}", invalidAssignmentId)
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    void UpdateAssignmentById_WithValidId_ReturnsUpdatedAssignment() throws Exception {
        // GIVEN
        Long validAssignmentId = 2L;

        Assignment assignment = new Assignment();
        assignment.setStatus("in progress");
        assignment.setGithubUrl("https://GithubUrl.com/change");
        assignment.setBranch("https://GithubUrl.com/branch/main1");
        assignment.setReviewVideoUrl("https://VideoUrl.com/myVideo");

        String assignmentToString = new ObjectMapper().writeValueAsString(assignment);

        // WHEN - THEN
        mockMvc.perform(put("/api/assignments/{id}", validAssignmentId)
                        .header("Authorization", token)
                        .content(assignmentToString)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

//    @Test
//    void createAssignment() throws Exception {
//        // GIVEN
//        Assignment assignment = new Assignment();
//        assignment.setId(4L);
//        assignment.setNumber(5);
//        assignment.setStatus("in progress");
//        assignment.setGithubUrl("https://GithubUrl.com");
//        assignment.setBranch("https://GithubUrl.com/branch");
//        assignment.setReviewVideoUrl("https://VideoUrl.com");
//        assignment.setUser(TestUserHelper.user1());
//        assignment.setCodeReviewer(TestUserHelper.reviewer1());
//
//        String assignmentToString = new ObjectMapper().writeValueAsString(assignment);
//
//        // WHEN - THEN
//        mockMvc.perform(post("/api/assignments/")
//                        .header("Authorization", token)
//                        .content(assignmentToString)
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isCreated());
//    }
}
