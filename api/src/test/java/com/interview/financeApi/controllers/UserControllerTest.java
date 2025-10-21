package com.interview.financeApi.controllers;

import com.interview.financeApi.UserFactory;
import com.interview.financeApi.models.User;
import com.interview.financeApi.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {
    @Mock
    private UserService userService;

    private UserController userController;
    private UserFactory userFactory;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        userController = new UserController(userService);
        userFactory = new UserFactory();
    }

    @Test
    public void testCheckListUsersReturns200AndAListOfUsersIfUsersExist() {
        Integer userCount = 3;
        List<User> existingUsers = userFactory.createUsers(userCount);
        when(userService.findAll()).thenReturn(existingUsers);
        ResponseEntity<List<User>> loadAccountResponse = userController.listUsers();
        List<User> loadedUsers = loadAccountResponse.getBody();
        assertEquals(HttpStatus.OK, loadAccountResponse.getStatusCode());
        assertNotNull(loadedUsers);
        assertEquals(loadedUsers.size(), userCount);
    }

    @Test
    public void testCheckListUsersReturns200AndAnEmptyListIfNoUsersExist() {
        when(userService.findAll()).thenReturn(new ArrayList<>());
        ResponseEntity<List<User>> loadAccountResponse = userController.listUsers();
        List<User> loadedUsers = loadAccountResponse.getBody();
        assertEquals(HttpStatus.OK, loadAccountResponse.getStatusCode());
        assertNotNull(loadedUsers);
        assertEquals(loadedUsers.size(), 0);
    }

    @Test
    public void testCheckGetUserDetailsReturns200AndAUserAccountIfUserExists() {
        User existingUser = userFactory.createUser();
        Long existingAccountId = existingUser.getId();
        when(userService.findById(existingAccountId)).thenReturn(existingUser);
        ResponseEntity<User> loadAccountResponse = userController.getUserDetails(existingAccountId);
        User loadedUser = loadAccountResponse.getBody();
        assertEquals(HttpStatus.OK, loadAccountResponse.getStatusCode());
        assertNotNull(loadedUser);
        assertEquals(loadedUser.getId(), existingAccountId);
        assertEquals(loadedUser.getName(), existingUser.getName());
        assertEquals(loadedUser.getEmail(), existingUser.getEmail());
    }

    @Test
    public void testCheckGetUserDetailsReturns404AndNullIfUserDoesNotExists() {
        Long nonExistingAccountId = 2L;
        when(userService.findById(nonExistingAccountId)).thenReturn(null);
        ResponseEntity<User> loadAccountResponse = userController.getUserDetails(nonExistingAccountId);
        assertEquals(HttpStatus.NOT_FOUND, loadAccountResponse.getStatusCode());
        User loadedUser = loadAccountResponse.getBody();
        assertNull(loadedUser);
    }
}
