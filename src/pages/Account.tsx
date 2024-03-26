import UploadImage from "../assets/UploadImage";
import { useLocation } from "react-router-dom";

const Account = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userImage = params.get("userImage");
  console.log(typeof userImage);
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
          Learn more about your profile and visibility{" "}
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
          <header className="flex items-center justify-between p-4">
            <div>
              <UploadImage />
              <p className="mt-2 text-sm">Update your header image</p>
            </div>
            <input type="file" accept=".jpg,.png" className="hidden" />
          </header>
        </div>
        <div className="mt-10 ml-10">
          <div className="h-20 w-20 bg-white rounded-full cursor-default flex items-center justify-center shadow-md border border-white">
            <img
              src={userImage || ""}
              alt="Profile"
              className="max-h-full max-w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
