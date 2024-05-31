export declare class User {
    user_id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    isFirstAccess: boolean;
    isActive: boolean;
    organization: string;
    subordinates?: string[];
}
