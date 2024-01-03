import { createContext, useContext, useEffect, useState } from 'react';

const {backendUrl, getRequest} = require('../../utils/Services');

export const PublicContext = createContext();

export const PublicContextProvider = ({children}) => {
    const [publicLoading, setPublicLoading] = useState(false);
    const [publicMount, setPublicMount] = useState(false);

    // ##########################################################   FETCH SETTINGS  ##################################################################
    const [settingsData, setSettingsData] = useState(null);

    useEffect(() => {
        const fetchSettings = async (e) => {
            
            setPublicLoading(true);

            try {
                const response = await getRequest(`${backendUrl}/api/public/fetch-settings`);

                setPublicLoading(false);

                if (response.error) {
                    console.log(response.message);
                }else{
                    setSettingsData(response.message);
                }
            } catch (error) {
                console.log("Error :", error);
                setPublicLoading(false);
            }
        };
        fetchSettings();
    }, []);

    // ##########################################################   FETCH ARCHIVE FILES  ##################################################################
    const [archiveFiles, setArchiveFiles] = useState(null);

    useEffect(() => {
        const fetchArchive = async (e) => {


            setPublicLoading(true);

            try {
                const response = await getRequest(`${backendUrl}/api/public/fetch-archive`);

                setPublicLoading(false);

                if (response.error) {
                    console.log(response.message);
                }else{
                    setArchiveFiles(response.message);
                }
            } catch (error) {
                console.log("Error: ", error);
                setPublicLoading(false);
            }
        };
        fetchArchive();
    }, []);

    return <PublicContext.Provider value={{
        publicLoading,
        settingsData,
        archiveFiles
    }} > {children} </PublicContext.Provider>
}