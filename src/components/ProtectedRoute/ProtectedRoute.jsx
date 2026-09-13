import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function ProtectedRoute({ children, anonymous = false, allowedRoles = [] }) {
  const location = useLocation();
  const from = location.state?.from || "/";
  const { isLoggedIn, currentUser } = useContext(UserContext);

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  if (!anonymous && allowedRoles.length > 0 && currentUser) {
    const userRole = currentUser.userType;

    if (!allowedRoles.includes(userRole)) {
      if (userRole === "admin" || userRole === "restaurant") {
        return <Navigate to="/backoffice" replace />;
      }
      if (userRole === "client") {
        return <Navigate to="/" replace />;
      }
    }
  }

  return children;
}

export default ProtectedRoute;
