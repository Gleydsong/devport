import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

type AuthUser = {
  id: string;
  username: string;
};

type AuthResponse = {
  user: AuthUser | null;
};

async function fetchAuthMe(): Promise<AuthResponse> {
  const res = await fetch("/api/auth/me", { credentials: "include" });
  if (res.status === 401) {
    return { user: null };
  }
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(text);
  }
  return res.json();
}

export function useAuth() {
  const {
    data,
    isLoading,
    error,
  } = useQuery<AuthResponse>({
    queryKey: ["/api/auth/me"],
    queryFn: fetchAuthMe,
  });

  const loginMutation = useMutation({
    mutationFn: async (payload: { username: string; password: string }) => {
      await apiRequest("POST", "/api/auth/login", payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (payload: { username: string; password: string }) => {
      await apiRequest("POST", "/api/auth/register", payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/auth/logout");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    },
  });

  return {
    user: data?.user ?? null,
    isLoading,
    error,
    login: loginMutation,
    register: registerMutation,
    logout: logoutMutation,
  };
}
