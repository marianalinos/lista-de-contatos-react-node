export class UserModel {
    private userId: number;
    private userEmail: string;
    private userSecret: string;

    constructor(userId: number, userEmail: string, userSecret: string) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.userSecret = userSecret;
    }

    public getUserId(): number {
        return this.userId;
    }

    public getUserEmail(): string {
        return this.userEmail;
    }

    public getUserSecret(): string {
        return this.userSecret;
    }
}