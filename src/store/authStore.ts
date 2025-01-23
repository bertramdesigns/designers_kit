import { createStore } from "solid-js/store";
import { Client, Databases, Account } from "appwrite";
import { ID } from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Appwrite Endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Project ID

const account = new Account(client);
const databases = new Databases(client);

const [authState, setAuthState] = createStore<AuthState>({
    client: client,
    databases: databases,
    user: {
        $id: ID.unique(),
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        name: "",
        registration: "",
        status: false,
        passwordUpdate: new Date().toISOString(),
        email: "",
        phone: "",
        emailVerification: false,
        phoneVerification: false,
        prefs: {},
        labels: [],
        mfa: false,
        targets: [],
        accessedAt: ""
    },
    isAuthenticated: false,
});

const login = async (email: string, password: string) => {
    try {
        await account.createEmailPasswordSession(email, password);
        const user = await account.get();
        setAuthState({ user, isAuthenticated: true });
    } catch (error) {
        console.error("Login failed", error);
    }
};

const getUser = () => {
    return authState.user;
}

const isUserLoggedIn = async () => {
    try {
        const user = await account.get();
        setAuthState({ user, isAuthenticated: true });
        return true;
    } catch (error) {
        setAuthState({ isAuthenticated: false });
        return false;
    }
}

// TODO: This will need to stem a local storage database with a new userID
const logout = async () => {
    try {
        await account.deleteSession("current");
        setAuthState({ isAuthenticated: false });
    } catch (error) {
        console.error("Logout failed", error);
    }
};

const register = async (email: string, password: string, name: string) => {
    try {
        await account.create(authState.user.$id, email, password, name);
        await login(email, password);
    } catch (error) {
        console.error("Registration failed", error);
    }
};

export { login, logout, register, getUser, isUserLoggedIn, authState };