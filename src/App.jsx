import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import { Home } from "./page/Home";
import { Login } from "./page/Login";
import { SignUp } from "./page/SignUp";

function App() {
  const authCheck = useAuthCheck();
  return !authCheck ? (
    <div>Checking Authintication...</div>
  ) : (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/task"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
