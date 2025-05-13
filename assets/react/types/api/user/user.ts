export type User = {
    id: number;
    email: string;
    username: string;
    roles: string[];
};

export const DEFAULT_USER: User= {
    id: -1,
    email: "",
    username: "",
    roles: [],
}

export type Users = User[];