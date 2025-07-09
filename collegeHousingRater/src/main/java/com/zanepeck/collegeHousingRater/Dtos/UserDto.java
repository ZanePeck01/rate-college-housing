package com.zanepeck.collegeHousingRater.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

//DTO for User entity
//Used to transfer user data between layers of the application
@AllArgsConstructor
@Getter
@Setter
public class UserDto {

    private Long id;
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private String college;

}
