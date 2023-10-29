import BuildGrantForm from "../BuildGrantForm"

function CustomMusicForm() {
  return (
    <section className="">
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-full">
        <h2 className="mb-4 text-2xl tracking-tight font-extrabold text-center text-zinc-900 dark:text-white">Custom Music Request</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-zinc-500 dark:text-zinc-400 ">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
       <BuildGrantForm/>
    </div>
  </section>
  )
}

export default CustomMusicForm