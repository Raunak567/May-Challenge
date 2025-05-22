import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, MessageCircle, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

const navItems = [
  ['Moods', 'smile-beam', '/moods'],
  ['Karaoke', 'microphone-alt', '/karaoke'],
  ['Library', 'compact-disc', '/library'],
  ['Tags', 'tags', '/tags'],
  ['Settings', 'sliders-h', '/settings'],
];

const LeftSidebar = () => {
  const location = useLocation();
  const { isAdmin } = useAuthStore();

  return (
    <div className='h-full flex flex-col gap-2'>
      {/* Top nav */}
      <div className="p-6">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <i className="fas fa-music mr-2 text-purple-500"></i>
              Harmoniq
          </h1>
      </div>
      <div className='rounded-lg bg-zinc-900 p-4'>
        <div className='space-y-2'>
          <Link
            to="/"
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-gray-800 hover:bg-opacity-50 hover:text-white",
              })
            )}
          >
            <HomeIcon className='mr-2 size-5' />
            <span className='hidden md:inline'>Home</span>
          </Link>

          <SignedIn>
            <Link
              to="/chat"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full justify-start text-white hover:bg-gray-800 hover:bg-opacity-50 hover:text-white",
                })
              )}
            >
              <MessageCircle className='mr-2 size-5' />
              <span className='hidden md:inline'>Messages</span>
            </Link>

            {isAdmin && (
              <Link
                to="/admin" 
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    className: "w-full justify-start text-white hover:bg-gray-800 hover:bg-opacity-50 hover:text-white",
                  })
                )}
              >
                <Settings className='mr-2 size-5' />
                <span className='hidden md:inline'>Admin Dashboard</span>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      {/* Nav list */}
      <nav className="h-full flex flex-col gap-2">
        <div className='flex-1 rounded-lg bg-zinc-900 p-4'>
          <div className='space-y-2'>
            <div className='flex flex-col gap-1'>
              {navItems.map(([label, icon, path], i) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={i}
                    to={path}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg transition-colors duration-200",
                      isActive
                        ? "bg-purple-900 bg-opacity-30 text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:bg-opacity-50 hover:text-white"
                    )}
                  >
                    <i className={`fas fa-${icon} mr-3`}></i>
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
