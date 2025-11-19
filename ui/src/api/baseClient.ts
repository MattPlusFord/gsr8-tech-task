import { getCookieValue } from '../utils/cookies';

export class BaseClient {
    static async authenticatedRequest(endpoint: string, options?: RequestInit): Promise<Response | null> {
        const sessionValue = getCookieValue('fawdSession');
        if (!sessionValue) {
            return null;
        }
        const headers = {
            ...options?.headers,
            'x-user-id': sessionValue,
        };
        return fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, { ...options, headers });
    }

    static async unauthenticatedRequest(endpoint: string, options: RequestInit): Promise<Response> {
        return fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, options);
    }
}
