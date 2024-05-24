import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { Button } from '../Button'
import { NavbarProps } from './interface'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'

export const NavbarNormal: React.FC<NavbarProps> = ({
  isDevelopment,
  handleClicked,
}) => {
  const isRegisterClosed =
    (process.env.NEXT_PUBLIC_CLOSE_REGISTRATION as string) === 'true'

  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="flex justify-between h-20 items-center font-koblenz-bold px-6 gap-x-4 lg:gap-x-8 bg-white">
      <div className="flex w-1/5 relative items-center gap-4">
        <div className="relative cursor-pointer w-full">
          <Link href="/">
            <Image
              src='/logo.png'
              alt="logobetis2024"
              width={120}
              height={120}
              className="object-fill fill-inherit md:w-[120px] md:h-[120px] w-[80px] h-[80px]"
              priority
            />
          </Link>
        </div>
      </div>
      <div className="hidden lg:flex gap-x-4 lg:gap-x-4 xl:gap-x-8 justify-center w-3/5 text-black">
        <Link
          href="/"
          className="font-bold capitalize hover:text-[#3252C3] duration-200 "
        >
          Home
        </Link>
        <Link
          href="/shop"
          className="font-bold capitalize hover:text-[#3252C3] duration-200"
        >
          Shop
        </Link>
        {!!user && (
          <Link
            href="/cart"
            className="font-bold capitalize hover:text-[#3252C3] duration-200"
          >
            Cart
          </Link>
        )}
        {user && (
          <Link
            href="/supermarket"
            className="font-bold capitalize hover:text-[#3252C3] duration-200"
          >
            Supermarket
          </Link>
        )}
      </div>
      <div className="hidden lg:flex gap-x-4 lg:gap-x-4 xl:gap-x-8 w-1/5 justify-end">
        {!user ? (
          <div className="gap-x-4 lg:gap-x-4 xl:gap-x-8 flex items-center">
            <Link href="/login">
              <Button callToAction={true} btnType={'secondary'}>
                Login
              </Button>
            </Link>
            {!isRegisterClosed && (
              <Link href="/register">
                <Button callToAction={true} btnType={'primary'}>
                  Registration
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <Link href={'/dashboard'}>
              <div className="relative w-10 h-10 rounded-full bg-gray-300">
                <Image
                  src={'/profileImage.webp'}
                  fill
                  alt="Photo Profile"
                  className="object-fill"
                />
              </div>
            </Link>
            <Button btnType="secondary" callToAction onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
      <button
        onClick={handleClicked}
        className="lg:hidden text-[#3252C3] font-bold mr-10"
      >
        <Bars3Icon height={30} width={30} />
      </button>
    </div>
  )
}
