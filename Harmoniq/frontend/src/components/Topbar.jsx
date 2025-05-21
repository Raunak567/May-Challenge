import React, { useState, useEffect } from "react";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/clerk-react";
import { LayoutDashboardIcon, Search } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { useMusicStore } from "../stores/useMusicStore";
import { ScrollArea } from "./ui/scroll-area";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  const { isSignedIn } = useAuth();
  const { songs, albums, fetchSongs, fetchAlbums } = useMusicStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [dropdown, setDropdown] = useState({
    notifications: false,
    messages: false,
    friends: false,
  });

  const [friendName, setFriendName] = useState("");
  const [friends, setFriends] = useState(["Sarah", "John"]);

  useEffect(() => {
    if (isSignedIn) {
      fetchSongs();
      fetchAlbums();
    }
  }, [fetchSongs, fetchAlbums, isSignedIn]);

  const filteredResults = {
    songs: songs?.filter(
      (song) =>
        song?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song?.artist?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [],
    albums: albums?.filter(
      (album) =>
        album?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album?.artist?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [],
  };

  const toggleDropdown = (key) => {
    setDropdown({
      notifications: false,
      messages: false,
      friends: false,
      [key]: !dropdown[key],
    });
  };

  const addFriend = () => {
    const trimmed = friendName.trim();
    if (trimmed && !friends.includes(trimmed)) {
      setFriends((prev) => [...prev, trimmed]);
      setFriendName("");
    }
  };

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10 border-b border-gray-800">
      {/* Search bar */}
      <div className="relative flex items-center bg-gray-800 bg-opacity-50 rounded-full px-4 py-2 w-96">
        <Search className="text-gray-400 size-4 mr-2" />
        <input
          type="text"
          placeholder="Search songs, artists, or tags..."
          className="bg-transparent border-none focus:outline-none text-white w-full"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowResults(e.target.value.length > 0);
          }}
          onFocus={() => setShowResults(searchQuery.length > 0)}
        />
        
        {/* Search Results Dropdown */}
        {showResults && searchQuery && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg z-50 max-h-[60vh] overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-4">
                {/* Songs Section */}
                {filteredResults.songs.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-zinc-400 mb-2">Songs</h3>
                    <div className="space-y-2">
                      {filteredResults.songs.map((song) => (
                        <Link
                          key={song._id}
                          to={`/songs/${song._id}`}
                          className="flex items-center gap-3 p-2 hover:bg-zinc-700 rounded-md transition-colors"
                          onClick={() => setShowResults(false)}
                        >
                          <img
                            src={song.imageUrl}
                            alt={song.title}
                            className="size-10 rounded-md object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium">{song.title}</p>
                            <p className="text-xs text-zinc-400">{song.artist}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Albums Section */}
                {filteredResults.albums.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-400 mb-2">Albums</h3>
                    <div className="space-y-2">
                      {filteredResults.albums.map((album) => (
                        <Link
                          key={album._id}
                          to={`/albums/${album._id}`}
                          className="flex items-center gap-3 p-2 hover:bg-zinc-700 rounded-md transition-colors"
                          onClick={() => setShowResults(false)}
                        >
                          <img
                            src={album.imageUrl}
                            alt={album.title}
                            className="size-10 rounded-md object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium">{album.title}</p>
                            <p className="text-xs text-zinc-400">{album.artist}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {filteredResults.songs.length === 0 && filteredResults.albums.length === 0 && (
                  <p className="text-sm text-zinc-400 text-center py-4">No results found</p>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 relative">
        {isAdmin && (
          <Link to="/admin" className={cn(buttonVariants({ variant: "outline" }))}>
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}

        <SignedIn>
          <div className="flex items-center gap-4 relative">
            {/* Notifications */}
            <div className="relative">
              <button
                className="action-btn"
                title="Notifications"
                onClick={() => toggleDropdown("notifications")}
              >
                <i className="fas fa-bell text-white"></i>
              </button>
              {dropdown.notifications && (
                <div className="absolute right-0 mt-2 w-64 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg z-50">
                  <div className="p-4 text-sm text-white">No new notifications.</div>
                </div>
              )}
            </div>

            {/* Add Friend */}
            <div className="relative">
              <button
                className="action-btn"
                title="Add Friend"
                onClick={() => toggleDropdown("friends")}
              >
                <i className="fas fa-user-plus text-white"></i>
              </button>
              {dropdown.friends && (
                <div className="absolute right-0 mt-2 w-72 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg z-50 p-4 text-white">
                  <div>
                    <p className="text-sm mb-2">Add a new friend:</p>
                    <input
                      type="text"
                      value={friendName}
                      onChange={(e) => setFriendName(e.target.value)}
                      placeholder="Username"
                      className="w-full px-3 py-2 bg-zinc-700 text-white rounded mb-2"
                    />
                    <button
                      onClick={addFriend}
                      className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded"
                    >
                      Send Request
                    </button>
                  </div>
                  <hr className="my-3 border-zinc-600" />
                  <p className="text-sm font-semibold mb-2">Friends List:</p>
                  <ul className="space-y-1 max-h-32 overflow-y-auto text-sm">
                    {friends.map((friend, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <i className="fas fa-user text-purple-400"></i>
                        <span>{friend}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="relative">
              <button
                className="action-btn"
                title="Messages"
                onClick={() => toggleDropdown("messages")}
              >
                <i className="fas fa-envelope text-white"></i>
              </button>
              {dropdown.messages && (
                <div className="absolute right-0 mt-2 w-64 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg z-50">
                  <div className="p-4 text-sm text-white">No new messages.</div>
                </div>
              )}
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