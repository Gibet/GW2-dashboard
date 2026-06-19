import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home";
import { AccountProvider } from "./contexts/accountContext";
import "./App.css";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Account from "./pages/account";
import Achievements from "./pages/achievements";
import ProtectedRoute from "./pages/protected";

function App() {
  return (
    <AccountProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AccountProvider>
  );
}

export default App;
