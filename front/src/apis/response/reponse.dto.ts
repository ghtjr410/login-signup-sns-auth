import { ResponsMessage, ResponseCode } from "types/enums";

export default interface ResponseDto{
    code: ResponseCode;
    message: ResponsMessage;
}