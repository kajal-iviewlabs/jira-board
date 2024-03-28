import { useState } from "react";
import InfoIcon from "../assets/InfoIcon";
import UploadImage from "../assets/UploadImage";
import { useLocation } from "react-router-dom";
import WorldIcon from "../assets/WorldIcon";
import { useAuth0 } from "@auth0/auth0-react";

const Account = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userImage = params.get("userImage");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuth0();
  const [isImgDropdownOpen, setIsImgDropdownOpen] = useState(false);
  const [isHeaderImageSet, setIsHeaderImageSet] = useState(false);

  const toggleImgDropdown = () => {
    setIsImgDropdownOpen(!isDropdownOpen);
  };

  const handleRemoveHeaderImage = () => {
    const header = document.querySelector(".header1") as HTMLElement;
    if (header) {
      header.style.backgroundImage = "";
    }
    setIsHeaderImageSet(false);
    setIsImgDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target) {
      return;
    }

    const file = e.target.files ? e.target.files[0] : null;

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      const imageSrc = e?.target?.result as string;
      const header = document.querySelector(".header1") as HTMLElement;

      if (header) {
        header.style.backgroundImage = `url('${imageSrc}')`;
        header.style.backgroundSize = "cover"; // Ensure image covers the header area
        header.style.backgroundPosition = "center"; // Center the image
      }
    };

    reader.readAsDataURL(file);

    setIsHeaderImageSet(true);
    setIsImgDropdownOpen(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">
        Profile and visibility
      </h1>
      <div className="mb-4">
        <p className="mb-2">
          Manage your personal information, and control which information other
          people see and apps may access.
        </p>
        <a
          href="https://support.atlassian.com/atlassian-account/docs/update-your-profile-and-visibility-settings/"
          className="text-blue-500 hover:underline"
        >
          Learn more about your profile and visibility
          <span className="mx-1">or</span>
        </a>
        <a
          href="https://www.atlassian.com/legal/privacy-policy#what-this-policy-covers"
          className="text-blue-500 hover:underline"
        >
          view our privacy policy.
        </a>
      </div>
      <h3 className="text-lg font-semibold mb-4 text-blue-900">
        Profile photo and header image
      </h3>
      <div className="relative rounded-md shadow-md overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-112 rounded-t-md">
          <header
            className="flex items-center justify-center p-4 group header1"
            onClick={toggleImgDropdown}
          >
            <div className="flex flex-col items-center justify-center ">
              <UploadImage />
              <p className="mt-2 text-sm">Update your header image</p>
              <input
                type="file"
                accept=".jpg,.png"
                className="hidden absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer group-hover:block"
                onChange={handleFileChange}
              />
            </div>
          </header>
          {isImgDropdownOpen && (
            <div className="absolute flex flex-col bg-gray-100 top-20 right-24 mt-2 bg-white p-2 rounded shadow-md">
              <button onClick={() => handleFileChange}>Add header image</button>
              {isHeaderImageSet && (
                <button onClick={handleRemoveHeaderImage}>
                  Remove header image
                </button>
              )}
            </div>
          )}
        </div>
        <div className="relative absolute top-10 left5 block mt-10 ml-10">
          <div className="h-20 w-20  bg-red-600 rounded-full cursor-default flex items-center justify-center shadow-md border border-gray-100">
            <div className="text-gray-100 text-4xl">{userImage}</div>
          </div>
        </div>
        <div className="mt-112 p-0 h-28 bg-blue-900">
          <div className="flex items-center w-200">
            <span className="text-xs text-gray-100 justify-end mr-2 flex items-center leading-4 mb-2 pl-2 w-full">
              Who can see your profile photo?
              <span
                className="cursor-pointer relative inline-block ml-1/2 v-middle"
                onClick={toggleDropdown}
              >
                <InfoIcon />
                {isDropdownOpen && (
                  <div className="absolute bg-gray-100 top-5 right-3 bg-white border border-gray-200 p-2 mt-1 text-blue-900 rounded shadow-md p-4 w-64 h-auto ">
                    <p>
                      Your visibility setting only applies to your profile
                      photo. Your header image is always visible to anyone.
                    </p>
                  </div>
                )}
              </span>
            </span>
          </div>
          <div className="flex text-gray-100 justify-end mr-4">
            <WorldIcon />
            <span className="ml-2">Anyone</span>
          </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold mt-3 mb-4 text-blue-900">Contact</h3>
      <div className="flex flex-col p-5 md:p-4 rounded-lg shadow-md bg-white">
        <span className="text-xs text-gray-500 leading-4 mb-1 md:mb-2">
          Email address
        </span>
        <span>{user?.email}</span>
      </div>
    </div>
  );
};

export default Account;
