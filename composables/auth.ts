import { FetchError } from "ofetch";
import type { User } from "~/shared/types/auth/user";
import type { UserLogin } from "~/shared/types/auth/user-login";
import type { UserRegister } from "~/shared/types/auth/user-register";

interface UserState {
  isLoggedIn: boolean;
  user?: User;
}

interface UserError {
  code?: number;
  message?: string;
}

/**
 * Auth functions interface to handle user authentication logic.
 */
export const useAuth = () => {
  const state = useState<UserState>("auth-user", () => ({ isLoggedIn: false }));
  const error = useState<UserError | null>("auth-error", () => null);

  async function login(body: UserLogin) {
    try {
      const headers = useRequestHeaders(["cookie"]);
      const res = await $fetch<User>(
        "http://localhost:8080/api/v1/auth/login",
        {
          method: "POST",
          body,
          headers,
        }
      );

      return await _setState(res);
    } catch (e: any) {
      error.value = buildError(e);
    }
  }

  async function register(body: UserRegister) {
    try {
      return await $fetch<User>("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        body,
      });
    } catch (e: any) {
      error.value = buildError(e);
    }
  }

  async function logout() {
    try {
      const headers = useRequestHeaders(["cookie"]);
      await $fetch("http://localhost:8080/api/v1/auth/logout", {
        method: "POST",
        headers,
      });

      return await _clearState();
    } catch (e: any) {
      console.log("logout/error", e);
      error.value = buildError(e);
    }
  }

  async function initState() {
    const session = useCookie("SESSION_ID");
    if (!session.value) return;

    const user = await getUser();
    if (error.value) {
      return;
    }

    await _setState(user!);
  }

  async function getUser() {
    try {
      const headers = useRequestHeaders(["cookie"]);
      return await $fetch<User>("http://localhost:8080/api/v1/auth/me", {
        credentials: "include",
        headers,
      });
    } catch (e: any) {
      error.value = buildError(e);
    }
  }

  function clearError() {
    error.value = null;
  }

  async function _clearState() {
    state.value = {
      isLoggedIn: false,
      user: undefined,
    };
  }

  async function _setState(user: User) {
    state.value = {
      isLoggedIn: true,
      user,
    };
  }

  function buildError(e: any): UserError {
    if (e instanceof FetchError) {
      return { code: e.statusCode, message: e.message };
    }

    return {
      code: 500,
      message: "Something went wrong!",
    };
  }

  return {
    /**
     * Returns the current user state.
     *
     * This state holds the user information, such as the user's ID and role.
     * It will return `null` if no user is authenticated or the state is not set.
     */
    state: computed(() => state.value),
    /**
     * Returns the current error (not state), then call {@link clearError}.
     *
     * This contains any error message that occurred during authentication actions.
     * If no error occurred, it will return `null`.
     */
    getError: () => {
      const tmpError = error.value;
      clearError();
      return tmpError;
    },
    /**
     * Clears the current error state.
     *
     * This function is called to reset the error state after an error has been handled.
     */
    clearError,
    /**
     * Function to log the user in.
     *
     * It sends a request to the server with the provided credentials and updates the state.
     */
    login,
    /**
     * Function to register a new user.
     *
     * It sends a request to the server with user registration data and updates the state.
     */
    register,
    /**
     * Function to log the user out.
     *
     * It clears the user session and updates the state.
     */
    logout,
    /**
     * Function to get the user data.
     *
     * It fetches the user details from the server and updates the state.
     */
    getUser,
    /**
     * Function to initialize the state.
     *
     * It can be used to set up the initial user state.
     */
    initState,
  };
};
