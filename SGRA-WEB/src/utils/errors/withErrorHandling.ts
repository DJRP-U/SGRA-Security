


export async function withErrorHandling<T>(
    fn: () => Promise<T>
): Promise<T> {
    try {
        return await fn();
    } catch (error: any) {
        console.log(error)
        throw error.response?.data ?? error;
    }
}
