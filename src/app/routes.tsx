import { createBrowserRouter, Navigate } from "react-router";
import { AuthLayout } from "./components/AuthLayout";
import { RootLayout } from "./components/RootLayout";
import { LoginScreen } from "./components/LoginScreen";
import { Dashboard } from "./components/Dashboard";
import { ConfigurationModule } from "./components/ConfigurationModule";
import { PollingStations } from "./components/PollingStations";
import { VotingTally } from "./components/VotingTally";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { DatabaseSchema } from "./components/DatabaseSchema";
import { UserManagement } from "./components/UserManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: LoginScreen,
      },
      {
        path: "/",
        Component: RootLayout,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: "dashboard", Component: Dashboard },
          { path: "configuration", Component: ConfigurationModule },
          { path: "polling-stations", Component: PollingStations },
          { path: "voting-tally", Component: VotingTally },
          { path: "analytics", Component: AnalyticsDashboard },
          { path: "database", Component: DatabaseSchema },
          { path: "users", Component: UserManagement },
          { path: "*", element: <Navigate to="/dashboard" replace /> },
        ],
      },
    ],
  },
]);
