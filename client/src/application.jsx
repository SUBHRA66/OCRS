import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { Dashboard } from "./component/advDash";
import { Profile } from "./component/advProf";

function Application() {
  return (
    <BrowserRouter>
      <Dashboard/>
      <Outlet/>
    </BrowserRouter>
  );
}


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Application />,
    children: [
      {
        path: "/",
        element: <Body/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "restaurants/:ResId",
        element: <ResMenu/>
      }
    ]
  },
 
])

export default Application;
