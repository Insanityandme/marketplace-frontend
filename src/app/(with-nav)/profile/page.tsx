import MyProfile from "@/app/(with-nav)/profile/components/Profile";
import Logout from "@/app/(with-nav)/profile/components/Logout";
import MyMarketplace from "@/app/(with-nav)/profile/components/MyMarketplace";

export default function Profile() {
  return (
    <div className="mx-auto mt-10 w-8/12 px-2">
      <MyProfile />
      <MyMarketplace />
      <Logout />
    </div>
  );
}
