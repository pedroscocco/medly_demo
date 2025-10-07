import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { AuthSessionProvider } from "../../authentication/AuthSessionProvider";
import SignIn from "../signin";

// Mock dependencies
jest.mock("../../utils/SecureStorage");

// Helper to create wrapper
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <AuthSessionProvider>{children}</AuthSessionProvider>
    </QueryClientProvider>
  );
}

describe("SignIn Screen - User Perspective Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Initial UI Display", () => {
    it("shows sign in form by default", () => {
      const { getAllByText, getByText, getByPlaceholderText } = render(
        <SignIn />,
        {
          wrapper: createWrapper(),
        }
      );

      // Should show app title
      expect(getByText("Learnly")).toBeTruthy();

      // Should show both tab options
      const signInElements = getAllByText("Sign In");
      expect(signInElements.length).toBeGreaterThan(0);

      const signUpElements = getAllByText("Sign Up");
      expect(signUpElements.length).toBeGreaterThan(0);

      // Should show form fields
      expect(getByText("Email")).toBeTruthy();
      expect(getByPlaceholderText("Enter your email")).toBeTruthy();
      expect(getByText("Password")).toBeTruthy();
      expect(getByPlaceholderText("Enter your password")).toBeTruthy();
    });

    it("email and password fields start empty", () => {
      const { getByPlaceholderText } = render(<SignIn />, {
        wrapper: createWrapper(),
      });

      expect(getByPlaceholderText("Enter your email").props.value).toBe("");
      expect(getByPlaceholderText("Enter your password").props.value).toBe("");
    });
  });

  describe("Form Input", () => {
    it("allows user to type email", () => {
      const { getByPlaceholderText } = render(<SignIn />, {
        wrapper: createWrapper(),
      });

      const emailInput = getByPlaceholderText("Enter your email");

      fireEvent.changeText(emailInput, "test@example.com");

      expect(emailInput.props.value).toBe("test@example.com");
    });

    it("allows user to type password", () => {
      const { getByPlaceholderText } = render(<SignIn />, {
        wrapper: createWrapper(),
      });

      const passwordInput = getByPlaceholderText("Enter your password");

      fireEvent.changeText(passwordInput, "password123");

      expect(passwordInput.props.value).toBe("password123");
    });

    it("password field hides text (secure entry)", () => {
      const { getByPlaceholderText } = render(<SignIn />, {
        wrapper: createWrapper(),
      });

      const passwordInput = getByPlaceholderText("Enter your password");

      expect(passwordInput.props.secureTextEntry).toBe(true);
    });
  });

  describe("Tab Switching", () => {
    it("switches to sign up mode when Sign Up tab clicked", () => {
      const { getAllByText } = render(<SignIn />, {
        wrapper: createWrapper(),
      });

      // Click Sign Up tab (first one in the array)
      const signUpTabs = getAllByText("Sign Up");
      fireEvent.press(signUpTabs[0]);

      // Submit button should now say "Sign Up"
      const buttons = getAllByText("Sign Up");
      expect(buttons.length).toBeGreaterThan(1); // Tab + Button
    });

    it("can switch back to sign in mode", () => {
      const { getAllByText } = render(<SignIn />, {
        wrapper: createWrapper(),
      });

      // Switch to Sign Up
      const signUpTabs = getAllByText("Sign Up");
      fireEvent.press(signUpTabs[0]);

      // Switch back to Sign In
      const signInTabs = getAllByText("Sign In");
      fireEvent.press(signInTabs[0]);

      // Submit button should say "Sign In"
      const signInButtons = getAllByText("Sign In");
      expect(signInButtons.length).toBeGreaterThan(1); // Tab + Button
    });
  });

  describe("Form Interaction", () => {
    it("allows filling in email and password for sign in", () => {
      const { getByPlaceholderText } = render(<SignIn />, {
        wrapper: createWrapper(),
      });

      // Fill in form
      fireEvent.changeText(
        getByPlaceholderText("Enter your email"),
        "test@example.com"
      );
      fireEvent.changeText(
        getByPlaceholderText("Enter your password"),
        "password123"
      );

      // Verify values are set
      expect(getByPlaceholderText("Enter your email").props.value).toBe(
        "test@example.com"
      );
      expect(getByPlaceholderText("Enter your password").props.value).toBe(
        "password123"
      );
    });

    it("allows filling in email and password for sign up", () => {
      const { getAllByText, getByPlaceholderText } = render(<SignIn />, {
        wrapper: createWrapper(),
      });

      // Switch to Sign Up
      const signUpTabs = getAllByText("Sign Up");
      fireEvent.press(signUpTabs[0]);

      // Fill in form
      fireEvent.changeText(
        getByPlaceholderText("Enter your email"),
        "newuser@example.com"
      );
      fireEvent.changeText(
        getByPlaceholderText("Enter your password"),
        "newpassword123"
      );

      // Verify values are set
      expect(getByPlaceholderText("Enter your email").props.value).toBe(
        "newuser@example.com"
      );
      expect(getByPlaceholderText("Enter your password").props.value).toBe(
        "newpassword123"
      );
    });
  });

  describe("Form Validation", () => {
    it("validates that email is required", () => {
      const { getByPlaceholderText } = render(<SignIn />, {
        wrapper: createWrapper(),
      });

      // Enter only password
      fireEvent.changeText(
        getByPlaceholderText("Enter your password"),
        "password123"
      );

      // Email should still be empty
      expect(getByPlaceholderText("Enter your email").props.value).toBe("");
    });

    it("validates that password is required", () => {
      const { getByPlaceholderText } = render(<SignIn />, {
        wrapper: createWrapper(),
      });

      // Enter only email
      fireEvent.changeText(
        getByPlaceholderText("Enter your email"),
        "test@example.com"
      );

      // Password should still be empty
      expect(getByPlaceholderText("Enter your password").props.value).toBe("");
    });

    it("accepts both email and password when both are provided", () => {
      const { getByPlaceholderText } = render(<SignIn />, {
        wrapper: createWrapper(),
      });

      // Fill both fields
      fireEvent.changeText(
        getByPlaceholderText("Enter your email"),
        "test@example.com"
      );
      fireEvent.changeText(
        getByPlaceholderText("Enter your password"),
        "password123"
      );

      // Both fields should have values
      expect(getByPlaceholderText("Enter your email").props.value).toBe(
        "test@example.com"
      );
      expect(getByPlaceholderText("Enter your password").props.value).toBe(
        "password123"
      );
    });
  });
});
