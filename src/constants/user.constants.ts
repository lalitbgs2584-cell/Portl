export const UserRoles = [
    {
        name: "Admin",
        image: require("@/assets/app-icons/admin.png")
    },
    {
        name: "Resident",
        image: require("@/assets/app-icons/resident.png")
    },
    {
        name: "Guard",
        image: require("@/assets/app-icons/guard.png")
    }] as const

export type UserRole = (typeof UserRoles)[number];
