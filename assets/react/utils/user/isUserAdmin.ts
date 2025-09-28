import {User} from "@/types/User/User";

export const isUserAdmin = (user: User | null): boolean =>  {
    return user?.roles.includes("ROLE_ADMIN") ?? false
}
