import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthSession } from "../authentication/AuthSessionProvider";
import { styles } from "../styles/SignIn.styles";
import { colors } from "../styles/designSystem";

export default function SignIn() {
  // ===== Hooks =====
  const { signUp, signIn, isSingingIn, error, clearError } = useAuthSession();

  // ===== Local State =====
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ===== Derived State =====
  const isSignInMode = mode === "signin";

  // ===== Handlers and Callbacks =====
  const handleSubmit = () => {
    mode === "signup"
      ? signUp({ email, password })
      : signIn({ email, password });
  };

  const handleToggleMode = (selectedMode: "signin" | "signup") => {
    clearError();
    setMode(selectedMode);
  };

  // ===== Render =====
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Learnly</Text>
      </View>

      {/* Toggle Tabs */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            isSignInMode && styles.toggleButtonActive,
          ]}
          onPress={() => handleToggleMode("signin")}
          disabled={isSingingIn}
        >
          <Text
            style={[styles.toggleText, isSignInMode && styles.toggleTextActive]}
          >
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            !isSignInMode && styles.toggleButtonActive,
          ]}
          onPress={() => handleToggleMode("signup")}
          disabled={isSingingIn}
        >
          <Text
            style={[
              styles.toggleText,
              !isSignInMode && styles.toggleTextActive,
            ]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={colors.gray400}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isSingingIn}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={colors.gray400}
            secureTextEntry
            editable={!isSingingIn}
          />
        </View>

        {/* Error Message */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error.message}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.submitButton,
            isSingingIn && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isSingingIn || !email || !password}
        >
          {isSingingIn ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.submitButtonText}>
              {isSignInMode ? "Sign In" : "Sign Up"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
