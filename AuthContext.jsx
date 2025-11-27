import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, []);

  const updateRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
  };

  const clearRole = () => {
    setRole(null);
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ role, setRole: updateRole, clearRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);