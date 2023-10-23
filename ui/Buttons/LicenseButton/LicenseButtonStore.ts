import { create } from 'zustand';
interface LicenseButtonProps {
licenseWindowOpen: boolean;
setLicenseWindowOpen: (licenseWindowOpen: boolean) => void 
id?: string | null
song: any
}

export const useLicensingStore = create<LicenseButtonProps>((set) => ({
    licenseWindowOpen:false,
    setLicenseWindowOpen: (licenseWindowOpen) => set({licenseWindowOpen}),
    id: '' || null,
    song: null
}))