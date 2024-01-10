import '@/styles/globals.css'
import Link from 'next/link';
import Image from 'next/image'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen justify-between bg-gradient-to-b from-transparent to-gray-100 text-black">
      <header className="bg-gradient-to-b from-transparent to-gray-800 text-white p-4">
        <nav className="container mx-auto flex justify-between h-32">
          <div className="flex flex-row gap-4 items-center">
            <img src="\MyAnimeList_Logo.jpeg" width="150" height="150" alt={''} />
          </div>
          <div>
            <Link href="/" className="text-xl mr-4">Home</Link>
            <Link href="/animes" className="text-xl mr-4">Animes</Link>
            <Link href="/help" className="text-xl">Blogs</Link>
          </div>
          <div>
            <Link href="/" className="text-3xl font-bold">My Anime List</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto p-4 flex-grow">
        <Component {...pageProps} key={router.route}/>
      </main>

      <footer className="bg-gradient-to-t from-transparent to-gray-700 text-white text-center p-4">
        <div className="container mx-auto">
          <p>© 2024 MAL</p>
        </div>
      </footer>
    </div>
  )
};
