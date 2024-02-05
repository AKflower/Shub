export class User {
    
    user_id?: string;

   
    username?: string;

    
    password?: string;

    
    email?: string;

    constructor({username,password,email}) {
        
        if (username!=null) this.username=username;
        
        if (password!=null) this.password=password;
        if (email!=null) this.email=email;
        
    }
    
}