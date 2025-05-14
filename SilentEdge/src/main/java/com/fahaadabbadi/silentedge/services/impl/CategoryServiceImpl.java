package com.fahaadabbadi.silentedge.services.impl;

import com.fahaadabbadi.silentedge.dtos.CategoryDTO;
import com.fahaadabbadi.silentedge.dtos.PostResponseDTO;
import com.fahaadabbadi.silentedge.dtos.Response;
import com.fahaadabbadi.silentedge.exceptions.NotFoundException;
import com.fahaadabbadi.silentedge.models.Category;
import com.fahaadabbadi.silentedge.models.Post;
import com.fahaadabbadi.silentedge.repositories.CategoryRepository;
import com.fahaadabbadi.silentedge.repositories.PostRepository;
import com.fahaadabbadi.silentedge.services.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final PostRepository postRepository;
    private final ModelMapper modelMapper;

    @Override
    public Response createCategory(CategoryDTO categoryDTO) {
        Category categoryToSave = modelMapper.map(categoryDTO, Category.class);
        categoryRepository.save(categoryToSave);
        return Response.builder()
                .status(200)
                .message("Category created successfully")
                .build();
    }

    @Override
    public Response getAllCategories() {
        List<Category> categories = categoryRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        List<CategoryDTO> categoryDTOList = modelMapper.map(categories, new TypeToken<List<CategoryDTO>>() {}.getType());
        return Response.builder()
                .status(200)
                .message("Categories retrieved successfully")
                .categories(categoryDTOList)
                .build();
    }

    @Override
    public Response getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Category not found"));
        CategoryDTO categoryDTO = modelMapper.map(category, CategoryDTO.class);
        return Response.builder()
                .status(200)
                .message("Category retrieved successfully")
                .category(categoryDTO)
                .build();
    }

    @Override
    public Response getPostsByCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NotFoundException("Category not found"));

        List<Post> posts = postRepository.findByCategory_Id(categoryId);
        List<PostResponseDTO> postDTOs = modelMapper.map(posts, new TypeToken<List<PostResponseDTO>>() {}.getType());

        return Response.builder()
                .status(200)
                .message("Posts retrieved successfully for category: " + category.getName())
                .posts(postDTOs)
                .build();
    }

    @Override
    public Response deleteCategory(Long categoryId) {
        //Find the category to be deleted
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NotFoundException("Category Not Found"));

        //Check if it's the 'uncategorized' category
        if(category.getName().equals("Uncategorized"))
        {
            throw new IllegalArgumentException("Cannot delete the uncategorized category");
        }

        // Find the "uncategorized" category
        Category uncategorizedCategory = categoryRepository.findByName("Uncategorized");
        if(uncategorizedCategory == null)
        {
            throw new RuntimeException("Uncategorized category does not exist");
        }

        //set category_id to null
        List<Post> postsInCategory = postRepository.findByCategory_Id(categoryId);
        for(Post post: postsInCategory)
        {
            post.setCategory(uncategorizedCategory);
            postRepository.save(post);
        }

        //Now delete the category
        categoryRepository.deleteById(categoryId);

        return Response.builder()
                .status(200)
                .message("Category deleted successfully")
                .build();
    }
}