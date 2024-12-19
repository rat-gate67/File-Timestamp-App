import React from 'react';
import { NavLink } from 'react-router-dom';

export function Navigation() {
  const baseClasses = "flex-1 py-3 text-center font-medium transition-colors";
  const activeClasses = "bg-white text-blue-600";
  const inactiveClasses = "text-gray-600 hover:text-blue-600";

  return (
    <nav className="bg-gray-100 rounded-lg p-1 mb-8">
      <div className="flex gap-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
          end
        >
          Generate Timestamp
        </NavLink>
        <NavLink
          to="/verify"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          Verify Timestamp
        </NavLink>
      </div>
    </nav>
  );
}