package com.codecamp.services;

import com.codecamp.entities.User;
import com.codecamp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Loads the user by username.
     * @param username the username identifying the user whose data is required.
     * @return userDetails.
     * @throws UsernameNotFoundException if user is not found.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(
                        () -> new UsernameNotFoundException(String.format("user %s not found.", username))
        );
    }

    /**
     * Creates a user
     * @param user the user information to create the new user
     */
    public void createUser(@RequestBody User user) {
        user.setEncodedPassword(user.getPassword());
        userRepository.save(user);
    }
}
