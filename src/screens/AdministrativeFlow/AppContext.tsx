import { createContext, useContext, useState, ReactNode } from "react";

type Page =
  | "dashboard"
  | "user-analytics"
  | "plan-management"
  | "job-logs"
  | "support-tickets"
  | "role-management"
  | "manage-executors";

interface AppContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  return (
    <AppContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
