package com.miniapp.authapp.entity;

import lombok.Data;
import java.util.Date;

@Data
public class User {
    private String userId;
    private String email;
    private String passwordHash;
    private String fullName;
    private Date createdAt;
}