import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function ProtectedRoute({
  children,
  anonymous = false,
  exactAnonymous = false,
  allowedRoles = [],
}) {
  const location = useLocation();
  const { isLoggedIn, currentUser } = useContext(UserContext);

  if (!isLoggedIn) {
    if (anonymous) {
      return children;
    }
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  const userRole = currentUser?.userType;

  if (exactAnonymous) {
    if (userRole === "admin" || userRole === "restaurant") {
      return <Navigate to="/backoffice" replace />;
    }
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length > 0) {
    if (!allowedRoles.includes(userRole)) {
      if (userRole === "admin" || userRole === "restaurant") {
        return <Navigate to="/backoffice" replace />;
      }
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
