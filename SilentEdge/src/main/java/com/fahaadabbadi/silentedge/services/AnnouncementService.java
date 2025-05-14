package com.fahaadabbadi.silentedge.services;


import com.fahaadabbadi.silentedge.dtos.AnnouncementRequestDTO;
import com.fahaadabbadi.silentedge.dtos.Response;

public interface AnnouncementService {
    Response createAnnouncement(AnnouncementRequestDTO announcementRequestDTO);
    Response getLatestAnnouncement();
    Response getAllAnnouncements();
}
