'use client'

import { useLicensingStore } from "./LicenseButtonStore"

function LicenseButton({id, song}) {

const handleSetId = () => {
    useLicensingStore.setState({ licenseWindowOpen: true, id, song})
    const setId = useLicensingStore.getState().id
    console.log(song, 'SET ID')
}


  return (
    <button
    onClick={handleSetId}
    className="bg-zinc-100 dark:hover:bg-zinc-950 dark:bg-black hover:bg-zinc-200 border border-zinc-200 dark:border-zinc-700 text-primary-800 ease-in-out duration-300 text-xs font-medium px-2 py-1.5 rounded">
    License
  </button>
  )
}

export default LicenseButton