// import { Folders } from "src/folders/folders.entity";
// import { Users } from "src/users/users.entity";
export class File {
    file_id?: string;
    file_name?: string;
    file_path?: string;
    file_data?: string;
    user_id?: string;
    created_date?:Date;
    updated_date?:Date;
    file_size?:string;
    file_type?:string;

    constructor({file_id,file_name,file_path,cid,user_id,file_size,file_type}) {
        if(file_id != null) this.file_id=file_id;
        if (file_name!=null) this.file_name=file_name;
        if (file_path!=null) this.file_path=file_path;
        if (cid!=null) this.file_data=cid;
        if (user_id!=null) this.user_id=user_id;
        // this.created_date= new Date();
        // this.updated_date= new Date();
        if (file_size!=null) this.file_size=file_size;
        if (file_type!=null) this.file_type=file_type;
    }
    
}