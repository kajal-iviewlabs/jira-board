import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Function to get first letter of the username
  const getFirstLetter = (name: string) => {
    if (name) {
      return name.charAt(0).toUpperCase();
    }
    return "";
  };

  return (
    <>
      <div>
        <header className="header">
          <div className="header-right">
            <div className="inner-right-header">
              <div>
                <div className="dropdown">
                  <button className="login-btn" onClick={toggleDropdown}>
                    {user && user.name ? (
                      <div className="login-initial">
                        {getFirstLetter(user.name)}
                      </div>
                    ) : (
                      "Log In"
                    )}
                  </button>
                  {dropdownOpen && (
                    <div className="dropdown-content">
                      <button
                        className="logout-btn"
                        onClick={() =>
                          logout({
                            logoutParams: {
                              returnTo: window.location.origin,
                            },
                          })
                        }
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
