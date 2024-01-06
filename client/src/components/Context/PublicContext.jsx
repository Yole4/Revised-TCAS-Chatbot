import { createContext, useContext, useEffect, useState } from 'react';
import { AdminContext } from './AdminContext';

const { backendUrl, getRequest } = require('../../utils/Services');

export const PublicContext = createContext();

export const PublicContextProvider = ({ children }) => {
    const [publicLoading, setPublicLoading] = useState(false);
    const [publicMount, setPublicMount] = useState(false);

    const { setUpdateSettingsData, settingsMount, archiveFilesMount } = useContext(AdminContext);

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
                } else {
                    setSettingsData(response.message);
                    setUpdateSettingsData({
                        editId: response.message.id,
                        systemName: response.message.system_name,
                        shortName: response.message.system_short_name,
                        welcomeContent: response.message.welcome_content,
                        about: response.message.about_us,
                        systemEmail: response.message.email,
                        systemNumber: response.message.contact_number,
                        systemLocation: response.message.address
                    });
                }
            } catch (error) {
                console.log("Error :", error);
                setPublicLoading(false);
            }
        };
        fetchSettings();
    }, [settingsMount]);

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
                } else {
                    setArchiveFiles(response.message);
                }
            } catch (error) {
                console.log("Error: ", error);
                setPublicLoading(false);
            }
        };
        fetchArchive();
    }, [archiveFilesMount]);

    return <PublicContext.Provider value={{
        publicLoading,
        settingsData,
        archiveFiles
    }} > {children} </PublicContext.Provider>
}