'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { useSession, signOut } from "next-auth/react"
import { User } from '@/interface/User'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()
  const user: User = session?.user

  const getNavItems = () => {
    if (session) {
      return [
        { href: '/', label: 'Home' },
        { href: '/analyze', label: 'Analyze' },
        { href: '#', label: 'Logout', onClick: () => signOut() }
      ]
    } else {
      return [
        { href: '/', label: 'Home' },
        { href: '/analyze', label: 'Analyze' },
        { href: '/login', label: 'Login' },
        { href: '/register', label: "Register" }
      ]
    }
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold">
        Sentiment Analytics
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-text md:hidden"
      >
        <Menu />
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-4">
        {getNavItems().map((item) => (
          item.onClick ? (
            <button 
              key={item.label}
              onClick={item.onClick}
              className={`
                px-4 py-2 rounded-2xl 
                font-bold 
                ${pathname === item.href 
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100 text-gray-700'
                }
              `}
            >
              {item.label}
            </button>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className={`
                px-4 py-2 rounded-2xl 
                font-bold 
                ${pathname === item.href 
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100 text-gray-700'
                }
              `}
            >
              {item.label}
            </Link>
          )
        ))}
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
          {getNavItems().map((item) => (
            item.onClick ? (
              <button
                key={item.label}
                onClick={() => {
                  item.onClick()
                  setIsMenuOpen(false)
                }}
                className={`
                  px-4 py-2 rounded-2xl w-full text-center transition-all duration-300
                  font-bold
                  ${pathname === item.href
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                  }
                `}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  px-4 py-2 rounded-2xl w-full text-center transition-all duration-300
                  font-bold
                  ${pathname === item.href
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                  }
                `}
              >
                {item.label}
              </Link>
            )
          ))}
        </div>
      )}
    </nav>
  )
}