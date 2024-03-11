import { useEffect, useState } from "react";
import "./header.css";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getFirstLetter = (name: string) => {
    if (name) {
      console.log(name);
      return name.charAt(0).toUpperCase();
    }
    return "";
  };

  return (
    <>
      <div>
        <header className="header">
          <nav className="header-left">
            <div role="presentation">
              <span className="home-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  role="presentation"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    color="#44556f"
                    d="M4 5.01C4 4.451 4.443 4 5.01 4h1.98C7.549 4 8 4.443 8 5.01v1.98C8 7.549 7.557 8 6.99 8H5.01C4.451 8 4 7.557 4 6.99V5.01zm0 6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98C8 13.549 7.557 14 6.99 14H5.01C4.451 14 4 13.557 4 12.99v-1.98zm6-6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98C14 7.549 13.557 8 12.99 8h-1.98C10.451 8 10 7.557 10 6.99V5.01zm0 6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98c0 .558-.443 1.01-1.01 1.01h-1.98c-.558 0-1.01-.443-1.01-1.01v-1.98zm6-6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98C20 7.549 19.557 8 18.99 8h-1.98C16.451 8 16 7.557 16 6.99V5.01zm0 6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98c0 .558-.443 1.01-1.01 1.01h-1.98c-.558 0-1.01-.443-1.01-1.01v-1.98zm-12 6c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98C8 19.549 7.557 20 6.99 20H5.01C4.451 20 4 19.557 4 18.99v-1.98zm6 0c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98c0 .558-.443 1.01-1.01 1.01h-1.98c-.558 0-1.01-.443-1.01-1.01v-1.98zm6 0c0-.558.443-1.01 1.01-1.01h1.98c.558 0 1.01.443 1.01 1.01v1.98c0 .558-.443 1.01-1.01 1.01h-1.98c-.558 0-1.01-.443-1.01-1.01v-1.98z"
                  ></path>
                </svg>
              </span>
            </div>
            <div className="outer-menu">
              <div role="listitem" className="div-btn">
                <div className="inner-div">
                  <span className="work">Your work</span>
                  <span className="work-span">
                    <div className="css-jsror5">
                      <span aria-hidden="true" className="css-snhnyn">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          role="presentation"
                        >
                          <path
                            d="M8.292 10.293a1.009 1.009 0 000 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 000-1.419.987.987 0 00-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 00-1.406 0z"
                            fill="currentColor"
                            fill-rule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </span>
                </div>
              </div>
              <div role="listitem" className="div-btn">
                <div className="inner-div">
                  <span className="projects">Projects</span>
                  <span aria-hidden="true" className="projects-span">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      role="presentation"
                    >
                      <path
                        d="M8.292 10.293a1.009 1.009 0 000 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 000-1.419.987.987 0 00-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 00-1.406 0z"
                        fill="currentColor"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div role="listitem" className="div-btn">
                <div className="inner-div">
                  <span className="more">More</span>
                  <span className="more-span">
                    <div className="css-jsror5">
                      <span aria-hidden="true" className="css-snhnyn">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          role="presentation"
                        >
                          <path
                            d="M8.292 10.293a1.009 1.009 0 000 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 000-1.419.987.987 0 00-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 00-1.406 0z"
                            fill="currentColor"
                            fill-rule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </span>
                </div>
              </div>
              <div role="listitem" className="div-btn">
                <div className="inner-div">
                  <span className="create">Create</span>
                  <span className="create">
                    <span role="img" aria-label="Create" className="css-snhnyn">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        role="presentation"
                      >
                        <path
                          d="M13 11V7a1 1 0 00-2 0v4H7a1 1 0 000 2h4v4a1 1 0 002 0v-4h4a1 1 0 000-2h-4z"
                          fill="currentColor"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </nav>
          <div className="header-right">
            <div className="inner-right-header">
              <div role="presentation">
                <div role="search" className="search-img-div">
                  <span className="search-img">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      role="presentation"
                    >
                      <path
                        d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
                        fill="currentColor"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <input
                    className="search-input"
                    placeholder="Search"
                    maxLength="500"
                    value=""
                  />
                </div>
              </div>
              <div>
                {isAuthenticated ? (
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
                          <div className="dropdown-user-container">
                            <div className="dropdown-name">Account</div>
                            <div className="dropdown-user-details">
                              <button
                                className="login-btn"
                                onClick={toggleDropdown}
                              >
                                {user && user.name ? (
                                  <div className="login-initial">
                                    {getFirstLetter(user.name)}
                                  </div>
                                ) : (
                                  "Log In"
                                )}
                              </button>
                              <p>{user?.name}</p>
                            </div>
                          </div>

                          {/* logout btn */}
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
                ) : (
                  <div>
                    <button onClick={() => loginWithRedirect()}>Log In</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
