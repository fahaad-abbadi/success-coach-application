package com.fahaadabbadi.silentedge.services.impl;

import com.fahaadabbadi.silentedge.dtos.*;
import com.fahaadabbadi.silentedge.enums.Role;
import com.fahaadabbadi.silentedge.exceptions.InvalidCredentialsException;
import com.fahaadabbadi.silentedge.exceptions.NotFoundException;
import com.fahaadabbadi.silentedge.models.User;
import com.fahaadabbadi.silentedge.repositories.UserRepository;
import com.fahaadabbadi.silentedge.security.JwtUtils;
import com.fahaadabbadi.silentedge.security.SecurityConfig;
import com.fahaadabbadi.silentedge.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final JwtUtils jwtUtils;

    @Override
    public Response registerUser(RegisterRequest registerRequest)
    {
        User userToSave = User.builder()
                .anonymousUserName(registerRequest.getAnonymousUserName())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(registerRequest.getRole() != null ? registerRequest.getRole() : Role.USER)
                .build();

        userRepository.save(userToSave);

        return Response.builder()
                .status(200)
                .message("User successfully registered")
                .build();
    }

    @Override
    public Response loginUser(LoginRequest loginRequest)
    {
        User user = userRepository.findByAnonymousUserName(loginRequest.getAnonymousUserName())
                .orElseThrow(() -> new NotFoundException("UserName Not Found"));

        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            throw new InvalidCredentialsException("Password does not match");
        }

        String token = jwtUtils.generateToken(user.getAnonymousUserName());

        return Response.builder()
                .status(200)
                .message("User Logged In Successfully")
                .role(user.getRole())
                .token(token)
                .expirationTime("6 Months")
                .build();
    }

    @Override
    public Response getAllUsers()
    {
        List<User> users = userRepository.findAll();

        List<UserDTO> userDTOS = users.stream()
                .map(user -> {
                    UserDTO userDTO = new UserDTO();
                    userDTO.setDisplayName(user.getAnonymousUserName());

                    return userDTO;
                }).toList();

        return Response.builder()
                .status(200)
                .message("Users fetched successfully")
                .users(userDTOS)
                .build();
    }

    @Override
    public Response getUserById(Long id)
    {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));

        UserDTO userDTO = modelMapper.map(user, UserDTO.class);

        return Response.builder()
                .status(200)
                .message("success")
                .user(userDTO)
                .build();
    }

    @Override
    public Response updateUser(Long id, UserDTO userDTO) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User Not Found"));

        if(userDTO.getAnonymousUserName() != null)   existingUser.setAnonymousUserName(userDTO.getAnonymousUserName());

        userRepository.save(existingUser);

        return Response.builder()
                .status(200)
                .message("User updated successfully")
                .build();
    }

    @Override
    public Response deleteUser(Long id) {
        userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User Not Found"));

        userRepository.deleteById(id);

        return Response.builder()
                .status(200)
                .message("User deleted successfully")
                .build();
    }

    @Override
    public Response getCurrentLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String userName = authentication.getName();
        User user = userRepository.findByAnonymousUserName(userName).orElseThrow(() -> new NotFoundException("User Not Found"));

        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
//        List<PostResponseDTO> postResponseDTOS = user.getPosts().stream()
//                .map(post -> modelMapper.map(post, PostResponseDTO.class))
//                .toList();
//
//        List<CommentResponseDTO> commentResponseDTOS = user.getComments().stream()
//                .map(comment -> modelMapper.map(comment, CommentResponseDTO.class))
//                .toList();

        return Response.builder()
                .status(200)
                .message("User profile fetched successfully")
                .user(userDTO)
//                .posts(postResponseDTOS)
//                .comments(commentResponseDTOS)
                .build();
    }
}
