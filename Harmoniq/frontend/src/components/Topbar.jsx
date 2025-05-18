import { LayoutDashboardIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';
import { SignedIn, SignedOut, SignIn, SignOutButton } from '@clerk/clerk-react';
import SignInOAuthButtons from './SignInOAuthButtons'; 

const Topbar = () => {
  const isAdmin = false;

  return (
    <div className='flex items-center justify-between p-4 sticky top-0'>
      <div className='flex gap-2 items-center'>
        Spotify
      </div>
      <div className='flex items-center gap-2'>
        {isAdmin && (
          <Link to="/admin" className='flex items-center'>
            <LayoutDashboardIcon className='size-4 mr-2' />
            Admin Dashboard
          </Link>
        )}

        <SignedIn>
            <SignOutButton />
        </SignedIn>

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
      </div>
    </div>
  );
};

export default Topbar;
