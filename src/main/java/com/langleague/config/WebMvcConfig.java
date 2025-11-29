package com.langleague.config;

import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve the same directory where AccountResource stores uploaded avatars:
        // ${user.home}/.langleague/uploads/avatars
        Path uploadDir = Path.of(System.getProperty("user.home"), ".langleague", "uploads", "avatars");
        String uploadPath = uploadDir.toFile().getAbsolutePath() + "/";
        registry.addResourceHandler("/content/avatars/**").addResourceLocations("file:" + uploadPath);
    }
}
