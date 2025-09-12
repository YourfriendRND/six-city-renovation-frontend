export type User = {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
    isPro: boolean;
    lastLoginAt: Date | null;
    favoriteCount?: number;
}
