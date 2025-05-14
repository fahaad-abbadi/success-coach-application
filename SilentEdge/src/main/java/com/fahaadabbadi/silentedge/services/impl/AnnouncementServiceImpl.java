package com.fahaadabbadi.silentedge.services.impl;

import com.fahaadabbadi.silentedge.dtos.AnnouncementRequestDTO;
import com.fahaadabbadi.silentedge.dtos.AnnouncementResponseDTO;
import com.fahaadabbadi.silentedge.dtos.PostResponseDTO;
import com.fahaadabbadi.silentedge.dtos.Response;
import com.fahaadabbadi.silentedge.models.Announcement;
import com.fahaadabbadi.silentedge.models.Post;
import com.fahaadabbadi.silentedge.repositories.AnnouncementRepository;
import com.fahaadabbadi.silentedge.services.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {
    private final ModelMapper modelMapper;
    private final AnnouncementRepository announcementRepository;

    @Override
    public Response createAnnouncement(AnnouncementRequestDTO announcementRequestDTO) {
        Announcement announcementToSave = modelMapper.map(announcementRequestDTO, Announcement.class);

        String content = announcementRequestDTO.getContent();
        if (content == null || content.trim().isEmpty()) {
            throw new IllegalArgumentException("Announcement content cannot be empty");
        }

        announcementToSave.setContent(content);
        announcementToSave.setCreatedAt(announcementRequestDTO.getCreatedAt());
        announcementToSave.setCreatedAt(LocalDateTime.now());

        announcementRepository.save(announcementToSave);

        return Response.builder()
                .status(200)
                .message("Announcement created successfully")
                .build();
    }

    @Override
    public Response getLatestAnnouncement() {
        Announcement announcement = announcementRepository.findTopByOrderByCreatedAtDesc()
                .orElse(null);  // If none found, we can return null

        AnnouncementResponseDTO announcementResponseDTO = modelMapper.map(announcement, AnnouncementResponseDTO.class);

        return Response.builder()
                .status(200)
                .message("Latest announcement fetched")
                .announcement(announcementResponseDTO) // Suppose 'announcement' field in your Response class
                .build();
    }

    @Override
    public Response getAllAnnouncements() {
        List<Announcement> allAnnouncements = announcementRepository.findAll(); // Or sort by createdAt desc
        List<AnnouncementResponseDTO> announcementResponseDTO = modelMapper.map(allAnnouncements, new TypeToken<List<AnnouncementResponseDTO>>() {}.getType());

        return Response.builder()
                .status(200)
                .message("All announcements fetched")
                .announcements(announcementResponseDTO)
                .build();
    }
}
