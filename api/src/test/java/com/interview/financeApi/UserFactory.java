package com.interview.financeApi;

import com.interview.financeApi.models.User;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@NoArgsConstructor
public class UserFactory {
    public static User createUser(@Nullable Long id, @Nullable String firstName, @Nullable String lastName) {
        return new User(id == null ? 1L : id,
                firstName == null ? "Stan" : firstName,
                lastName == null ? "Smith" : lastName);
    }

    public static List<User> createUsers(Integer numberRequired) {
        List<User> users = new ArrayList<>();
        Long nextId = 1L;
        for (int i = 0; i < numberRequired; i++) {
            byte[] array = new byte[7]; // length is bounded by 7
            new Random().nextBytes(array);
            String name = new String(array, StandardCharsets.UTF_8) + "Smith";
            String email = name.toLowerCase().replace(" ", ".") + "@gmail.com";
            users.add(new User(nextId, name, email));
            nextId++;
        }
        return users;
    }
}
