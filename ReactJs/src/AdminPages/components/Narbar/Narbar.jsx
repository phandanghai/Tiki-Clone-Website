import React from 'react';

// Navbar component
const Navbar = () => {
  return (
    <nav className="navbar bg-main-bg flex items-center justify-between px-20 py-4 shadow-md">
      {/* Logo section */}
      <div className="logo flex items-center">
        <img src="logo.svg" alt="Logo" className="h-6 mr-4" />
        <span className="text-xl font-bold text-white">lamadmin</span>
      </div>

      {/* Icons section */}
      <div className="icons flex items-center gap-4">
        <img src="/search.svg" alt="Search" className="icon w-6 h-6 cursor-pointer" />
        <img src="/app.svg" alt="App" className="icon w-6 h-6 cursor-pointer" />
        <img src="/expand.svg" alt="Expand" className="icon w-6 h-6 cursor-pointer" />

        {/* Notification section */}
        <div className="notification relative">
          <img
            src="/notifications.svg"
            alt="Notifications"
            className="icon w-6 h-6 cursor-pointer"
          />
          <span className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full px-2 font-bold text-xs">
            1
          </span>
        </div>

        {/* User section */}
        <div className="user flex items-center gap-4">
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt="User profile"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-white">Jane</span>
        </div>

        <img src="/settings.svg" alt="Settings" className="icon w-6 h-6 cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
