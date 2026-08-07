import { useEffect, useState } from "react";
import { AuthLevel } from "../types";

const TOKEN_KEY = "scrutexity_scan_token";

export function useScanToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Only run on client
    const stored = sessionStorage.getItem(TOKEN_KEY);
    if (stored) setToken(stored);
  }, []);

  const saveToken = (newToken: string) => {
    sessionStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  const clearToken = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  return { token, saveToken, clearToken };
}
