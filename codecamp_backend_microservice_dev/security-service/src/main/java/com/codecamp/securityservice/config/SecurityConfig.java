//package com.codecamp.securityservice.config;
//
//
//import com.codecamp.securityservice.filters.JWTFilter;
//import com.codecamp.securityservice.utils.CustomPasswordEncoder;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.BeanIds;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Autowired
//    UserDetailServiceImpl userDetailServiceImpl;
//
//    @Autowired
//    CustomPasswordEncoder customPasswordEncoder;
//
//    @Autowired
//    JWTFilter jwtFilter;
//
////    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
////    public AuthenticationManager authenticationManagerBean() throws Exception {
////        return super.authenticationManagerBean();
////    }
//
//    @Bean
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userDetailServiceImpl)
//                .passwordEncoder(customPasswordEncoder.getPasswordEncoder());
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.csrf(crossSite -> crossSite.disable()); // Disabled for testing purposes.
//
//        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//
//        http.exceptionHandling(handling -> handling.authenticationEntryPoint((request, response, exception) ->
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, exception.getMessage())));
//
//        http.authorizeHttpRequests(requests -> requests
//                .requestMatchers("/api/auth/**").permitAll()
////                .requestMatchers("/api/user/**").hasAuthority("ADMIN")
//                .requestMatchers("/api/user/**").permitAll()
//                .anyRequest().authenticated());
//
//        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
//}
//
//
