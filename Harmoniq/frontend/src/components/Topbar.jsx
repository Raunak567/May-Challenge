import React, { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import SignInOAuthButtons from "./SignInOAuthButtons";
import SearchSongs from "./SearchSongs";

const Topbar = () => {
  
  const [dropdown, setDropdown] = useState({
    notifications: false,
    messages: false,
    friends: false,
  });

  const [friendName, setFriendName] = useState("");
  const [friends, setFriends] = useState(["Sarah", "John"]);

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
      <SearchSongs />

      {/* Right side */}
      <div className="flex items-center gap-4 relative">

        <SignedIn>
          <div className="flex items-center gap-4 relative">
            {/* Notifications */}
            <div className="relative ">
              <button
                className="action-btn "
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