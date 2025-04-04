import InfoCard from "../components/InfoCard";
import Layout from "../components/Layout";
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  MessageSquare, 
  Search, 
  UserCheck 
} from "lucide-react";
import "../styles/Home.css";

function Home() {
    return (
        <Layout>
        <div className="how-it-works">
            <h1 className="title">How QyzmetTap Works</h1>
            <div className="cards-container">
            <InfoCard icon={DollarSign} title="Create an Order">
                Client creates an order and pays a 10% prepayment (minimum order amount: 10,000 KZT).
            </InfoCard>

            <InfoCard icon={Search} title="Hybrid Matching">
                The system looks for a developer with the fewest active orders. If multiple developers match, one is
                selected randomly.
            </InfoCard>

            <InfoCard icon={Clock} title="Limited Response Time">
                Developer has a limited time (e.g., 2 hours) to respond. If they don't, the system assigns another
                developer.
            </InfoCard>

            <InfoCard icon={MessageSquare} title="Project Discussion">
                Client and developer discuss the project details in a chat.
            </InfoCard>

            <InfoCard icon={UserCheck} title="Developer Confirmation">
                Client confirms the developer by clicking "Agreed with this Developer" and makes a full prepayment.
            </InfoCard>

            <InfoCard icon={CheckCircle} title="Project Completion">
                Once the project is completed, the client clicks "Project Completed".
            </InfoCard>
            </div>
            <div className="not-agree-section">
                <h2 className="subtitle">What if no agreement is reached?</h2>
                <ul className="not-agree-list">
                    <li className="not-agree-item">
                    Continue searching <ArrowRight className="arrow-icon" /> The system finds another developer.
                    </li>
                    <li className="not-agree-item">
                    Hide the order <ArrowRight className="arrow-icon" /> The order is archived and no longer visible.
                    </li>
                </ul>
            </div>
        </div>
        </Layout>
      );    
}

export default Home;
