import { MinLength, IsNotEmpty, IsNumber } from "class-validator";

export class FileDTO {
    @IsNotEmpty()
    file_id?:string;

    @IsNotEmpty()
    file_name?:string;
    
    @IsNotEmpty()
    file_path?:string;

    @IsNotEmpty()
    cid?:string;

    @IsNotEmpty()
    user_id?:string;

    @IsNotEmpty()
    file_size?:string;
}