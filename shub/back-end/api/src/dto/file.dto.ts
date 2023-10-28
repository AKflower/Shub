import { MinLength, IsNotEmpty, IsNumber } from "class-validator";

export class FileDTO {
    @IsNotEmpty()
    ID?:string;

    @IsNotEmpty()
    Owner?:string;
    
    @IsNotEmpty()
    NameFile?:string;

    @IsNotEmpty()
    Type?:string;

    @IsNotEmpty()
    Link?:string;
}