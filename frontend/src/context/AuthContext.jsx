import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ecommerce-user") || "null"); } catch { return null; }
  });

  const signIn = (data) => { localStorage.setItem("ecommerce-token", data.token); localStorage.setItem("ecommerce-user", JSON.stringify(data.user)); setUser(data.user); };
  const signOut = () => { localStorage.removeItem("ecommerce-token"); localStorage.removeItem("ecommerce-user"); setUser(null); };
  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}