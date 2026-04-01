import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Dashboard', to: '/' },
  { name: 'Account', to: '/account' },
  { name: 'Transactions', to: '/transactions' },
]

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-blue-500">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              
              {/* Mobile menu button */}
              <div className="flex items-center sm:hidden">
                <DisclosureButton className="p-2 text-white">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </DisclosureButton>
              </div>

              {/* Logo */}
              <div className="flex-1 flex items-center justify-center sm:justify-start">
                <h1 className="text-white font-bold text-xl"><Link to="/">BankApp</Link></h1>
              </div>

              {/* Desktop Menu */}
              <div className="hidden sm:flex sm:space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="text-white px-3 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <DisclosurePanel className="sm:hidden px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="block text-white px-3 py-2 rounded-md hover:bg-blue-600 transition"
              >
                {item.name}
              </Link>
            ))}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
