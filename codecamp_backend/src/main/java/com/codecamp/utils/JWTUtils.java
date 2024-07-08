package com.codecamp.utils;

import com.codecamp.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.*;
import java.util.Date;
import java.util.function.Function;

@Component
public class JWTUtils implements Serializable {
    public static final long JWT_TOKEN_VALIDITY = 12 * 60 * 60;

    @Value("${jwt.secret}")
    private String secret;

    /**
     * Gets a username from a token claim.
     * @param token jwt token
     * @return the subject value.
     */
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    /**
     * Gets the date a token was issued.
     * @param token jwt token
     * @return the subject value.
     */
    public Date getIssuedAtDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getIssuedAt);
    }

    /**
     * Get the claims (not sure which datatype- make generic to pass the claim) from token-objects inside jwt.
     * @param token jwt token
     * @param claimsResolver claim resolver
     * @return token claim
     * @param <T> Unknown Data type.
     */
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver ) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Checks the expiration date of a token.
     * @param token jwt token
     * @return expiration date of a token.
     */
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    /**
     * gets all the claims from a token.
     * @param token jwt token
     * @return all claims from a token.
     */
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret))).build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Verifies if the token is expired based on the results from getExpirationDateFromToken().
     * @param token jwt token
     * @return Boolean value if the token is expired or not.
     */
    public boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    /**
     * Generates a token.
     * @param user user
     * @return a JWTs generated version of a token.
     */
    public String generateToken(UserDetails user) {
        return doGenerateToken(user);
    }

    private String doGenerateToken(UserDetails subject) {
        return Jwts.builder()
                .claims().add(Map.of("scopes", List.of(new SimpleGrantedAuthority(subject.getAuthorities().toString())))).and()
                .subject(subject.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret)))
                .compact();
    }

    /**
     * Checks the validity of a token
     * @param token jwt token
     * @param userDetails UserDetails service
     * @return a boolean value of if the token is expired for a user.
     */
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}