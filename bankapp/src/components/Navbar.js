// import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// import { Link, useNavigate } from 'react-router-dom'
// import { signOut, onAuthStateChanged } from 'firebase/auth'
// import { auth } from '../firebase/config'
// import { useEffect, useState } from 'react'

// const navigation = [
//   { name: 'Dashboard', to: '/' },
//   { name: 'Account', to: '/account' },
//   { name: 'Transactions', to: '/transactions' },
// ]

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function Navbar() {
//   const navigate = useNavigate()
//   const [user, setUser] = useState(null)

//   // ✅ Track login/logout
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser)
//     })
//     return () => unsubscribe()
//   }, [])

//   async function handleLogout() {
//     try {
//       await signOut(auth)
//       navigate('/')
//     } catch (error) {
//       console.error('Error signing out:', error)
//     }
//   }

//   return (
//     <Disclosure as="nav" className="relative bg-blue-500">
//       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//         <div className="relative flex h-16 items-center justify-between">

//           {/* Mobile menu button */}
//           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//             <DisclosureButton className="p-2 text-white">
//               <Bars3Icon className="h-6 w-6" />
//             </DisclosureButton>
//           </div>

//           {/* Logo */}
//           <h1 className="text-white font-bold">BankApp</h1>

//           {/* Desktop Menu */}
//           <div className="hidden sm:flex sm:space-x-4">
//             {user ? (
//               <>
//                 {navigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     to={item.to}
//                     className="text-white px-3 py-2 rounded-md hover:bg-blue-600"
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//                 <button
//                   onClick={handleLogout}
//                   className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="text-white px-3 py-2">Login</Link>
//                 <Link to="/signup" className="text-white px-3 py-2">Signup</Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <DisclosurePanel className="sm:hidden px-2 pb-3 space-y-1">
//         {user ? (
//           <>
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.to}
//                 className="block text-white px-3 py-2"
//               >
//                 {item.name}
//               </Link>
//             ))}
//             <button
//               onClick={handleLogout}
//               className="block w-full text-left bg-red-600 text-white px-3 py-2 rounded-md"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="block text-white px-3 py-2">Login</Link>
//             <Link to="/signup" className="block text-white px-3 py-2">Signup</Link>
//           </>
//         )}
//       </DisclosurePanel>
//     </Disclosure>
//   )
// }

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
                <h1 className="text-white font-bold text-xl">BankApp</h1>
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
