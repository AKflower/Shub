export class Permission {
    permission_id?: string;

    permission_name?: string;
   
  
    constructor({permission_name }: {
  
      permission_name?: string;
      
    }) {
      
      this.permission_name = permission_name;
      
    }
  }