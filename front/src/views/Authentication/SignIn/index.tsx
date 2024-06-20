import InputBox from 'components/InputBox';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCertificationRequestDto, EmailCertificationRequestDto, IdCheckRequestDto, SignInRequestDto, SignUpRequestDto } from 'apis/request/auth';
import { SNS_SIGN_IN_URL, checkCertificationRequest, emailCertificationRequest, idCheckRequest, signInRequest, signUpRequest } from 'apis';
import { CheckCertificationResponseDto, EmailCertificationResponseDto, IdCheckResponseDto, SignInResponseDto, SignUpResponseDto } from 'apis/response/auth';
import { ResponseCode } from 'types/enums';
import { ResponseBody } from 'types';
import './style.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function SignIn () {

    const idRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const [cookie, setCookie] = useCookies();

    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [message, setMessage] = useState<string>('');

    const navigate = useNavigate();
    
    const signInResponse = (responseBody: ResponseBody<SignInResponseDto>) => {

        if (!responseBody) return;

        const { code } = responseBody;
        if (code === ResponseCode.VAILDATION_FAIL) alert('아이디와 비밀번호를 입력하세요.');
        if (code === ResponseCode.SIGN_IN_FAIL) setMessage('로그인 정보가 일치하지 않습니다.');
        if (code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if (code !== ResponseCode.SUCCEESS) return;

        const { token, expirationTime } = responseBody as SignInResponseDto;

        const now = (new Date().getTime()); // 여기다가 1000곱하는게 맞아?
        const expires = new Date(now + (expirationTime *1000));

        setCookie('accessToken', token, { expires, path: '/'});
        navigate('/');

    };

    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

        const { value } = event.target;
        setId(value);
        setMessage('');

    };
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

        const { value } = event.target;    
        setPassword(value);
        setMessage('');

    };

    const onSignUpButtonClickHandler = () => {

        navigate('/auth/sign-up');

    };

    const onSignInButtonClickHandler = () => {

        if (!id || ! password) {
            alert('아이디와 비밀번호 모두 입력하세요.');
            return;
        }

        const requestBody: SignInRequestDto = { id, password};

        signInRequest(requestBody).then(signInResponse);

    };

    const onSnsSignInButtonClickHandler = (type: 'kakao' | 'naver') => {
        window.location.href = SNS_SIGN_IN_URL(type);
    }

    const onIdKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {

        if (event.key !== 'Enter') return;
        if (!passwordRef.current) return;
        passwordRef.current.focus();

    };
    const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {

        if (event.key !== 'Enter') return;
        onSignInButtonClickHandler();
        
    };
    //////////////////////////////////////


    const getCookie = (name: string): string | undefined => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
    };
    

    const onHomeButtonClickHandler = () => {

        

        const signInRequest = async (token: string) => {
            try {
                // 토큰을 헤더에 포함하여 서버에 요청 보냄
                const response = await axios.get("http://localhost:4040/api/v1/aaa/aaa", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true // 필요한 경우에 추가
                });
    
                // 요청이 성공하면 마이페이지로 이동
                navigate('/auth/user');
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
    ///////////////////////////////////////



  return (
    <div id='sign-in-wrapper'>
        <div className='sign-in-image'>
            <button onClick={onHomeButtonClickHandler} > 홈페이지 이동</button>
        </div>
        <div className='sign-in-container'>
            <div className='sign-in-box'>
                <div className='sign-in-title'>{'아직못정한 서비스'}</div>
                <div className='sign-in-content-box'>
                    
                    <div className='sign-in-content-input-box'>
                        <InputBox ref={idRef} title='아이디' placeholder='아이디를 입력해주세요' type='text' value={id} onChange={onIdChangeHandler} onKeyDown={onIdKeyDownHandler}/>
                        <InputBox ref={passwordRef}title='비밀번호' placeholder='비밀번호를 입력해주세요' type='password' value={password} onChange={onPasswordChangeHandler} isErrorMessage message={message} onKeyDown={onPasswordKeyDownHandler}/>
                    </div>
                    <div className='sign-in-content-button-box'>
                        <div className='primary-button-lg full-width' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
                        <div className={`text-link-lg full-width`} onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
                    </div>
                    <div className='sign-in-content-divider'></div>
                    <div className='sign-in-content-sns-sign-in-box'>
                        <div className='sign-in-content-sign-in-title'>{'SNS 로그인'}</div>
                        <div className='sign-in-content-sns-sign-in-button-box'>
                            <div className='kakao-sign-in-button' onClick={() => onSnsSignInButtonClickHandler('kakao')}></div>
                            <div className='naver-sign-in-button' onClick={() => onSnsSignInButtonClickHandler('naver')}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
