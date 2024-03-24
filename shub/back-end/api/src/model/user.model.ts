export class User {
    
    user_id?: string;

   
    email?: string;

    
    password?: string;

    firstName?: string;
    
    lastName?: string;

    constructor({email,password,firstName,lastName}) {
        
        if (email!=null) this.email=email;
        
        if (password!=null) this.password=password;
        if (firstName!=null) this.firstName=firstName;
        if (lastName!=null) this.lastName=lastName;
        
    }
    
}