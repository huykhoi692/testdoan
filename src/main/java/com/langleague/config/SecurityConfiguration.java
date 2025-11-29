package com.langleague.config;

import static org.springframework.security.config.Customizer.withDefaults;

import com.langleague.security.*;
import com.langleague.security.OAuth2AuthenticationSuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer.FrameOptionsConfig;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;
import tech.jhipster.config.JHipsterProperties;

@Configuration
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfiguration {

    private final JHipsterProperties jHipsterProperties;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    public SecurityConfiguration(
        JHipsterProperties jHipsterProperties,
        CustomOAuth2UserService customOAuth2UserService,
        OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler
    ) {
        this.jHipsterProperties = jHipsterProperties;
        this.customOAuth2UserService = customOAuth2UserService;
        this.oAuth2AuthenticationSuccessHandler = oAuth2AuthenticationSuccessHandler;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, MvcRequestMatcher.Builder mvc) throws Exception {
        http
            // Enable CORS
            .cors(withDefaults())
            // Disable CSRF (API + JWT không cần CSRF)
            .csrf(csrf -> csrf.disable())
            // JWT filter (optional, validation is done by oauth2ResourceServer)
            .addFilterBefore(new JWTFilter(), BasicAuthenticationFilter.class)
            // Security headers
            .headers(headers ->
                headers
                    .contentSecurityPolicy(csp -> csp.policyDirectives(jHipsterProperties.getSecurity().getContentSecurityPolicy()))
                    .frameOptions(FrameOptionsConfig::sameOrigin)
                    .referrerPolicy(referrer -> referrer.policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN))
            )
            // URL authorization
            .authorizeHttpRequests(authz ->
                authz
                    // Static resources
                    .requestMatchers(
                        mvc.pattern("/index.html"),
                        mvc.pattern("/*.js"),
                        mvc.pattern("/*.txt"),
                        mvc.pattern("/*.json"),
                        mvc.pattern("/*.map"),
                        mvc.pattern("/*.css")
                    )
                    .permitAll()
                    .requestMatchers(mvc.pattern("/*.ico"), mvc.pattern("/*.png"), mvc.pattern("/*.svg"), mvc.pattern("/*.webapp"))
                    .permitAll()
                    .requestMatchers(mvc.pattern("/app/**"), mvc.pattern("/i18n/**"), mvc.pattern("/content/**"))
                    .permitAll()
                    .requestMatchers(mvc.pattern("/swagger-ui/**"), mvc.pattern("/v3/api-docs/**"))
                    .permitAll()
                    // Management endpoints - health check public
                    .requestMatchers(mvc.pattern("/management/health/**"))
                    .permitAll()
                    .requestMatchers(mvc.pattern("/management/info"))
                    .permitAll()
                    // Public APIs
                    .requestMatchers(mvc.pattern(HttpMethod.POST, "/api/authenticate"))
                    .permitAll()
                    .requestMatchers(mvc.pattern(HttpMethod.GET, "/api/authenticate"))
                    .permitAll()
                    .requestMatchers(mvc.pattern("/api/register"))
                    .permitAll()
                    .requestMatchers(mvc.pattern("/api/captcha"))
                    .permitAll()
                    .requestMatchers(mvc.pattern("/api/captcha/**"))
                    .permitAll()
                    .requestMatchers(mvc.pattern("/api/activate"))
                    .permitAll()
                    .requestMatchers(mvc.pattern("/api/account/reset-password/init"))
                    .permitAll()
                    .requestMatchers(mvc.pattern("/api/account/reset-password/finish"))
                    .permitAll()
                    .requestMatchers(mvc.pattern("/api/auth/**"))
                    .permitAll()
                    .requestMatchers(mvc.pattern("/api/oauth2/**"))
                    .permitAll()
                    // ============================================================
                    // ROLE-BASED AUTHORIZATION
                    // ADMIN: Full access to everything
                    // STAFF: Manage all resources except users
                    // USER: Read-only access
                    // ============================================================

                    // User Management - ADMIN ONLY
                    .requestMatchers(mvc.pattern("/api/admin/**"))
                    .hasRole("ADMIN")
                    .requestMatchers(mvc.pattern("/api/users"))
                    .hasRole("ADMIN")
                    .requestMatchers(mvc.pattern("/api/users/**"))
                    .hasRole("ADMIN")
                    .requestMatchers(mvc.pattern("/api/authorities"))
                    .hasRole("ADMIN")
                    .requestMatchers(mvc.pattern("/api/authorities/**"))
                    .hasRole("ADMIN")
                    // Account Management - Users can manage their own account
                    .requestMatchers(mvc.pattern(HttpMethod.GET, "/api/account"))
                    .authenticated()
                    .requestMatchers(mvc.pattern(HttpMethod.POST, "/api/account"))
                    .authenticated()
                    .requestMatchers(mvc.pattern(HttpMethod.PUT, "/api/account"))
                    .authenticated()
                    .requestMatchers(mvc.pattern("/api/account/change-password"))
                    .authenticated()
                    // Write Operations (POST, PUT, DELETE, PATCH) - ADMIN & STAFF only
                    .requestMatchers(mvc.pattern(HttpMethod.POST, "/api/**"))
                    .hasAnyRole("ADMIN", "STAFF")
                    .requestMatchers(mvc.pattern(HttpMethod.PUT, "/api/**"))
                    .hasAnyRole("ADMIN", "STAFF")
                    .requestMatchers(mvc.pattern(HttpMethod.DELETE, "/api/**"))
                    .hasAnyRole("ADMIN", "STAFF")
                    .requestMatchers(mvc.pattern(HttpMethod.PATCH, "/api/**"))
                    .hasAnyRole("ADMIN", "STAFF")
                    // Read Operations (GET) - All authenticated users (ADMIN, STAFF, USER)
                    .requestMatchers(mvc.pattern(HttpMethod.GET, "/api/**"))
                    .authenticated()
                    // Default - require authentication
                    .anyRequest()
                    .authenticated()
            )
            // Stateless session
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // Exception handling for JWT
            .exceptionHandling(exceptions ->
                exceptions
                    .authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint())
                    .accessDeniedHandler(new BearerTokenAccessDeniedHandler())
            )
            // OAuth2 login configuration
            .oauth2Login(oauth2 ->
                oauth2
                    .userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService))
                    .successHandler(oAuth2AuthenticationSuccessHandler)
            )
            // JWT Resource Server - jwtDecoder bean is provided by SecurityJwtConfiguration
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(withDefaults()));

        return http.build();
    }

    @Bean
    MvcRequestMatcher.Builder mvc(HandlerMappingIntrospector introspector) {
        return new MvcRequestMatcher.Builder(introspector);
    }
}
