import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate();
    

    const onHomeButtonClickHandler = () => {
        console.log(document.cookie);
        document.cookie = 'accessToken=; Max-Age=-99999999; path=/';

     
        
    };

    const getCookie = (name: string): string | undefined => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
    };
    

    const onHomeButtonClickHandler1 = () => {

        

        const signInRequest = async (token: string) => {
            try {
                // 토큰을 헤더에 포함하여 서버에 요청 보냄
                const response = await axios.get("http://localhost:4040/api/v1/aaa/aaa", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true // 필요한 경우에 추가
                });
    
                document.cookie = 'accessToken=; Max-Age=-99999999; path=/';
                navigate('/');
                // 요청이 성공하면 마이페이지로 이동
                console.log("성공햇어얌");
            } catch (error) {
                // 요청이 실패하면 에러 메시지 출력
                console.error("못들어감", error);
            }
        };
    
        // 쿠키에서 JWT 토큰 가져오기
        const token: string | undefined = getCookie('accessToken');
    
        if (token) {
            console.log('Token found:', token);
            signInRequest(token);
        } else {
            console.error('토큰이 없음');
        }
    };
    

  return (
    <div>
        <h1>홈페이지</h1>
        <button onClick={onHomeButtonClickHandler}>로그아웃</button>
        <button onClick={onHomeButtonClickHandler1}>실험</button>
    </div>
  )
}

export default HomePage;