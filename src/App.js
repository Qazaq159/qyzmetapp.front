import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import TopUp from "./pages/TopUp";
import MyOrders from "./pages/MyOrders";
import CurrentOrder from "./pages/CurrentOrder";
import CreateOrder from "./pages/CreateOrder";
import PricingPlans from './pages/PricingPlans';
import ChatPage from './pages/ChatPage';
import ChatListPage from "./pages/ChatListPage";
import MyOrder from './pages/MyOrder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/top-up" element={<TopUp />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-orders/:orderId" element={<MyOrder />} />
        <Route path="/current-order" element={<CurrentOrder />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/pricing" element={<PricingPlans />} />
        <Route path="/chats" element={<ChatListPage />} />
        <Route path="/chats/:chatId" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
