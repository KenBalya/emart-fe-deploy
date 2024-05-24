import React from 'react'
import { Transition } from '@headlessui/react'
import Link from 'next/link'
import { DrawerProps } from './interface'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'

export const Drawer: React.FC<DrawerProps> = ({ isClicked, closeNavbar }) => {
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    closeNavbar()
    router.push('/login')
  }

  return (
    <Transition
      as="div"
      className=""
      show={isClicked}
      enter="transition-opacity duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex flex-col z-50">
        <div className="flex flex-col border-t-2">
        <button
            onClick={closeNavbar}
            className="z-40 w-full text-black capitalize font-bold"
          >
            <Link
              href="/"
              className={`bg-white text-start block w-full h-full px-4 py-5`}
            >
              Home
            </Link>
          </button>
          <button
            onClick={closeNavbar}
            className="z-40 w-full text-black capitalize font-bold"
          >
            <Link
              href="/store"
              className={`bg-white text-start block w-full h-full px-4 py-5`}
            >
              Store
            </Link>
          </button>
          {user && (
            <button
              onClick={closeNavbar}
              className="z-40 w-full text-black capitalize font-bold"
            >
              <Link
                href="/cart"
                className={`bg-white text-start block w-full h-full px-4 py-5`}
              >
                Cart
              </Link>
            </button>
          )}

          {user && user.role === "MANAGER" && (
            <button
              onClick={closeNavbar}
              className="z-40 w-full text-black capitalize font-bold"
            >
              <Link
                href="/my-supermarket"
                className={`bg-white text-start block w-full h-full px-4 py-5`}
              >
                My Supermarket
              </Link>
            </button>
          )}
          {user && user.role === "ADMIN" && (
            <button
              onClick={closeNavbar}
              className="z-40 w-full text-black capitalize font-bold"
            >
              <Link
                href="/manage-supermarket"
                className={`bg-white text-start block w-full h-full px-4 py-5`}
              >
                Manage Supermarket
              </Link>
            </button>
          )}
          <button
            onClick={closeNavbar}
            className="z-40 w-full text-black capitalize font-bold"
          >
            <Link
              href="/leaderboard"
              className={`bg-white text-start block w-full h-full px-4 py-5`}
            >
              Leaderboard
            </Link>
          </button>
          <button
            onClick={closeNavbar}
            className="z-40 w-full text-black capitalize font-bold"
          >
            <Link
              href="/betis-shop"
              className={`bg-white text-start block w-full h-full px-4 py-5`}
            >
              Betis Shop
            </Link>
          </button>
          {user ? (
            <>
              <button
                onClick={closeNavbar}
                className="z-40 text-black capitalize font-bold"
              >
                <Link
                  href="/profile"
                  className={`bg-white text-start block w-full h-full px-4 py-5`}
                >
                  Profile
                </Link>
              </button>
              <button
                className={`bg-white px-4 py-5 z-40 text-red-500 text-left capitalize font-bold`}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className={`bg-btn-primary text-white px-4 py-5 rounded-b-md`}
            >
              <div className="z-40 text-white capitalize font-bold">Login</div>
            </Link>
          )}
        </div>
      </div>
    </Transition>
  )
}
