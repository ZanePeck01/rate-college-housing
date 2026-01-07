package com.zanepeck.collegeHousingRater.Controllers;

import com.zanepeck.collegeHousingRater.Services.S3Service;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@AllArgsConstructor
@RequestMapping("/api/images")

// Controller for handling image upload requests
public class ImageController {

    private final S3Service s3Service;

    // Endpoint to upload an image to S3
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("folder") String folder) {
        try {
            String imageUrl = s3Service.uploadFile(file, folder);
            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Failed to upload image: " + e.getMessage());
        }
    }
}