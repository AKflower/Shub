import { MinLength, IsNotEmpty, IsNumber } from "class-validator";

export class FileDTO {
    

    @IsNotEmpty()
    file_name?:string;
    
    @IsNotEmpty()
    file_path?:string;

    @IsNotEmpty()
    file_data?:string;

    @IsNotEmpty()
    user_id?:string;

    @IsNotEmpty()
    file_size?:string;

    @IsNotEmpty()
    file_type?:string;
}