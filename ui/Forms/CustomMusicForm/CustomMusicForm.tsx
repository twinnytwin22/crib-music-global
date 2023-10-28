
function CustomMusicForm() {
  return (
    <section className="">
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-full">
        <h2 className="mb-4 text-2xl tracking-tight font-extrabold text-center text-zinc-900 dark:text-white">Custom Music Request</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-zinc-500 dark:text-zinc-400 ">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
        <form action="#" className="space-y-8">
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-300">Your email</label>
                <input type="email" id="email" className="shadow-sm bg-zinc-100 border border-zinc-300 text-zinc-900 text-sm rounded focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-zinc-950 dark:border-zinc-800 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required/>
            </div>
            <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-300">Subject</label>
                <input type="text" id="subject" className="block p-3 w-full text-sm text-zinc-900 bg-white rounded border border-zinc-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-zinc-950 dark:border-zinc-800 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required/>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-400">Your message</label>
                <textarea id="message" rows={6}className="block p-2.5 w-full text-sm text-zinc-900 bg-zinc-50 rounded shadow-sm border border-zinc-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-zinc-950 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
            </div>
            <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-black rounded bg-red-300 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
        </form>
    </div>
  </section>
  )
}

export default CustomMusicForm