package com.langleague.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Utility class for JWT testing.
 * Provides methods to generate, validate, and extract information from JWT tokens.
 */
public class JwtTestUtility {

    private final Key key;
    private final long tokenValidityInMilliseconds;

    public JwtTestUtility(String base64Secret, long tokenValidityInSeconds) {
        byte[] keyBytes = Base64.getDecoder().decode(base64Secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.tokenValidityInMilliseconds = tokenValidityInSeconds * 1000;
    }

    /**
     * Generate a test JWT token with default authorities.
     */
    public String generateTestToken(String username) {
        return generateTestToken(username, new String[] { "ROLE_USER" });
    }

    /**
     * Generate a test JWT token with specified authorities.
     */
    public String generateTestToken(String username, String[] authorities) {
        long now = System.currentTimeMillis();
        Date validity = new Date(now + this.tokenValidityInMilliseconds);

        Map<String, Object> claims = new HashMap<>();
        claims.put("auth", String.join(",", authorities));

        return Jwts.builder()
            .setSubject(username)
            .addClaims(claims)
            .setIssuedAt(new Date(now))
            .setExpiration(validity)
            .signWith(key, SignatureAlgorithm.HS512)
            .compact();
    }

    /**
     * Generate an expired token for testing.
     */
    public String generateExpiredToken(String username) {
        long now = System.currentTimeMillis();
        Date expiredDate = new Date(now - 1000); // Expired 1 second ago

        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date(now - 2000))
            .setExpiration(expiredDate)
            .signWith(key, SignatureAlgorithm.HS512)
            .compact();
    }

    /**
     * Validate a JWT token.
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Extract username from token.
     */
    public String getUsernameFromToken(String token) {
        Claims claims = getAllClaimsFromToken(token);
        return claims.getSubject();
    }

    /**
     * Check if token is expired.
     */
    public boolean isTokenExpired(String token) {
        try {
            Date expiration = getExpirationDateFromToken(token);
            return expiration.before(new Date());
        } catch (Exception e) {
            return true;
        }
    }

    /**
     * Get expiration date from token.
     */
    public Date getExpirationDateFromToken(String token) {
        Claims claims = getAllClaimsFromToken(token);
        return claims.getExpiration();
    }

    /**
     * Extract all claims from token.
     */
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }

    /**
     * Run a comprehensive test suite.
     */
    public boolean runComprehensiveTest() {
        try {
            // Test 1: Generate token
            String token = generateTestToken("testuser");
            if (token == null || token.isEmpty()) {
                System.out.println("✗ Failed: Token generation");
                return false;
            }

            // Test 2: Validate token
            if (!validateToken(token)) {
                System.out.println("✗ Failed: Token validation");
                return false;
            }

            // Test 3: Extract username
            String username = getUsernameFromToken(token);
            if (!"testuser".equals(username)) {
                System.out.println("✗ Failed: Username extraction");
                return false;
            }

            // Test 4: Check expiration
            if (isTokenExpired(token)) {
                System.out.println("✗ Failed: Token should not be expired");
                return false;
            }

            // Test 5: Validate expired token
            String expiredToken = generateExpiredToken("testuser");
            if (validateToken(expiredToken)) {
                System.out.println("✗ Failed: Expired token should be invalid");
                return false;
            }

            // Test 6: Token with multiple authorities
            String adminToken = generateTestToken("admin", new String[] { "ROLE_USER", "ROLE_ADMIN" });
            if (!validateToken(adminToken)) {
                System.out.println("✗ Failed: Admin token validation");
                return false;
            }

            System.out.println("✓ All comprehensive tests passed");
            return true;
        } catch (Exception e) {
            System.out.println("✗ Failed with exception: " + e.getMessage());
            return false;
        }
    }
}
