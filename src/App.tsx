import { Route, Routes } from "react-router-dom";

import Analytics from "./components/Analytics";
import DashboardLayout from "./components/DashboardLayout";
import GadgetList from "./components/GadgetList";
import Login from "./auth/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <DashboardLayout>
            <GadgetList />
          </DashboardLayout>
        }
      />
      <Route
        path="/analytics"
        element={
          <DashboardLayout>
            <Analytics />
          </DashboardLayout>
        }
      />
    </Routes>
  );
};

export default App;
