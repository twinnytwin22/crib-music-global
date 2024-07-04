"use client";

import React, { createContext, useContext, useEffect } from "react";

import MenuItemMenu from "ui/Components/Players/MusicItem/MenuItemMenu";
import useGlobalStore from "./store";
export const GlobalUIContext = createContext<any>(null);

export const GlobalUIProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const store = useGlobalStore();
  const { showModal, setShowModal, song } = useGlobalStore();

  const values = {
    ...store,
  };

  const handleRouteChange = () => {
    // Check if the modal is open and close it if necessary
    if (showModal) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    // Subscribe to route changes using a global event listener
    window.addEventListener("popstate", handleRouteChange);

    // Cleanup the listener when the component is unmounted
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [showModal, setShowModal]);

  return (
    <GlobalUIContext.Provider value={values}>
      <div
        className={`${showModal && "pr-2 w-screen h-screen overflow-clip "}`}
      >
        {children}
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-opacity-50 bg-black mr-2  ">
            {song && (
              <div
                className={`fixed md:ml-10 max-w-screen mx-auto z-20 min-h-screen justify-center left-0 w-full p-4 top-1/3 rounded-md place-items-center mr-2 `}
              >
                {/* Modal */}
                <MenuItemMenu song={song} />
              </div>
            )}
          </div>
        )}
      </div>
    </GlobalUIContext.Provider>
  );
};

export const useGlobalUIContext = () => useContext(GlobalUIContext);
