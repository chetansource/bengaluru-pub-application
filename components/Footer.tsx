import Link from "next/link"

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 z-20 h-14 lg:h-18 w-full p-4 bg-white border-t-2 border-black shadow flex  items-center justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
            <span className="text-sm text-black-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">BADD</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-black-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="/about" className="mr-4  hover:underline md:mr-6">About</a>
                </li>
                {/* <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
                </li> */}
                {/* <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li> */}
            </ul>
        </footer>

        // <div className="h-12 p-7 flex items-center justify-between bg-slate-200">
        //     <Link href="/" className="font-bold text-xl"> NBP </Link>
        //     <p> ALL RIGHTS RESERVED. </p>
        // </div>
        // fixed bottom-0 left-0
    )
}