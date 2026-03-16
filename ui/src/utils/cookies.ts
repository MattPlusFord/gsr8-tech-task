export class CookieUtils {
    static getCookieValue(name: string): string | undefined {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [key, value] = cookie.split("=");
            if (key === name) {
                return decodeURIComponent(value);
            }
        }
        return undefined;
    }
}

export default CookieUtils;