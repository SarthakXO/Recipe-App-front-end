import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");

    window.localStorage.removeItem("userID");

    alert("Logged out successfully!");

    navigate("/auth");
  };
  return (
    <div className="navbar">
      <Link className="navItem" to="/">
        Home
      </Link>
      <Link className="navItem" to="/create-recipe">
        Create Recipe
      </Link>
      <Link className="navItem" to="/saved-recipes">
        Saved Recipes
      </Link>
      {!cookies.access_token ? (
        <Link className="navItem" to="/auth">
          Login
        </Link>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  );
};
