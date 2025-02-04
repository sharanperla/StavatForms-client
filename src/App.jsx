import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";  // Import AuthProvider
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Form1 from "./pages/Form1";
import PrivateRoute from "./middleware/PrivateRoute"; // Import ProtectedRoute

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />,
  },
  {
    path: "/signin",
    element: <SignIn />,
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: "/form1",
    element: (
      <PrivateRoute>
        <Form1 />
      </PrivateRoute>
    ),
    errorElement: <Error />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  );
}

export default App;
