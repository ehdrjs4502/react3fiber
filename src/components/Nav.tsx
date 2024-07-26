import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div>
      <Link to="/">주사위 굴리기</Link>
      <Link to="/fps">1인칭</Link>
    </div>
  );
};
