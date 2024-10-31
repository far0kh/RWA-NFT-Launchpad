import { Button } from '@/components/ui/button'
import Link from "next/link";

export default function Header() {
  return (
    <header className='p-4'>
      <nav className='max-w-6xl mx-auto flex items-center justify-between'>
        <div className="flex gap-5 item-center">
          <Link href="https://www.tezuka.xyz" className="flex items-center space-x-1 rtl:space-x-reverse">
            <img src="/logos/logo-wide.webp" className="h-8" alt="Tezuka Logo" />
          </Link>
        </div>
        <div className='flex items-center text-green-500'>
          Artist Login
        </div>
      </nav>
    </header>
  )
}