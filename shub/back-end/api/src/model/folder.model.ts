export class Folder {
    
    folder_id?: string;

   
    folder_name?: string;

    
    folder_path?: string;

    
    user_id?: string;

    created_date?: Date;

    updated_date?: Date;

    constructor({folder_id,folder_name,folder_path,user_id}) {
        if(folder_id!= null) this.folder_id=folder_id;
        if (folder_name!=null) this.folder_name=folder_name;
        
        if (folder_path!=null) this.folder_path=folder_path;
        if (user_id!=null) this.user_id=user_id;
        this.created_date= new Date();
        this.updated_date= new Date();
        
    }
    
}