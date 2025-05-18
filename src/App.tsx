import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ToastProvider } from "@heroui/react";
import { useTheme } from "@heroui/use-theme";

// Layouts
import DashboardLayout from "./layouts/dashboard-layout";

// Pages
import Dashboard from "./pages/dashboard";
import Meetings from "./pages/meetings";
import Recordings from "./pages/recordings";
import Transcripts from "./pages/transcripts";
import Insights from "./pages/insights";
import Settings from "./pages/settings";
import NotFound from "./pages/not-found";

// Components
import { LoadingScreen } from "./components/loading-screen";

const App: React.FC = () => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <Router>
            <ToastProvider placement="top-right" maxVisibleToasts={5} />
            <Switch>
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>
              
              <Route path="/dashboard">
                <DashboardLayout>
                  <Switch>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/dashboard/meetings" component={Meetings} />
                    <Route exact path="/dashboard/recordings" component={Recordings} />
                    <Route exact path="/dashboard/transcripts" component={Transcripts} />
                    <Route exact path="/dashboard/insights" component={Insights} />
                    <Route exact path="/dashboard/settings" component={Settings} />
                  </Switch>
                </DashboardLayout>
              </Route>
              
              <Route path="*" component={NotFound} />
            </Switch>
          </Router>
        )}
      </div>
    </div>
  );
};

export default App;