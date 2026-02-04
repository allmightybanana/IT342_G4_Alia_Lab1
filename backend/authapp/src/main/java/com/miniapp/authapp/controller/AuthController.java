package com.miniapp.authapp.controller;

import com.miniapp.authapp.dto.*;
import com.miniapp.authapp.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
    private final AuthService service;

    @PostMapping("/register") // [cite: 156]
    public AuthResponse register(@RequestBody RegisterRequest req) throws Exception {
        return service.registerUser(req);
    }

    @PostMapping("/login") // [cite: 156]
    public AuthResponse login(@RequestBody LoginRequest req) throws Exception {
        return service.authenticateUser(req);
    }

    @PostMapping("/logout") // [cite: 156, 182]
    public AuthResponse logout() {
        return new AuthResponse("Logout successful!", null);
    }
}