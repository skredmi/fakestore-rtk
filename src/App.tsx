import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ReactElement } from "react";
import styles from "./App.module.css";
import { Main } from "./pages/Main/Main";
import { Message } from "./pages/Message/Message";

interface ExactRouteProps {
  exact: boolean;
  path: string;
  element: ReactElement;
}

const MainRoute: ExactRouteProps = {
  exact: true,
  path: "/fakestore-rtk",
  element: <Main />,
};

export const App = (): ReactElement => {
  return (
    <Router>
      <div className={styles.app}>
        <Routes>
          <Route {...MainRoute} />
          <Route path="/fakestore-rtk/order" element={<Message />} />
        </Routes>
      </div>
    </Router>
  );
};
