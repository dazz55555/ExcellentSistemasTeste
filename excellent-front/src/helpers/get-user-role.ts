import { jwtDecode } from "jwt-decode";

type JwtPayload = {
    sub: string;
    role: "ADMIN" | "USER";
    exp: number;
};

export function getUserRole(): "ADMIN" | "USER" | null {
    const token = localStorage.getItem("access-token");
    if (!token) return null;

    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.role;
}
