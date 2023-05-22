import React, { createContext, useEffect, useState } from 'react'

const GeneralContext = createContext();

const ProviderContext = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);


    // useEffect(() => {
    const ToggleSidebar = () => {
        var sidebar = document.getElementById("main__sidebar");
        setSidebarOpen(!sidebarOpen);
        if (!sidebarOpen) {
            sidebar.style.width = "240px";
        } else {
            sidebar.style.width = "0px";
        }
    }
    //     ToggleSidebar();
    // }, [sidebarOpen])



    const values = { sidebarOpen, setSidebarOpen, ToggleSidebar };
    return (
        <GeneralContext.Provider value={values} >
            {children}
        </GeneralContext.Provider>
    )
}

export { ProviderContext, GeneralContext }