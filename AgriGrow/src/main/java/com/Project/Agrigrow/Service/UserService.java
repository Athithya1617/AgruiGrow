package com.Project.Agrigrow.Service;

import com.Project.Agrigrow.Entity.User;
import com.Project.Agrigrow.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("Email is already registered.");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User update(User user) {
        User existing = userRepository.findByEmail(user.getEmail());
        if (existing == null) {
            throw new IllegalArgumentException("User not found.");
        }
        existing.setName(user.getName());
        existing.setPhone(user.getPhone());
        existing.setLocation(user.getLocation());
        existing.setFarmSize(user.getFarmSize());
        existing.setUnit(user.getUnit());
        existing.setCropPreferences(user.getCropPreferences());
        
        // If password is changed/provided, re-encode it
        if (user.getPassword() != null && !user.getPassword().isEmpty() && !user.getPassword().equals(existing.getPassword())) {
            existing.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        
        return userRepository.save(existing);
    }
}
