import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Form1 from "./pages/Form1";

function App() {
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
      element: <Dashboard />,
      errorElement: <Error />,
    },
    {
      path: "/form1",
      element: <Form1 />,
    },
  ]);

  return (
    <RouterProvider router={appRouter}  />
  );
}

export default App;
