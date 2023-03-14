import { React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import { Main } from "./pages/Main/Main";
import { Message } from "./pages/Message/Message";

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Routes>
          <Route exact path="/fakestore-rtk" element={<Main />} />
          <Route path="/fakestore-rtk/order" element={<Message />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
