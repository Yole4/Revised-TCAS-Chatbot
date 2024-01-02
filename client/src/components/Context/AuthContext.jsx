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

    // ####################################################################      PROTECTED      ######################################################################################
    const [userId, setUserId] = useState(null);
    useEffect(() => {
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
    }, [mount]);

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


    return <AuthContext.Provider value={{
        user,
        isLoading,
        setIsLoading,
        errorResponse,
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
        handleLogout
    }}> {children} </AuthContext.Provider>
}