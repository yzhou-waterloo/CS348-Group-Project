'use client'

import React, { createContext, useContext, useState } from 'react'

const AdminContext = createContext<{
  admin_loggedin: boolean;
  setAdminLoggedin: (loggedIn: boolean) => void;
}>({ admin_loggedin: false, setAdminLoggedin: () => {} });

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin_loggedin, setAdminLoggedin] = useState(false);
  return (
    <AdminContext.Provider value={{ admin_loggedin, setAdminLoggedin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);