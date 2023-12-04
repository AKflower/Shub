import { Folders } from "src/folders/folders.entity";
import { Users } from "src/users/users.entity";
export class File {
    file_id?: number;
    file_name?:string;
    file_path?:string;
    cid?:string;
    user_id?: number;
    created_at?: Date;
    updated_at?: Date;
    

    constructor({file_id,file_name,file_path,user_id,cid}) {
        if(file_id != null) this.file_id=file_id;
        if (file_name!=null) this.file_name=file_name;
        if (file_path!=null) this.file_path=file_path;
        if (cid!=null) this.cid=cid;
        if (user_id!=null) this.user_id=user_id;
        this.created_at= new Date();
        this.updated_at=new Date(); //warning
        

    }
    
}