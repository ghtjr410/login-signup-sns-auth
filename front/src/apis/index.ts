import axios, { AxiosResponse } from "axios";
import { EmailCertificationRequestDto, IdCheckRequestDto } from "./request/auth";
import { EmailCertificationResponseDto, IdCheckResponseDto } from "./response/auth";
import { ResponseDto } from "./response";

const responseHandler = <T> (response: AxiosResponse<any,any>) => {
    const responseBody: T = response.data;
    return responseBody;
}

const errorHandler = (error: any) => {
    console.error('API Request Error:', error);
    if (error.response && error.response.data) {
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    } else {
        return null;
    }
}

const DOMAIN = 'http://localhost:4040';
const API_DOMAIN = `${DOMAIN}/api/v1`;

const ID_CHECK_URL = () => `${API_DOMAIN}/auth/id-check`;
const EMAIL_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/email-certification`;

export const idCheckRequest = async (requestBody: IdCheckRequestDto) => {
    const result = await axios.post(ID_CHECK_URL(), requestBody)
        .then(responseHandler<IdCheckResponseDto>)
        .catch(errorHandler)
    return result;
}

export const emailCertificationRequest = async (requestBody: EmailCertificationRequestDto) => {
    const result = await axios.post(EMAIL_CERTIFICATION_URL(), requestBody)
        .then(responseHandler<EmailCertificationResponseDto>)
        .catch(errorHandler)
    return result;
}