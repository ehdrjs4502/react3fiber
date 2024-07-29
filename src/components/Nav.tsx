import { Link } from "react-router-dom";

export const Nav = () => {
  const navStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
  };
  const linkStyle = {
    margin: "0 12px",
    padding: "8px 16px",
  };

  return (
    <div style={navStyle}>
      <Link style={linkStyle} to="/">
        주사위 굴리기
      </Link>
      <Link to="/fps">1인칭</Link>
    </div>
  );
};
