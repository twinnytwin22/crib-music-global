import { create } from 'zustand';
interface ModalStore{
licenseWindowOpen: boolean;
customMusicWindowOpen: boolean;
setLicenseWindowOpen: (licenseWindowOpen: boolean) => void 
setCustomMusicWindowOpen: (customMusicWindowOpen: boolean) => void,
setModalOpen: (modalOpen: boolean, viewName: string) => void,
viewName: string | null
modalOpen: boolean
id?: string | null
song?: any
}

export const useModalStore = create<ModalStore>((set) => ({
    customMusicWindowOpen: false,
    licenseWindowOpen:false,
    modalOpen: false, 
    viewName: '',
    setLicenseWindowOpen: (licenseWindowOpen) => set({licenseWindowOpen}),
    setCustomMusicWindowOpen: (customMusicWindowOpen) => set({customMusicWindowOpen}),
    setModalOpen: (modalOpen: boolean, viewName: any) =>  set((state) => ({
        viewName,
        modalOpen: state.viewName === viewName ? modalOpen : true,
      })),    id: '' || null,
    song: null
}))