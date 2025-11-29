package com.langleague.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * JWT Filter for custom request processing.
 * Token validation is handled by Spring Security's oauth2ResourceServer configuration.
 */
public class JWTFilter extends OncePerRequestFilter {

    private static final List<String> PUBLIC_URLS = Arrays.asList(
        "/api/authenticate",
        "/api/register",
        "/api/activate",
        "/api/captcha",
        "/api/account/reset-password/init",
        "/api/account/reset-password/finish",
        "/api/auth/",
        "/api/oauth2/"
    );

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        // Skip filtering for all public URLs
        return PUBLIC_URLS.stream().anyMatch(url -> path.contains(url));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
        // Token validation is handled by Spring Security's oauth2ResourceServer
        // This filter can be extended for custom logic if needed

        filterChain.doFilter(request, response);
    }
}
