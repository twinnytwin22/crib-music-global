import Link from 'next/link'

function Button({href, text}) {
  return (
  
    <Link href={href}>
    <button
    className="dark:text-black font-owners text-white bg-black hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-white dark:hover:bg-zinc-200 dark:focus:ring-zinc-800 ease-in-out duration-300"
    > {text}
    </button>
    </Link>
  )
}

export default Button