import { jwtDecode } from "jwt-decode";

export function isAuthenticated(): boolean {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp && decodedToken.exp <= Date.now()) return true;
    else {
      logout();
      return false;
    }
  } else {
    return false;
  }
}

export function setToken(token: string): void {
  if (!token) {
    localStorage.removeItem("token");
  } else {
    localStorage.setItem("token", token);
  }
}

export function logout() {
  localStorage.clear();
}
