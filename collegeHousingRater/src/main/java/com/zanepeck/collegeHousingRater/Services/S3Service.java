package com.zanepeck.collegeHousingRater.Services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

// Service for handling AWS S3 file uploads (for my images)
@Service
public class S3Service {

    private final S3Client s3Client;

    private final String bucketName;

    // Constructor to initialize S3 client and bucket name
    public S3Service(@Value("${aws.s3.bucket-name}") String bucketName,
            @Value("${aws.region}") String region) {
        this.bucketName = bucketName;
        // Build and configure the S3 client
        this.s3Client = S3Client.builder()
                .region(Region.of(region))
                .build();
    }

    // Upload file to S3 and returns its public URL
    public String uploadFile(MultipartFile file, String folder) throws IOException {
        // Generate unique filename
        String fileName = folder + "/" + UUID.randomUUID() + "-" + file.getOriginalFilename();

        // Create the S3 upload request with bucket name, file key (path), and content
        // type
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .contentType(file.getContentType())
                .build();

        // Upload the file to S3 by converting to bytes
        s3Client.putObject(putObjectRequest,
                RequestBody.fromBytes(file.getBytes()));

        // Return the public URL where the file can be accessed
        return String.format("https://%s.s3.amazonaws.com/%s", bucketName, fileName);
    }

    // Generate public URL for an existing file in S3
    public String getImageUrl(String fileName) {
        return String.format("https://%s.s3.amazonaws.com/%s", bucketName, fileName);
    }

    // Get full URL from a given path
    public String getFullUrl(String path) {
        if (path == null || path.isEmpty()) {
            return null;
        }
        // If already a full URL, return as-is
        if (path.startsWith("http")) {
            return path;
        }
        // Otherwise, construct the full S3 URL
        return String.format("https://%s.s3.amazonaws.com/%s", bucketName, path);
    }
}