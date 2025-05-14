import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? 'block px-3 py-2 rounded bg-gray-700'
                : 'block px-3 py-2 rounded hover:bg-gray-700'
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/posts"
            className={({ isActive }) =>
              isActive
                ? 'block px-3 py-2 rounded bg-gray-700'
                : 'block px-3 py-2 rounded hover:bg-gray-700'
            }
          >
            Posts
          </NavLink>
          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              isActive
                ? 'block px-3 py-2 rounded bg-gray-700'
                : 'block px-3 py-2 rounded hover:bg-gray-700'
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/admin/announcements"
            className={({ isActive }) =>
              isActive
                ? 'block px-3 py-2 rounded bg-gray-700'
                : 'block px-3 py-2 rounded hover:bg-gray-700'
            }
          >
            Announcements
          </NavLink>
          <NavLink
            to="/admin/pdf"
            className={({ isActive }) =>
              isActive
                ? 'block px-3 py-2 rounded bg-gray-700'
                : 'block px-3 py-2 rounded hover:bg-gray-700'
            }
          >
            PDF Reports
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
