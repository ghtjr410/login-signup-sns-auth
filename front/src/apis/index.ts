import axios from "axios";
import { IdCheckRequestDto } from "./request/auth";
import { IdCheckResponseDto } from "./response/auth";
import { ResponseDto } from "./response";

const DOMAIN = 'http://localhost:4040';
const API_DOMAIN = `${DOMAIN}/api/v1`;

const ID_CHECK_URL = () => `${API_DOMAIN}/auth/id-check`;


export const idCheckRequest = async (requestBody: IdCheckRequestDto) => {
    const result = await axios.post(ID_CHECK_URL(), requestBody)
        .then(response => {
            const responseBody: IdCheckResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            console.error('API Request Error:', error);
            if (error.response && error.response.data) {
                const responseBody: ResponseDto = error.response.data;
                return responseBody;
            } else {
                return null;
            }
        })
    return result;
}