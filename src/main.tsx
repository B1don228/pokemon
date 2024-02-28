import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./layouts/Body/Body.tsx";
import Info from "./layouts/Info/Info.tsx";
import Support from "./layouts/Support/Support.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Body />,
      },
      {
        path: "/:id",
        element: <Info />,
      },
      {
        path: "/support",
        element: <Support />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
