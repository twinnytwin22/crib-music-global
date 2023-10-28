
const SongLicenseForm = ({song}) => {
    const sampleText =
    "For Businesses: Enterprises seeking the perfect musical backdrop for their commercial needs.";
  const forBusinessList = "Production Company, Agency, Brand, Non-Profit";
  const forCreatorsSub =
    "Creators: Individuals and artists looking to enhance their projects with our music.";
  const forCreatorsList =
    "Freelancers, YouTubers, Filmmakers, Podcasters, Social Media Influencers, Dancers and Choreographers, Educators";
  
    return (
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-full">
          <h2 className="mb-4 text-2xl tracking-tight font-extrabold text-center text-zinc-900 dark:text-white">
        {song?.title}
      </h2>
      <div className="relative  space-y-4">
        <div className="h-fit w-full flex flex-col space-y-4 p-4 border  border-zinc-200 dark:border-zinc-800 rounded">
          <h2 className="text-lg font-semibold text-center">
            For Creators
          </h2>
          <p className="text-sm text-center max-w-sm mx-auto">
            {forCreatorsSub}
          </p>
          <p className="text-xs text-center max-w-sm mx-auto">
            {forCreatorsList}
          </p>
  
          <button className="bg-zinc-100 mx-auto dark:hover:bg-zinc-950 dark:bg-black hover:bg-zinc-200 border border-zinc-200 dark:border-zinc-700 text-primary-800 ease-in-out duration-300 text-xs font-medium px-2 py-1.5 rounded">
            Boy Now
          </button>
        </div>
        <div className="w-full md:h-52 flex-col flex space-y-4 p-4 border rounded border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-center">
            For Business
          </h2>
          <p className="text-sm text-center max-w-sm mx-auto">
            {sampleText}
          </p>
          <p className="text-xs text-center max-w-sm mx-auto">
            {forBusinessList}
          </p>
  
          <button className="bg-zinc-100 mx-auto dark:hover:bg-zinc-950 dark:bg-black hover:bg-zinc-200 border border-zinc-200 dark:border-zinc-700 text-primary-800 ease-in-out duration-300 text-xs font-medium px-2 py-1.5 rounded">
            Contact Us
          </button>
        </div>
      </div>
    </div>
    )
  }

export default SongLicenseForm