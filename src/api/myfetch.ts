import { MOCK_QUESTION_STEPS, MOCK_USER_DATA } from "./mock_data";



type Method = 'GET' | 'POST';

type Response = {
    code: '200' | '400' | '500',
    data?: any,
    error?: string
}

export default async function myfetch(path: string, method: Method = 'GET', params?: any): Promise<Response> {
    switch (path) {
        case '/sessions/questions':
            return {
                code: '200',
                data: sessions_questions(method)
            };
        case '/sessions/complete':
            return {
                code: '200',
                data: sessions_complete(method, params)
            };
        case '/auth/login':
            return {
                code: '200',
                data: auth_login(method, params)
            }
        case '/auth/signup':
            return {
                code: '200',
                data: auth_signup(method, params)
            };
        default: return { code: '400', error: 'Unknown endpoint'};
    }
}

function sessions_questions(method: Method) {
    switch (method) {
        case 'GET':
            return {
                sessionId: 123,
                steps: MOCK_QUESTION_STEPS.steps,
            };
        default: return '400';
    }
}

type SessionCompleteParams = {
    sessionId: string,
    totalQuestions: number,
    correctAnswers: number,
    timeSpentPerQuestion: number[], // seconds per question
    questionStreak: number, // max consecutive correct in this session
    completedAt: string // ISO timestamp
}

function sessions_complete(method: Method, params: SessionCompleteParams) {
    switch (method) {
        case 'POST':
            return {
                updatedUser: MOCK_USER_DATA,
            };
        default: return '400';
    }
}

function auth_login(method: string, params: { email: string, password: string }) {
    switch (method) {
        case 'POST':
            return {
                user: MOCK_USER_DATA,
                token: 'mock-token-123'
            };
        default: return '400';
    }
}

function auth_signup(method: string, params: { email: string, password: string }) {
    switch (method) {
        case 'POST':
            return {
                user: MOCK_USER_DATA,
                token: 'mock-token-123'
            };
        default: return '400';
    }
}

