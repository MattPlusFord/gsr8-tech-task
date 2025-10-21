package com.interview.financeApi.services;

import com.interview.financeApi.factories.UserFactory;
import com.interview.financeApi.models.User;
import com.interview.financeApi.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTests {

    @Mock
    private UserRepository userRepository;

    private UserService userService;

    private final UserFactory userFactory = new UserFactory();

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        userService = new UserService(userRepository);
    }

    @Test
    public void testCheckFindAllReturnsAListOfUsers() {
        Integer expectedUserCount = 3;
        when(userRepository.findAll()).thenReturn(userFactory.createUsers(expectedUserCount));
        List<User> returnedUsers = userService.findAll();
        assertEquals(returnedUsers.size(), expectedUserCount);
    }

    @Test
    public void testCheckFindByIdReturnsAUserAccountIfAccountExists() {
        Long existingAccountId = 1L;
        String username = "David Rose";
        String email = "david.rose@ford.com";
        Optional<User> existingUserAccount = Optional.of(userFactory.createUser(existingAccountId, username, email));
        when(userRepository.findById(existingAccountId)).thenReturn(existingUserAccount);
        User foundUser = userService.findById(existingAccountId);
        assertEquals(foundUser.getId(), existingAccountId);
        assertEquals(foundUser.getName(), username);
        assertEquals(foundUser.getEmail(), email);
    }

    @Test
    public void testCheckFindByIdReturnsNullIfAccountDoesNotExists() {
        Optional<User> missingUserAccount = Optional.empty();
        Long nonExistingAccountId = 2L;
        when(userRepository.findById(nonExistingAccountId)).thenReturn(missingUserAccount);
        User foundUser = userService.findById(nonExistingAccountId);
        assertNull(foundUser);
    }
}