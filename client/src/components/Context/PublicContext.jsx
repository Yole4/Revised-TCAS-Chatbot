import { createContext, useContext, useEffect, useState } from 'react';
import { AdminContext } from './AdminContext';
import { AuthContext } from './AuthContext';

const { backendUrl, getRequest, postRequest } = require('../../utils/Services');

export const PublicContext = createContext();

export const PublicContextProvider = ({ children }) => {
    const [publicLoading, setPublicLoading] = useState(false);
    const [publicMount, setPublicMount] = useState(false);

    const { setUpdateSettingsData, settingsMount, archiveFilesMount } = useContext(AdminContext);
    const {setIsLoading, setUser, setMount, mount, setErrorResponse} = useContext(AuthContext);

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

    // ##########################################################  FIND ACCOUNT  ##################################################################
    const [emailFullname, setEmailFullname] = useState('');
    const [foundAccounts, setFoundAccounts] = useState(null);
    const [isFound, setIsFound] = useState(false);
    const [login, setLogin] = useState(true);
    const [register, setRegister] = useState(false);
    const [isForgot, setIsForgot] = useState(false);
    const [isMe, setIsMe] = useState(false);
    const [isPasswordLogin, setIsPasswordLogin] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [isNewPassword, setIsNewPassword] = useState(false);

    const handleFindAccount = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await postRequest(`${backendUrl}/api/public/find-account`, {emailFullname});

            setIsLoading(false);
            setErrorResponse(null);

            if (response.error){
                console.log(response.message);
                setErrorResponse({message: response.message, isError: true});
            }else{
                setFoundAccounts(response.message);
                setIsFound(true);
                setLogin(false);
                setRegister(false);
                setIsForgot(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    // ##########################################################  SEND VERIFICATION CODE TO EMAIL  ##################################################################
    const [userData, setUserData] = useState({fullname: '', image: '', id: '', email: ''});

    const handleContinue = async (e) => {
        setIsLoading(true);

        try {
            const response = await postRequest(`${backendUrl}/api/public/send-email`, {email: userData.email});

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({message: response.message, isError: true});
            }else{
                setErrorResponse({message: response.message, isError: false});
                setIsConfirm(true); 
                setIsMe(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

     // ##########################################################  CONFIRM CODE  ##################################################################
     const [confirmCode, setConfirmCode] =  useState('');

     const handleConfirm = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await postRequest(`${backendUrl}/api/public/confirm-code`, {confirmCode, email: userData.email});

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({message: response.message, isError: true});
            }else{
                setErrorResponse({message: response.message, isError: false});
                setIsNewPassword(true);
                setIsConfirm(false);
                setConfirmCode('');
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
     }

     // ###############################################  NEW PASSWORD  #############################################################
     const [newPassword, setNewPassword] = useState({password: '', confirmPassword: ''});

     const handleNewPassword = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await postRequest(`${backendUrl}/api/public/new-password`, {newPassword, email: userData.email});

            setIsLoading(false);

            if (response.error){
                setErrorResponse({message: response.message, isError: true});
            }else{
                setErrorResponse({message: response.message, isError: false});
                setIsNewPassword(false);
                setLogin(true);
                localStorage.setItem("token", response.token);
                setMount(mount ? false : true);
                setUser(response);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
     }
    
    return <PublicContext.Provider value={{
        publicLoading,
        settingsData,
        archiveFiles,
        emailFullname, setEmailFullname, foundAccounts, handleFindAccount, isFound, setIsFound, login, setLogin, register, setRegister, isForgot, setIsForgot, isMe, setIsMe, isPasswordLogin, setIsPasswordLogin, isConfirm, setIsConfirm,
        userData, setUserData, handleContinue, confirmCode, setConfirmCode, handleConfirm, setIsNewPassword, isNewPassword, newPassword, setNewPassword, handleNewPassword
    }} > {children} </PublicContext.Provider>
}