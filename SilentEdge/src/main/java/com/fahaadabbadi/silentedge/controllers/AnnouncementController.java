package com.fahaadabbadi.silentedge.controllers;

import com.fahaadabbadi.silentedge.dtos.AnnouncementRequestDTO;
import com.fahaadabbadi.silentedge.dtos.Response;
import com.fahaadabbadi.silentedge.services.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;

    // Create a new announcement
    @PostMapping("/admin/announcements")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> createAnnouncement(@RequestBody AnnouncementRequestDTO announcementRequestDTO) {
        return ResponseEntity.ok(announcementService.createAnnouncement(announcementRequestDTO));
    }

    // Get the latest announcement
    @GetMapping("/announcements/latest")
    public ResponseEntity<Response> getLatestAnnouncement() {
        return ResponseEntity.ok(announcementService.getLatestAnnouncement());
    }

    // Get all announcements
    @GetMapping("/announcements")
    public ResponseEntity<Response> getAllAnnouncements() {
        return ResponseEntity.ok(announcementService.getAllAnnouncements());
    }
}

