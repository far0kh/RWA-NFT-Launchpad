'use client'

const Header = () => {
  return (
    <section className="antialiased w-full" id="Header">
      <nav className="w-full top-0 left-0 px-2 bg-white border-gray-200 dark:bg-black/90 z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://www.tezuka.xyz" className="flex items-center space-x-1 rtl:space-x-reverse">
            <img src="/logos/logo.webp" className="md:hidden h-12" alt="Tezuka Logo" />
            <img src="/logos/logo-wide.webp" className="hidden md:block h-12" alt="Tezuka Logo" />
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <p className="text-green-600 px-4 py-2 text-center text-lg font-semibold">
              Artist Login
            </p>
          </div>
        </div>
      </nav>
    </section>
  )
}

export default Header