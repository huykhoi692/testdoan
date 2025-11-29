package com.langleague.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Langleague.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 * See {@link tech.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private String baseUrl = "http://localhost:8080";

    private final Liquibase liquibase = new Liquibase();
    private final OAuth2 oauth2 = new OAuth2();

    // jhipster-needle-application-properties-property
    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) { // ✅ Thêm setter
        this.baseUrl = baseUrl;
    }

    public Liquibase getLiquibase() {
        return liquibase;
    }

    public OAuth2 getOauth2() {
        return oauth2;
    }

    // jhipster-needle-application-properties-property-getter

    public static class Liquibase {

        private Boolean asyncStart = true;

        public Boolean getAsyncStart() {
            return asyncStart;
        }

        public void setAsyncStart(Boolean asyncStart) {
            this.asyncStart = asyncStart;
        }
    }

    public static class OAuth2 {

        private String frontendUrl = "http://localhost:9000";

        public String getFrontendUrl() {
            return frontendUrl;
        }

        public void setFrontendUrl(String frontendUrl) {
            this.frontendUrl = frontendUrl;
        }
    }
    // jhipster-needle-application-properties-property-class
}
