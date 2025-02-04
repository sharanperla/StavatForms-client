import React from 'react'

function Header() {
  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Stavat</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/signin" className="text-gray-600 hover:text-gray-900">
                Sign In
              </a>
              <a
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Header
