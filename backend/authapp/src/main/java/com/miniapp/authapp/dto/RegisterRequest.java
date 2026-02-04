package com.miniapp.authapp.dto;
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
}
