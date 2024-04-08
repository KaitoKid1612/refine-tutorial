export const authProvider: {
  logout: () => Promise<{ success: boolean }>;
  forgotPassword: (params) => Promise<void>;
  onError: (error) => Promise<{ logout: boolean; error: { message: string } } | {}>;
  updatePassword: (params) => Promise<void>;
  getIdentity: () => Promise<void>;
  getPermissions: () => Promise<void>;
  check: () => Promise<{ authenticated: boolean }>;
  login: ({ email, password }: { email: any; password: any }) => Promise<{ success: boolean }>;
  register: (params) => Promise<void>
} = {
  onError: async (error) => {
    if (error?.status === 401) {
      return {
        logout: true,
        error: { message: "Unauthorized" },
      };
    }

    return {};
  },
  getIdentity: async () => {
    const response = await fetch("https://api.fake-rest.refine.dev/auth/me", {
      headers: {
        Authorization: localStorage.getItem("my_access_token"),
      },
    });

    if (response.status < 200 || response.status > 299) {
      return null;
    }

    return await response.json();
  },
  // login method receives an object with all the values you've provided to the useLogin hook.
  login: async ({ email, password }) => {
    const response = await fetch(
      "https://api.fake-rest.refine.dev/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("my_access_token", data.token);
      return { success: true };
    }

    return { success: false };
  },
  logout: async () => {
    localStorage.removeItem("my_access_token");
    return { success: true };
  },
  check: async () => {
    // When logging in, we'll obtain an access token from our API and store it in the local storage.
    // Now let's check if the token exists in the local storage.
    // In the later steps, we'll be implementing the `login` and `logout` methods.
    const token = localStorage.getItem("my_access_token");

    return { authenticated: Boolean(token) };
  },
  // optional methods
  register: async (params) => { throw new Error("Not implemented"); },
  forgotPassword: async (params) => { throw new Error("Not implemented"); },
  updatePassword: async (params) => { throw new Error("Not implemented"); },
  getPermissions: async () => { throw new Error("Not implemented"); },
};