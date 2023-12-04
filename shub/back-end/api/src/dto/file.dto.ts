import { MinLength, IsNotEmpty, IsNumber } from "class-validator";

export class FileDTO {
    @IsNotEmpty()
    file_id?:number;

    @IsNotEmpty()
    file_name?:string;
    
    @IsNotEmpty()
    file_path?:string;

    @IsNotEmpty()
    cid?:string;

    @IsNotEmpty()
    user_id?:number;

    

    
}