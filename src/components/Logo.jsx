import "./Logo.css";

export const Logo = ({ isDark, size }) => (
  <div className="logo" style={{ fontSize: size }}>
    <div className={`text-${isDark ? "black" : "white"}`}>Easy</div>
    <div>Tutor</div>
  </div>
);
