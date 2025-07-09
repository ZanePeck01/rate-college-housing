package com.zanepeck.collegeHousingRater.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zanepeck.collegeHousingRater.Dtos.UserDto;
import com.zanepeck.collegeHousingRater.Mappers.UserMapper;
import com.zanepeck.collegeHousingRater.Repositories.UserRepository;

import lombok.AllArgsConstructor;

//Controller for managing users
//Handles requests related to user operations such as creating, updating, deleting, and retrieving users
@RestController
@AllArgsConstructor
@RequestMapping("/{userName}")
public class UserController {
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    // @GetMapping("/users")
    // public List<UserDto> getAllUsers() {
    //     return userRepository.findAll().stream()
    //             .map(userMapper::toDto)
    //             .toList();
    // }

    @GetMapping
    public List<UserDto> getUserByUsername(@PathVariable String userName) {
        return userRepository.findByUsername(userName).stream()
                .map(userMapper::toDto)
                .toList();
    }

    @PostMapping
    public UserDto createUser(UserDto userDto) {
        return userMapper.toDto(userRepository.save(userMapper.toEntity(userDto)));
    }

    @PutMapping
    public UserDto updateUser(UserDto userDto) {
        return userMapper.toDto(userRepository.save(userMapper.toEntity(userDto)));
    }

    @DeleteMapping
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

}
