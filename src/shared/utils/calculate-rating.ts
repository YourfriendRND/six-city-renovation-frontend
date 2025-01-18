export function calculateRating(rating: number): string {
    const MAX_RATING = 5;

    return `${((rating/MAX_RATING) * 100).toFixed(2)}%`;
}