package com.housing.back.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.housing.back.entity.UserEntity;
import com.housing.back.provider.JwtProvider;
import com.housing.back.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter{
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal (HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

                try {
                    // JWT 토큰을 파싱해서 가져옴
                    String token = parseBearerToken(request);
                    if(token == null) {
                        filterChain.doFilter(request, response);
                        return;
                    }

                    // JWT 토큰을 검증하고 유효한 사용자 ID를 가져옴
                    String userId = jwtProvider.validate(token);
                    if (userId == null){
                        filterChain.doFilter(request, response);
                        return;
                    }

                    // 사용자 ID를 통해 데이터베이스에서 사용자 정보를 가져옴
                    UserEntity userEntity = userRepository.findByUserId(userId);
                    String role = userEntity.getRole(); // role : ROLE_USER, ROLE_ADMIN

                    System.out.println(role);
                    // 사용자의 권한을 설정
                    List<GrantedAuthority> authorities = new ArrayList<>();
                    authorities.add(new SimpleGrantedAuthority(role));

                    // 새로운 SecurityContext를 생성하고 인증 정보를 설정
                    SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                    AbstractAuthenticationToken authenticationToken = 
                        new UsernamePasswordAuthenticationToken(userId, null, authorities);
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // SecurityContext에 인증 정보 설정
                    securityContext.setAuthentication(authenticationToken);
                    SecurityContextHolder.setContext(securityContext);

                } catch (Exception exception) {
                    exception.printStackTrace();
                }
                // 다음 필터 체인 실행
                filterChain.doFilter(request, response);
    }

    private String parseBearerToken (HttpServletRequest request) {
        // 요청 헤더에서 Authorization 헤더를 가져옴
        String authorization = request.getHeader("Authorization");
        // Authorization 헤더가 존재하는지 확인
        boolean hasAuthorization = StringUtils.hasText(authorization);
        if(!hasAuthorization) return null;
        // Authorization 헤더가 "Bearer "로 시작하는지 확인
        boolean isBearer = authorization.startsWith("Bearer ");
        if (!isBearer) return null;

        // "Bearer " 이후의 토큰 값을 반환
        String token = authorization.substring(7);
        return token;

    }
    
}
