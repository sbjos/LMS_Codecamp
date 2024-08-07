//package com.codecamp.services;
//
//import com.codecamp.dto.AssignmentResponseDto;
//import com.codecamp.testhelper.TestAssignmentHelper;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.util.List;
//
//import static com.codecamp.testhelper.TestAssignmentHelper.*;
//
//@SpringBootTest
//public class AssignmentServiceTest {
//    private String token;
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Mock
//    AssignmentService assignmentService;
//
//
//    void setup() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void getAssignmentsByUser_ReturnsAssignments() {
//        // GIVEN
//        List<?> userAssignment = List.of(assignment2(), assignment3());
//
//        // WHEN
//        List<AssignmentResponseDto> result = assignmentService.getAssignmentsByUser(assignment2().getUser());
//
//        // THEN
//        Assertions.assertEquals(userAssignment, result);
//    }
//}
