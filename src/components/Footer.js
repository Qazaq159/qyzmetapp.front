import React from "react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} QyzmetTap. All rights reserved.</p>
    </footer>
  );
}
