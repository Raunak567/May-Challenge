import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon, Bell, Mail, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Topbar = () => {
  const { isAdmin } = useAuthStore();

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10 border-b border-gray-800">
      {/* Search bar */}
      <div className="flex items-center bg-gray-800 bg-opacity-50 rounded-full px-4 py-2 w-96">
        <i className="fas fa-search text-gray-400 mr-2"></i>
        <input
          type="text"
          placeholder="Search songs, artists, or tags..."
          className="bg-transparent border-none focus:outline-none text-white w-full"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to="/admin" className={cn(buttonVariants({ variant: "outline" }))}>
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}

        <SignedIn>
          {/* Notification Icons */}
          <div className="flex items-center space-x-4">
            {/* Bell with badge */}
            <div className="relative">
			<button class="action-btn notification-btn" title= "Notification">
            	<i class="fas fa-bell"></i>
            </button>
            </div>

            {/* Add Friend */}
            <div className="relative">
			<button class="action-btn friend-btn" title= "Add Friend">
                <i class="fas fa-user-plus"></i>
            </button>
            </div>

            {/* Mail with badge */}
            <div className="relative">
			<button class="action-btn message-btn" title= "Massage">
                <i class="fas fa-envelope"></i>
            </button>
            </div>

            {/* User profile */}
            <UserButton />
          </div>
        </SignedIn>

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
      </div>
    </div>
  );
};

export default Topbar;
