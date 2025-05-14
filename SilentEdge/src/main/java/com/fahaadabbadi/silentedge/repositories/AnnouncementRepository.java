package com.fahaadabbadi.silentedge.repositories;

import com.fahaadabbadi.silentedge.models.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

    // Fetch the latest announcement (by createdAt desc)
    // Depending on your SQL dialect, you can do something like:
    Optional<Announcement> findTopByOrderByCreatedAtDesc();
}
