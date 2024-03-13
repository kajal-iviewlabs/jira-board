import { useState } from "react";
import "./header.css";
import { useAuth0 } from "@auth0/auth0-react";
import Project from "./Project";
import { Link } from "react-router-dom";
import HomeIcon from "../assets/HomeIcon";
import ArrowIcon from "../assets/ArrowIcon";
import SearchIcon from "../assets/SearchIcon";

const Header = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [projectDropDown, setprojectDropDown] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleprojectDropDown = () => {
    setprojectDropDown(!projectDropDown);
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
              <HomeIcon />
            </div>
            <div className="outer-menu">
              {/* Your Work */}
              <div role="listitem" className="div-btn">
                <div className="inner-div">
                  <Link to="work" className="work">
                    Your work
                  </Link>
                  <span className="work-span">
                    <ArrowIcon />
                  </span>
                </div>
              </div>

              {/* Projects */}
              <div role="listitem" className="div-btn">
                <div className="inner-div" onMouseEnter={toggleprojectDropDown}>
                  <Link to="projects" className="projects">
                    Projects
                  </Link>
                  <ArrowIcon />
                </div>
                {projectDropDown && <Project />}
              </div>

              {/* More */}
              <div role="listitem" className="div-btn">
                <div className="inner-div">
                  <Link to="more" className="more">
                    More
                  </Link>
                  <span className="more-span">
                    <ArrowIcon />
                  </span>
                </div>
              </div>

              {/* create */}
              <div role="listitem" className="div-btn">
                <div className="inner-div">
                  <Link to="create" className="create">
                    Create
                  </Link>
                  <ArrowIcon />
                </div>
              </div>
            </div>
          </nav>
          <div className="header-right">
            <div className="inner-right-header">
              <div role="presentation">
                <div role="search" className="search-img-div">
                  <span className="search-img">
                    <SearchIcon />
                  </span>
                  <input
                    className="search-input"
                    placeholder="Search"
                    // maxLength="500"
                    // value=""
                  />
                </div>
              </div>
              <div>
                {/* Login DropDown */}

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
        {/* <LeftMenu /> */}
      </div>
    </>
  );
};

export default Header;
