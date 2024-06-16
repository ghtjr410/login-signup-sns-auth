# login-signup-sns-auth

# 로그인 및 회원가입 시스템 (SNS 인증 포함)

이 프로젝트는 React, Spring Boot, JWT, MySQL을 사용하여 로그인 및 회원가입 시스템을 구현한 것입니다. 기본적인 로그인, 회원가입, SNS 로그인 기능을 제공합니다.

## 데모

스크린샷넣으면되고

## 사용된 기술 스택

- **프론트엔드**: HTML,CSS,Typescript,React
- **백엔드**: Spring Boot
- **데이터베이스**: MySQL
- **인증**: JWT (JSON Web Token)

## 설치 및 사용 방법

### 사전 요구사항

- Node.js 
- Java (JDK 17 이상)
- MySQL

### 로컬 환경에서 실행

1. **레포지토리 클론**

    ```bash
    git clone https://github.com/yourusername/login-signup-sns-auth.git
    cd login-signup-sns-auth
    ```

2. **백엔드 설정**

    - 백엔드 디렉토리로 이동하여 Spring Boot 애플리케이션을 실행합니다.

    ```bash
    cd backend
    ./mvnw spring-boot:run
    ```

3. **프론트엔드 설정**

    - 프론트엔드 디렉토리로 이동하여, 의존성을 설치하고 React 애플리케이션을 시작합니다.

    ```bash
    cd frontend
    npm install
    npm start
    ```

## 프로젝트 구조

```plaintext
login-signup-sns-auth/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   └── App.js
│   ├── package.json
└── README.md

API 문서
인증
회원가입
URL: /auth/signup
메서드: POST
요청 본문:
json
코드 복사
{
    "username": "string",
    "password": "string",
    "email": "string"
}
응답:
201 Created: 사용자 생성 성공.
400 Bad Request: 유효성 검사 오류 또는 이미 존재하는 사용자.
로그인
URL: /auth/login
메서드: POST
요청 본문:
json
코드 복사
{
    "username": "string",
    "password": "string"
}
응답:
200 OK: 인증 성공, JWT 반환.
401 Unauthorized: 인증 실패.
ID 중복 확인
URL: /auth/id-check
메서드: POST
요청 본문:
json
코드 복사
{
    "userId": "string"
}
응답:
200 OK: { "exists": true } 존재하는 ID, { "exists": false } 존재하지 않는 ID.
환경 설정
백엔드: application.properties 파일에서 데이터베이스 설정을 구성합니다.

properties
코드 복사
spring.datasource.url=jdbc:mysql://localhost:3306/yourdatabase
spring.datasource.username=yourusername
spring.datasource.password=yourpassword
jwt.secret=yourjwtsecret
프론트엔드: .env 파일에서 API 기본 URL을 설정합니다.

plaintext
코드 복사
REACT_APP_API_BASE_URL=http://localhost:8080
기여 방법
레포지토리를 포크합니다.
기능 브랜치를 생성합니다 (git checkout -b feature/your-feature).
변경 사항을 커밋합니다 (git commit -am 'Add some feature').
브랜치에 푸시합니다 (git push origin feature/your-feature).
새로운 Pull Request를 생성합니다.

라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.
이 README 파일은 프로젝트를 이해하고 설정하는 데 필요한 모든 정보를 한글로 제공하여, 다른 개발자들이 쉽게 프로젝트를 이해하고 사용할 수 있게 합니다.
