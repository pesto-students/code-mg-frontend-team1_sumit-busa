import _ from "lodash";

export type Role = "Admin" | "Teacher" | "Student";

export const isLoggedIn = () => {
  const token = localStorage.token;

  return token && true;
};

export const getRole = () => {
  const role = localStorage.role as Role;
  return role;
};
