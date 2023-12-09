export class User {
    
    user_id?: string;

   
    username?: string;

    
    password?: string;

    
    email?: string;

    constructor({user_id,username,password,email}) {
        if(user_id != null) this.user_id=user_id;
        if (username!=null) this.username=username;
        
        if (password!=null) this.password=password;
        if (email!=null) this.email=email;
        
    }
    
}