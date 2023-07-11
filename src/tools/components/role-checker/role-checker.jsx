import { useCookies } from "react-cookie";

export default function RoleChecker({ children, roles, reverse = false }) {
  const [cookies] = useCookies(["admin"]);
  const adminData = cookies.admin;
  if (reverse) {
    return Array.isArray(roles) &&
      ![...roles].includes(adminData?.role?.toLowerCase())
      ? children
      : null;
  }

  return Array.isArray(roles) &&
    [...roles, "superuser"].includes(adminData?.role?.toLowerCase())
    ? children
    : null;
}
