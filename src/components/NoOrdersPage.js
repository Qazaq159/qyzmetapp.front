import { useNavigate } from "react-router-dom";
import { PackageX } from "lucide-react"; 
import Layout from "./Layout";
import "../styles/ErrorPage.css"; 

export default function NoOrdersPage({ nextAvailableAt }) {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="no-orders-container">
      <div className="no-orders-card">
        <div className="icon-wrap">
        <div className="no-orders-icon">
          <PackageX className="icon-style" />
        </div>
        </div>
        <h1 className="no-orders-title">No Orders Available</h1>
        <p className="no-orders-message">
        {nextAvailableAt 
            ? <>Next order available at: <b>{nextAvailableAt}</b>. Please check back later.</>
            : "There are currently no new orders. Please check back later."}
        </p>
        <button className="no-orders-button" onClick={() => navigate("/")}>
          Go to Home
        </button>
        </div>
      </div>
    </Layout>
  );
}
