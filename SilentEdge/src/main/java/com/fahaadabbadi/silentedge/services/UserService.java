package com.fahaadabbadi.silentedge.services;

import com.fahaadabbadi.silentedge.dtos.LoginRequest;
import com.fahaadabbadi.silentedge.dtos.RegisterRequest;
import com.fahaadabbadi.silentedge.dtos.Response;
import com.fahaadabbadi.silentedge.dtos.UserDTO;
import com.fahaadabbadi.silentedge.models.User;

public interface UserService {
    Response registerUser(RegisterRequest registerRequest);
    Response loginUser(LoginRequest loginRequest);
    Response getAllUsers();
    Response getUserById(Long id);
    Response updateUser(Long id, UserDTO userDTO);
    Response deleteUser(Long id);
    Response getCurrentLoggedInUser();
}
