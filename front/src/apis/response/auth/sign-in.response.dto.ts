import ResponseDto from "../reponse.dto";

export default interface SignInResponseDto extends ResponseDto {

    token: string;
    expirationTime: number;


}