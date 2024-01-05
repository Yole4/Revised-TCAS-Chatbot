import { createContext, useEffect, useState } from "react";
import { backendUrl, postRequest, apostRequest, getRequest, agetRequest } from "../../utils/Services";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    // loading attributes
    const [errorResponse, setErrorResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mount, setMount] = useState(false);

    const token = localStorage.getItem('token');

    // ####################################################################      PROTECTED      ######################################################################################
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        if (token) {
            setIsLoading(true);

            const verifyToken = async (e) => {
                const response = await agetRequest(`${backendUrl}/api/users/protected`);

                setIsLoading(false);

                if (response.error) {
                    setUser(null);
                    setErrorResponse({ message: response.message, isError: true });
                } else {
                    setUserId(response.user.id);
                    setUser(response);
                }
            }
            verifyToken();
        }
    }, [mount, token]);

    // ####################################################################      LOGOUT      ######################################################################################
    const [isLogout, setIsLogout] = useState(false);

    const handleLogout = async (e) => {

        localStorage.removeItem("token");
        setUser(null);
        setIsLogout(false);
        setErrorResponse({ message: "Logout Success", isError: false });
        navigate('/login');
    }

    // ####################################################################     LOGIN USING GOOGLE      ######################################################################################
    const [userLoginData, setUserLoginData] = useState([]);
    const [isLoginGoogle, setIsLoginGoogle] = useState(false);

    useEffect(() => {
        if (isLoginGoogle && userLoginData) {

            const insertUserData = async (e) => {
                setIsLoading(true);
                setErrorResponse(null);

                try {
                    const response = await postRequest(`${backendUrl}/api/users/login-google`, { userLoginData });

                    setIsLoading(false);
                    setIsLoginGoogle(false);

                    if (response.error) {
                        setErrorResponse({ message: response.message, isError: true });
                    } else {
                        setErrorResponse({ message: response.message, isError: false });
                        localStorage.setItem("token", response.token);
                        setMount(mount ? false : true);
                        setUser(response);
                    }
                } catch (error) {
                    setIsLoading(false);
                    setIsLoginGoogle(false);
                    console.log("Error: ", error);
                }
            }
            insertUserData();
        }
    }, [isLoginGoogle, userLoginData]);

    // ####################################################################     REGISTER USING GOOGLE      ######################################################################################
    const [userRegisterData, setUserRegisterData] = useState([]);
    const [isRegisterGoogle, setIsRegisterGoogle] = useState(false);

    useEffect(() => {
        if (isRegisterGoogle && userRegisterData) {

            const insertUserData = async (e) => {
                setIsLoading(true);
                setErrorResponse(null);

                try {
                    const response = await postRequest(`${backendUrl}/api/users/register-google`, { userRegisterData });

                    setIsLoading(false);
                    setIsRegisterGoogle(false);

                    if (response.error) {
                        setErrorResponse({ message: response.message, isError: true });
                    } else {
                        setErrorResponse({ message: response.message, isError: false });
                        localStorage.setItem("token", response.token);
                        setMount(mount ? false : true);
                        setUser(response);
                    }
                } catch (error) {
                    setIsLoading(false);
                    setIsRegisterGoogle(false);
                    console.log("Error: ", error);
                }
            }
            insertUserData();
        }
    }, [isRegisterGoogle, userRegisterData]);

    // ####################################################################     REGISTER MANUAL   ######################################################################################
    const [registerInfo, setRegisterInfo] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: []
    });

    const handleRegister = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        const registerData = new FormData();
        registerData.append('fullname', registerInfo.fullname);
        registerData.append('email', registerInfo.email);
        registerData.append('password', registerInfo.password);
        registerData.append('confirmPassword', registerInfo.confirmPassword);
        registerData.append('image', registerInfo.image);

        try {
            const response = await postRequest(`${backendUrl}/api/users/register`, registerData);

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                localStorage.setItem("token", response.token);
                setMount(mount ? false : true);
                setUser(response);
                setRegisterInfo({
                    fullname: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    image: []
                });
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: ", error);
        }
    }

    // ####################################################################     LOGIN MANUAL   ######################################################################################
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await postRequest(`${backendUrl}/api/users/login`, { loginInfo });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                localStorage.setItem("token", response.token);
                setMount(mount ? false : true);
                setUser(response);
                setLoginInfo({
                    email: "",
                    password: ""
                });
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: ", error);
        }
    }

    // ####################################################################      AUTO IMAGE UPLOAD      ######################################################################################
    const [autoImage, setAutoImage] = useState([]);
    const [isProfile, setIsProfile] = useState(false);

    useEffect(() => {
        if (autoImage.length === 0) {
            // 
        }
        else {
            const autoUpload = async (e) => {

                setIsLoading(true);
                setErrorResponse(null);

                const formImage = new FormData();
                formImage.append('image', autoImage);
                formImage.append('userId', userId);

                try {

                    const response = await apostRequest(`${backendUrl}/api/users/image-upload`, formImage);

                    setIsLoading(false);

                    if (response.error) {
                        setErrorResponse({ message: response.message, isError: true });
                    } else {
                        setErrorResponse({ message: response.message, isError: false });
                        setMount(mount ? false : true);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log("Error: ", error);
                }
            };
            autoUpload();
        }

    }, [autoImage]);

    // ####################################################################      CHANGE PASSWORD      ######################################################################################
    const [changePasswordInfo, setChangePasswordInfo] = useState({
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [isChangePassword, setIsChangePassword] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/users/change-password`, { changePasswordInfo, userId: userId.toString() });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                setIsChangePassword(false);
                setChangePasswordInfo((prev) => ({ ...prev, currentPassword: "" }));
                setChangePasswordInfo((prev) => ({ ...prev, newPassword: "" }));
                setChangePasswordInfo((prev) => ({ ...prev, confirmPassword: "" }));
                setMount(mount ? false : true);
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error :", error);
        }
    }

    // ####################################################################      UPDATE PROFILE NAME      ######################################################################################
    const [isEditProfile, setIsEditProfile] = useState(false);
    const [changeProfileInfo, setChangeProfileInfo] = useState("");

    const handleChangeProfile = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/users/update-profile`, { changeProfileInfo, userId: userId.toString() });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                setIsEditProfile(false);
                setMount(mount ? false : true);
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: ", error);
        }
    }

    // ####################################################################      GET USER CREDENTIALS      ######################################################################################
    const [userCredentials, setUserCredentials] = useState(null);

    useEffect(() => {
        if (userId) {
            const getCredentials = async (e) => {

                setIsLoading(true);
                setErrorResponse(null);

                try {
                    const response = await apostRequest(`${backendUrl}/api/users/get-user-credentials`, { userId });

                    setIsLoading(false);

                    if (response.error) {
                        setErrorResponse({ message: response.message, isError: true });
                    } else {
                        setUserCredentials(response.message);
                        setChangePasswordInfo((prev) => ({ ...prev, email: response.message.email }));
                        setChangeProfileInfo(response.message.fullname);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log("Error: ", error);
                }
            };
            getCredentials();
        }
    }, [mount, userId]);

    // ####################################################################      GET NOTIFICATIONS      ######################################################################################
    const [notificationList, setNotificationList] = useState([]);

    useEffect(() => {
        if (userId) {
            const fetchNot = async (e) => {
                setIsLoading(true);

                try {
                    const response = await apostRequest(`${backendUrl}/api/users/get-notifications`, {userId: userId.toString()});

                    setIsLoading(false);

                    if (response.error){
                        console.log(response.message);
                    }else{
                        setNotificationList(response.message);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log("Error: ",error);
                }
            };
            fetchNot();
        }
    }, [userId]);


    return <AuthContext.Provider value={{
        user,
        userCredentials,
        isLoading,
        setIsLoading,
        errorResponse,
        setErrorResponse,
        mount,
        setMount,
        userLoginData,
        setUserLoginData,
        isLoginGoogle,
        setIsLoginGoogle,
        userRegisterData,
        setUserRegisterData,
        isRegisterGoogle,
        setIsRegisterGoogle,
        handleRegister,
        registerInfo,
        setRegisterInfo,
        loginInfo,
        setLoginInfo,
        handleLogin,
        isLogout,
        setIsLogout,
        handleLogout,
        autoImage,
        setAutoImage,
        isProfile,
        setIsProfile,
        changePasswordInfo,
        setChangePasswordInfo,
        handleChangePassword,
        isChangePassword,
        setIsChangePassword,
        isEditProfile,
        setIsEditProfile,
        handleChangeProfile,
        changeProfileInfo,
        setChangeProfileInfo,
        userId,
        notificationList
    }}> {children} </AuthContext.Provider>
}