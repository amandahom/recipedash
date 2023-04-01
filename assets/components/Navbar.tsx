import { useClerk } from '@clerk/clerk-react'
import { useAuth } from '@clerk/nextjs'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
// import { signIn, signOut, useSession } from 'next-auth/client'
import { Fragment } from 'react'
interface NavInterface {
  title: string
  url: string
}

interface ProfileInterface {
  title: string
  url: string
}

export const NavItems: NavInterface[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
  },
  {
    title: 'My Recipes',
    url: '/recipes',
  },
  {
    title: 'Post a new Recipe',
    url: '/create-recipe',
  },
]

export const ProfileItems: ProfileInterface[] = [
  {
    title: 'Profile & Settings',
    url: '/profile',
  },
]

function Navbar() {
  // const [session] = useSession()
  const { isLoaded, userId, sessionId, getToken } = useAuth()
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }
  const { signOut } = useClerk()
  return (
    <>
      {!userId && (
        <>
          <div>
            <Disclosure as="nav" className="bg-gray-800">
              {() => (
                <>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <a href="/">
                            <img
                              className="h-10 w-10 bg-white cursor-pointer"
                              src="https://cdn2.iconfinder.com/data/icons/kitchenware-solid-cookery/512/Recipe_Book-256.png"
                              alt="Recipe Book"
                            />
                          </a>
                        </div>
                      </div>
                      <Link href="/sign-in">
                        <button className="inline-block w-auto bg-purple-500 hover:bg-purple-700  shadow-xl font-medium text-white px-4 py-3 rounded transition ease-in duration-150 focus:outline-none">
                          Sign in & View Demo
                        </button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </Disclosure>
          </div>
        </>
      )}
      {userId && (
        <>
          <div>
            <Disclosure as="nav" className="bg-gray-800">
              {({ open }) => (
                <>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <a href="/">
                            <img
                              className="h-10 w-10 bg-white cursor-pointer"
                              src="https://cdn2.iconfinder.com/data/icons/kitchenware-solid-cookery/512/Recipe_Book-256.png"
                              alt="Recipe Book"
                            />
                          </a>
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            {NavItems.map((item, index) =>
                              index === 0 ? (
                                <Fragment key={item.title}>
                                  <a
                                    href={item.url}
                                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                                  >
                                    {item.title}
                                  </a>
                                </Fragment>
                              ) : (
                                <a
                                  key={item.title}
                                  href={item.url}
                                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                  {item.title}
                                </a>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          <Menu as="div" className="ml-3 relative">
                            {({ open }) => (
                              <>
                                <div>
                                  <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none">
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                      className="h-8 w-8 rounded-full bg-white"
                                      src="https://cdn2.iconfinder.com/data/icons/ui-line-pixel-perfect/32/media-ui-line_profile_user_media_ui-256.png"
                                      alt=""
                                    />
                                  </Menu.Button>
                                </div>
                                <Transition
                                  show={open}
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items
                                    static
                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                  >
                                    {ProfileItems.map((item) => (
                                      <Menu.Item key={item.title}>
                                        {({ active }) => (
                                          <a
                                            href={item.url}
                                            className={classNames(
                                              active ? 'bg-gray-100' : '',
                                              'block px-4 py-2 text-sm text-gray-700',
                                            )}
                                          >
                                            {item.title}
                                          </a>
                                        )}
                                      </Menu.Item>
                                    ))}
                                    <Menu.Item key="sign-out">
                                      {({ active }) => (
                                        <button onClick={() => signOut()}>
                                          <a
                                            className={classNames(
                                              active ? 'bg-gray-100' : '',
                                              'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
                                            )}
                                            // onClick={() => signOut({ callbackUrl: 'https://recipedash.amandahom.com/' })}
                                          >
                                            Sign out
                                          </a>
                                        </button>
                                      )}
                                    </Menu.Item>
                                  </Menu.Items>
                                </Transition>
                              </>
                            )}
                          </Menu>
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                          ) : (
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>

                  <Disclosure.Panel className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                      {NavItems.map((item, index) =>
                        index === 0 ? (
                          <Fragment key={item.title}>
                            <a
                              href={item.url}
                              className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                            >
                              {item.title}
                            </a>
                          </Fragment>
                        ) : (
                          <a
                            key={item.title}
                            href={item.url}
                            className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                          >
                            {item.title}
                          </a>
                        ),
                      )}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-700">
                      <div className="px-2 space-y-1">
                        {ProfileItems.map((item) => (
                          <a
                            key={item.title}
                            href={item.url}
                            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                          >
                            {item.title}
                          </a>
                        ))}
                        <button onClick={() => signOut()}>
                          <a
                            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                            // onClick={() => signOut({ callbackUrl: 'https://recipedash.amandahom.com/' })}
                          >
                            Sign out
                          </a>
                        </button>
                      </div>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </>
      )}
    </>
  )
}

export default Navbar
