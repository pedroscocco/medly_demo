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
    password: "123", // Default password for mock user
    totalSessions: MOCK_USER_DATA.totalSessions,
    currentStreak: MOCK_USER_DATA.currentStreak,
    accuracyPercentage: MOCK_USER_DATA.accuracyPercentage,
  },
};

// Token storage with expiration
type TokenData = {
  userId: string;
  expiresAt: number; // Unix timestamp in milliseconds
};

const tokens: { [token: string]: TokenData | null } = {};

// Token expiration time: 24 hours
const TOKEN_EXPIRATION_MS = 24 * 60 * 60 * 1000;

let nextUserId = 3214; // Start after mock user ID

type Method = "GET" | "POST";

type ApiCode = "200" | "400" | "500";

type Response = {
  code: ApiCode;
  data?: any;
  error?: string;
};

export default async function myfetch(
  path: string,
  method: Method = "GET",
  params?: any,
  token?: string
): Promise<Response> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    switch (path) {
      case "/sessions/questions":
        return {
          code: "200",
          data: sessions_questions(method, token),
        };
      case "/sessions/complete":
        return {
          code: "200",
          data: sessions_complete(method, params, token),
        };
      case "/auth/login":
        return {
          code: "200",
          data: auth_login(method, params),
        };
      case "/auth/signup":
        return {
          code: "200",
          data: auth_signup(method, params),
        };
      case "/currentUser":
        return {
          code: "200",
          data: get_current_user(method, token),
        };
      default:
        return { code: "400", error: "Unknown endpoint" };
    }
  } catch (error) {
    return {
      code: (error as ApiError).code || "500",
      error: (error as ApiError).cause || "Internal server error",
    };
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

// Helper function to generate a new token
function generateToken(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

// Helper function to store a token with expiration
function storeToken(userId: string): string {
  const token = generateToken();
  const expiresAt = Date.now() + TOKEN_EXPIRATION_MS;
  tokens[token] = { userId, expiresAt };
  return token;
}

// Helper function to validate a token
function validateToken(token: string | undefined): string {
  if (!token) {
    throw new ApiError("400", "No token provided");
  }

  const tokenData = tokens[token];
  if (!tokenData) {
    throw new ApiError("400", "Invalid token");
  }

  if (Date.now() > tokenData.expiresAt) {
    // Clean up expired token
    tokens[token] = null;
    throw new ApiError("400", "Token expired");
  }

  return tokenData.userId;
}

function sessions_questions(method: Method, token?: string) {
  switch (method) {
    case "GET":
      // Validate token
      validateToken(token);
      return createNewSession();
    default:
      throw new ApiError("400", "Unsupported method");
  }
}

function createNewSession() {
  const sessionStepsCount = 3 + Math.floor(Math.random() * 5); // 1 to 2 questions per session

  // random selection indexes from total pool of questions
  const totalQuestions = MOCK_QUESTION_STEPS.steps.length;
  const selectedIndexes = new Set<number>();
  while (selectedIndexes.size < sessionStepsCount) {
    selectedIndexes.add(Math.floor(Math.random() * totalQuestions));
  }

  const selectedQuestionSteps = Array.from(selectedIndexes).map((index, i) => ({
    // ...MOCK_QUESTION_STEPS.steps[index], // Uncomment to make sure a sort question is first on list for testing.
    index: i,
  }));

  return {
    sessionId: Math.random().toString(36).substring(2, 15),
    // steps: selectedQuestionSteps,
    steps: [MOCK_QUESTION_STEPS.steps[8], ...selectedQuestionSteps],
  };
}

type SessionCompleteParams = {
  sessionId: string;
  totalQuestions: number;
  correctAnswers: number;
  timeSpentPerQuestion: number[]; // seconds per question
  questionStreak: number; // max consecutive correct in this session
  completedAt: string; // ISO timestamp
};

function sessions_complete(
  method: Method,
  params: SessionCompleteParams,
  token?: string
) {
  switch (method) {
    case "POST":
      // Validate token
      validateToken(token);
      return {
        updatedUser: MOCK_USER_DATA,
      };
    default:
      throw new ApiError("400", "Unsupported method");
  }
}

function auth_login(
  method: string,
  params: { email: string; password: string }
) {
  switch (method) {
    case "POST":
      // Find user by email
      const user = Object.values(usersById).find(
        (u) => u.email === params.email
      );

      if (!user) {
        throw new ApiError("400", "User not found");
      }

      if (user.password !== params.password) {
        throw new ApiError("400", "Invalid password");
      }

      // Generate and store token with expiration
      const token = storeToken(user.id);

      // Return user data without password
      const { password, ...userData } = user;
      return {
        user: userData,
        token,
      };
    default:
      throw new ApiError("400", "Unsupported method");
  }
}

function auth_signup(
  method: string,
  params: { email: string; password: string }
) {
  switch (method) {
    case "POST":
      // Check if user already exists
      if (Object.values(usersById).find((u) => u.email === params.email)) {
        throw new ApiError("400", "Email already registered");
      }

      // Create new user
      const newUser: User = {
        id: String(nextUserId++),
        email: params.email,
        password: params.password,
        totalSessions: 0,
        currentStreak: 0,
        accuracyPercentage: 0,
      };

      // Add to hash map
      usersById[newUser.id] = newUser;

      // Generate and store token with expiration
      const token = storeToken(newUser.id);

      // Return user data without password
      const { password, ...userData } = newUser;
      return {
        user: userData,
        token,
      };
    default:
      throw new ApiError("400", "Unsupported method");
  }
}

function get_current_user(method: Method, token?: string) {
  switch (method) {
    case "GET":
      // Validate token and get user ID
      const userId = validateToken(token);

      const user = usersById[userId];
      if (!user) {
        throw new ApiError("400", "User not found");
      }

      // Return user data without password
      const { password, ...userData } = user;
      return userData;
    default:
      throw new ApiError("400", "Unsupported method");
  }
}
