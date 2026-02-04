package com.miniapp.authapp.service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.miniapp.authapp.dto.*;
import com.miniapp.authapp.entity.User;
import com.miniapp.authapp.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final TokenProvider tokenProvider;
    private final BCryptPasswordEncoder encoder;

    public AuthResponse registerUser(RegisterRequest req) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        User user = new User();
        user.setUserId(UUID.randomUUID().toString());
        user.setFullName(req.getName());
        user.setEmail(req.getEmail());
        user.setPasswordHash(encoder.encode(req.getPassword()));
        user.setCreatedAt(new Date());

        db.collection("users").document(req.getEmail()).set(user).get();
        return new AuthResponse("Registration successful!", null);
    }

    public AuthResponse authenticateUser(LoginRequest req) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        var doc = db.collection("users").document(req.getEmail()).get().get();

        if (!doc.exists() || !encoder.matches(req.getPassword(), doc.getString("passwordHash"))) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = tokenProvider.generateToken(req.getEmail());
        return new AuthResponse("Login successful!", token);
    }
}