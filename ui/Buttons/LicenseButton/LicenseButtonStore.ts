import { create } from "zustand";
interface LicenseButtonProps {
  licenseWindowOpen: boolean;
  customMusicWindowOpen: boolean;
  setLicenseWindowOpen: (licenseWindowOpen: boolean) => void;
  setCustomMusicWindowOpen: (customMusicWindowOpen: boolean) => void;

  id?: string | null;
  song: any;
}

export const useLicensingStore = create<LicenseButtonProps>((set) => ({
  customMusicWindowOpen: false,
  licenseWindowOpen: false,
  setLicenseWindowOpen: (licenseWindowOpen) => set({ licenseWindowOpen }),
  setCustomMusicWindowOpen: (customMusicWindowOpen) =>
    set({ customMusicWindowOpen }),

  id: "" || null,
  song: null,
}));
