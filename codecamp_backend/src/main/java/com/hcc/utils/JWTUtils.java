package com.hcc.utils;

import com.hcc.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

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

    //how long is the token valid? a whole day
    public static final long JWT_TOKEN_VALIDITY = 5 * 24 * 60 * 60;

    // get the jwt secret from the properties file
    @Value("${jwt.secret}")
    private String secret;

    /**
     * Gets a username from a token claim.
     * @param token
     * @return the subject value.
     */
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    /**
     * Gets the date a token was issued.
     * @param token
     * @return the subject value.
     */
    public Date getIssuedAtDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getIssuedAt);
    }

    /**
     * Get the claims (not sure which datatype- make generic to pass the claim) from token-objects inside jwt.
     * @param token
     * @param claimsResolver
     * @return token claim
     * @param <T> Unknown Data type.
     */
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver ) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Checks the expiration date of a token.
     * @param token
     * @return expiration date of a token.
     */
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    /**
     * gets all the claims from a token.
     * @param token
     * @return all claims from a token.
     */
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }



    /**
     * Verifies if the token is expired based on the results from getExpirationDateFromToken().
     * @param token
     * @return Boolean value if the token is expired or not.
     */
    public boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    /**
     * Generates a token.
     * @param user
     * @return a JWTs generated version of a token.
     */
    public String generateToken(User user) {
        return doGenerateToken(user);
    }

    private String doGenerateToken(UserDetails subject) {
        Claims claims = Jwts.claims().setSubject(subject.getUsername());
        claims.put("scopes", List.of(new SimpleGrantedAuthority(subject.getAuthorities().toString())));

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    /**
     * Validates a token.
     * @param token
     * @param userDetails
     * @return a boolean value of if the token is expired for a user.
     */
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}