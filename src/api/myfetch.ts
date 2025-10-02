import { MOCK_QUESTION_STEPS, MOCK_USER_DATA } from "./mock_data";

// In-memory user storage
type User = {
    id: string;
    email: string;
    password: string;
    totalSessions: number;
    currentStreak: number;
    accuracyPercentage: number;
};

// Hash map of users by ID
const usersById: { [id: string]: User } = {
    [MOCK_USER_DATA.id]: {
        id: MOCK_USER_DATA.id,
        email: MOCK_USER_DATA.email,
        password: '123', // Default password for mock user
        totalSessions: MOCK_USER_DATA.totalSessions,
        currentStreak: MOCK_USER_DATA.currentStreak,
        accuracyPercentage: MOCK_USER_DATA.accuracyPercentage
    }
};

let nextUserId = 3214; // Start after mock user ID
let currentSignedInUserId: string | null = null;

type Method = 'GET' | 'POST';

type ApiCode = '200' | '400' | '500';

type Response = {
    code: ApiCode,
    data?: any,
    error?: string
}

export default async function myfetch(path: string, method: Method = 'GET', params?: any): Promise<Response> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
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
            case '/currentUser':
                return {
                    code: '200',
                    data: get_current_user(method)
                };
            default: return { code: '400', error: 'Unknown endpoint' };
        }
    } catch (error) {
        return { code: (error as ApiError).code || '500', error: (error as ApiError).cause || 'Internal server error'}
    }
}

// Subclass of error with code and cause
class ApiError extends Error {
    code: ApiCode;
    cause: string;
    constructor(code: ApiCode, cause: string) {
        super(cause);
        this.code = code;
        this.cause = cause;
    }
}

function sessions_questions(method: Method) {
    switch (method) {
        case 'GET':
            return createNewSession();
        default: throw new ApiError('400', 'Unsupported method');
    }
}

function createNewSession() {
    const sessionStepsCount = 1 + Math.floor(Math.random() * 7);
    
    // random selection indexes from total pool of questions
    const totalQuestions = MOCK_QUESTION_STEPS.steps.length;
    const selectedIndexes = new Set<number>();
    while (selectedIndexes.size < sessionStepsCount) {
        selectedIndexes.add(Math.floor(Math.random() * totalQuestions));
    }

    const selectedQuestionSteps = Array.from(selectedIndexes).map((index, i) => ({...(MOCK_QUESTION_STEPS.steps[index]), index: i}));

    return {
        sessionId: Math.random().toString(36).substring(2, 15),
        steps: selectedQuestionSteps,
    };
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
        default: throw new ApiError('400', 'Unsupported method');
    }
}

function auth_login(method: string, params: { email: string, password: string }) {
    switch (method) {
        case 'POST':
            // Find user by email
            const user = Object.values(usersById).find(u => u.email === params.email);

            if (!user) {
                throw new ApiError('400', 'User not found');
            }

            if (user.password !== params.password) {
                throw new ApiError('400', 'Invalid password');
            }

            // Store signed-in user ID
            currentSignedInUserId = user.id;

            // Return user data without password
            const { password, ...userData } = user;
            return {
                user: userData,
                token: Math.random().toString(36).substring(2, 15)
            };
        default: throw new ApiError('400', 'Unsupported method');
    }
}

function auth_signup(method: string, params: { email: string, password: string }) {
    switch (method) {
        case 'POST':
            // Check if user already exists
            if (Object.values(usersById).find(u => u.email === params.email)) {
                throw new ApiError('400', 'Email already registered');
            }

            // Create new user
            const newUser: User = {
                id: String(nextUserId++),
                email: params.email,
                password: params.password,
                totalSessions: 0,
                currentStreak: 0,
                accuracyPercentage: 0
            };

            // Add to hash map
            usersById[newUser.id] = newUser;

            // Store signed-in user ID
            currentSignedInUserId = newUser.id;

            // Return user data without password
            const { password, ...userData } = newUser;
            return {
                user: userData,
                token: Math.random().toString(36).substring(2, 15)
            };
        default: throw new ApiError('400', 'Unsupported method');
    }
}

function get_current_user(method: Method) {
    switch (method) {
        case 'GET':
            if (!currentSignedInUserId) {
                throw new ApiError('400', 'No user signed in');
            }

            const user = usersById[currentSignedInUserId];
            if (!user) {
                throw new ApiError('400', 'User not found');
            }

            // Return user data without password
            const { password, ...userData } = user;
            return userData;
        default: throw new ApiError('400', 'Unsupported method');
    }
}

