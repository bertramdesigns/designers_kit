import { Client, Databases, Models } from 'appwrite';

declare global {
    interface

    interface AuthState {
        client: Client;
        databases: Databases;
        user: Models.User;
        isAuthenticated: boolean;
    }
}

export { }