package com.fahaadabbadi.silentedge.services;

import com.fahaadabbadi.silentedge.dtos.CategoryDTO;
import com.fahaadabbadi.silentedge.dtos.Response;
import com.fahaadabbadi.silentedge.models.Category;

import java.util.List;

public interface CategoryService {
    Response createCategory(CategoryDTO categoryDTO);
    Response getAllCategories();
    Response getCategoryById(Long categoryId);
    Response getPostsByCategory(Long categoryId);
    Response deleteCategory(Long categoryId);
}
