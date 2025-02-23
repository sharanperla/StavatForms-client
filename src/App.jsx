import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";  // Import AuthProvider
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/DashBoard";
import Error from "./pages/Error";
import FormPage from "./pages/Form1";
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
    path: "/form/:formId",
    element: (
 
        <FormPage />
   
    ),
    errorElement: <Error />,
  },
]);

function App() {
  return (
    <HelmetProvider>
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
