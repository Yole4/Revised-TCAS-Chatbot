import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { agetRequest, apostRequest, backendUrl } from "../../utils/Services";


export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {

    const { userId, userCredentials, errorResponse, setErrorResponse, isLoading, setIsLoading, mount, setMount } = useContext(AuthContext);

    // #####################################################################    FETCH DEPARTMENT  ####################################################################
    const [departmentMount, setDepartmentMount] = useState(false);
    const [departmentList, setDepartmentList] = useState([]);
    const [searchDepartment, setSearchDepartment] = useState('');

    useEffect(() => {
        if (userId) {
            const fetchDepartment = async (e) => {
                setIsLoading(true);

                try {
                    const response = await agetRequest(`${backendUrl}/api/admin/fetch-department`);

                    setIsLoading(false);

                    if (response.error) {
                        console.log(response.message);
                    } else {
                        setDepartmentList(response.message);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log("Error: ", error);
                }
            };
            fetchDepartment();
        }
    }, [userId, departmentMount]);

    const departmentToSearch = departmentList.filter(item =>
        item.name.toLowerCase().includes(searchDepartment.toLowerCase()) ||
        item.status.toLowerCase().includes(searchDepartment.toLowerCase())
    );

    // #####################################################################    ADD DEPARTMENT  ####################################################################
    const [addDepartmentData, setAddDepartmentData] = useState({
        name: "",
        description: "",
        status: ""
    });
    const [isAddDepartment, setIsAddDepartment] = useState(false);

    const handleAddDepartment = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/admin/add-department`, { addDepartmentData, userId: userId.toString() });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                setIsAddDepartment(false);
                setDepartmentMount(departmentMount ? false : true);
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: ", error);
        }
    }

    // #####################################################################    EDIT DEPARTMENT  ####################################################################
    const [editDepartmentData, setEditDepartmentData] = useState({
        editId: '',
        name: '',
        status: '',
        description: ''
    });
    const [isEditDepartment, setIsEditDepartment] = useState(false);

    const handleEditDepartment = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/admin/edit-department`, { editDepartmentData, userId: userId.toString() });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                setIsEditDepartment(false);
                setDepartmentMount(departmentMount ? false : true);
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: ", error);
        }
    }

    // #####################################################################    EDIT DEPARTMENT  ####################################################################
    const [deleteData, setDeleteData] = useState({
        deleteId: '',
        name: ''
    });
    const [isDeleteDepartment, setIsDeleteDepartment] = useState(false);

    const handleDeleteDepartment = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/admin/delete-department`, { deleteData, userId: userId.toString() });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                setIsDeleteDepartment(false);
                setDepartmentMount(departmentMount ? false : true);
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: ", error);
        }
    }

    // #####################################################################    FETCH COURSES  ####################################################################
    const [courseList, setCourseList] = useState([]);
    const [courseMount, setCourseMount] = useState(false);

    useEffect(() => {
        if (userId) {
            const fetchCourse = async (e) => {
                setIsLoading(true);

                try {
                    const response = await agetRequest(`${backendUrl}/api/admin/fetch-course`);

                    setIsLoading(false);

                    if (response.error) {
                        console.log(response.message);
                    } else {
                        setCourseList(response.message);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log("Error: ", error);
                }
            };
            fetchCourse();
        }
    }, [userId, courseMount]);

    // #####################################################################    ADD COURSES  ####################################################################
    const [courseData, setCourseData] = useState({
        course: '',
        status: '',
        acro: ''
    });
    const [isAddCourse, setIsAddCourse] = useState(false);

    const handleAddCourse = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/admin/add-course`, { courseData, userId: userId.toString() });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                setIsAddCourse(false);
                setCourseMount(courseMount ? false : true);
            }
        } catch (error) {
            console.log("Error: ", error);
            setIsLoading(false);
        }
    }

    // #####################################################################    EDIT COURSES  ####################################################################
    const [editCourseData, setEditCourseData] = useState({
        editId: '',
        course: '',
        status: '',
        acro: ''
    });
    const [isEditCourse, setIsEditCourse] = useState(false);

    const handleEditCourse = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/admin/edit-course`, { editCourseData, userId: userId.toString() });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                setIsEditCourse(false);
                setCourseMount(courseMount ? false : true);
            }
        } catch (error) {
            console.log("Error: ", error);
            setIsLoading(false);
        }
    }

    // #####################################################################    DELETE COURSES  ####################################################################
    const [deleteCourseData, setDeleteCourseData] = useState({
        deleteId: '',
        course: ''
    });
    const [isDeleteCourse, setIsDeleteCourse] = useState(false);

    const handleDeleteCourse = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/admin/delete-course`, { deleteCourseData, userId: userId.toString() });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                setIsDeleteCourse(false);
                setCourseMount(courseMount ? false : true);
            }
        } catch (error) {
            console.log("Error: ", error);
            setIsLoading(false);
        }
    }

    // #####################################################################    FETCH SCHOOL YEAR  ####################################################################
    const [schoolYearList, setSchoolYearList] = useState([]);
    const [syMount, setSYMount] = useState(false);

    useEffect(() => {
        if (userId) {
            const fetchSY = async (e) => {

                setIsLoading(false);

                try {
                    const response = await agetRequest(`${backendUrl}/api/admin/fetch-sy`);

                    setIsLoading(false);

                    if (response.error) {
                        console.log(response.message);
                    } else {
                        setSchoolYearList(response.message);
                    }
                } catch (error) {
                    console.log("Error: ", error);
                    setIsLoading(false);
                }
            };
            fetchSY();
        }
    }, [userId, syMount]);

    // #####################################################################    ADD SCHOOL YEAR  ####################################################################
    const [addSYData, setAddSYData] = useState({
        sy: '',
        status: ''
    });
    const [isAddSY, setIsAddSY] = useState(false);

    const handleAddSY = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/admin/add-sy`, { addSYData, userId: userId.toString() });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                setIsAddSY(false);
                setSYMount(syMount ? false : true);
            }
        } catch (error) {
            console.log("Error: ", error);
            setIsLoading(false);
        }
    }

    // #####################################################################    EDIT SCHOOL YEAR  ####################################################################
    const [editSYData, setEditSYData] = useState({
        editId: '',
        sy: '',
        status: ''
    });
    const [isEditSY, setIsEditSY] = useState(false);

    const handleEditSY = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/admin/edit-sy`, { editSYData, userId: userId.toString() });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                setIsEditSY(false);
                setSYMount(syMount ? false : true);
            }
        } catch (error) {
            console.log("Error: ", error);
            setIsLoading(false);
        }
    }

    // #####################################################################    DELETE SCHOOL YEAR  ####################################################################
    const [deleteSYData, setDeleteSYData] = useState({
        deleteId: '',
        sy: ''
    });
    const [isDeleteSY, setIsDeleteSY] = useState(false);

    const handleDeleteSY = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/admin/delete-sy`, { deleteSYData, userId: userId.toString() });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                setIsDeleteSY(false);
                setSYMount(syMount ? false : true);
            }
        } catch (error) {
            console.log("Error: ", error);
            setIsLoading(false);
        }
    }

    // #####################################################################    FETCH USERS  ####################################################################
    const [usersMount, setUsersMount] = useState(false);
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        if (userId) {
            const getUsers = async (e) => {
                setIsLoading(true);

                try {
                    const response = await agetRequest(`${backendUrl}/api/admin/get-users`);

                    setIsLoading(false);

                    if (response.error) {
                        console.log(response.message);
                    } else {
                        setUsersList(response.message);
                    }
                } catch (error) {
                    console.log("Error: ", error);
                    setIsLoading(false);
                }
            };
            getUsers();
        }
    }, [userId, usersMount]);

    // #####################################################################    DELETE USER  ####################################################################
    const [deleteUserData, setDeleteUserData] = useState({
        deleteId: '',
        email: '',

    });
    const [isDeleteUser, setIsDeleteUser] = useState(false);

    const handleDeleteUser = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/admin/delete-user`, { deleteUserData, userId: userId.toString() });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                setIsDeleteUser(false);
                setUsersMount(usersMount ? false : true);
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: ", error);
        }
    }

    // #####################################################################    UPDATE SETTINGS  ####################################################################
    const [updateSettingsData, setUpdateSettingsData] = useState({
        editId: '',
        systemName: '',
        shortName: '',
        welcomeContent: '',
        about: '',
        systemEmail: '',
        systemNumber: '',
        systemLocation: ''
    });
    const [settingsMount, setSettingsMount] = useState(false);

    const handleUpdateSettings = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/admin/update-settings`, {updateSettingsData, userId: userId.toString()});

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({message: response.message, isError: true});
            }else{
                setErrorResponse({message: response.message, isError: false});
                setSettingsMount(settingsMount ? false : true);
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: ",error);
        }
    }

    // #####################################################################    AUTO LOGO UPDATE  ####################################################################
    const [logo, setLogo] = useState([]);

    useEffect(() => {
        if (logo) {
            const autoImage = async (e) => {
                setIsLoading(true);
                setErrorResponse(null);

                const logoForm = new FormData();
                logoForm.append('logo', logo);
                logoForm.append('editId', updateSettingsData.editId.toString());

                try {
                    const response = await apostRequest(`${backendUrl}/api/admin/update-system-logo`, logoForm);

                    setIsLoading(false);

                    if (response.error) {
                        setErrorResponse({message: response.message, isError: true});
                    }else{
                        setErrorResponse({message: response.message, isError: false});
                        setSettingsMount(settingsMount ? false : true);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log("Error: ", error);
                }
            };
            autoImage();
        }
    }, [logo]);

    // #####################################################################    AUTO COVER UPDATE  ####################################################################
    const [cover, setCover] = useState([]);

    useEffect(() => {
        if (cover) {
            const autoImage = async (e) => {
                setIsLoading(true);
                setErrorResponse(null);

                const logoForm = new FormData();
                logoForm.append('cover', cover);
                logoForm.append('editId', updateSettingsData.editId.toString());

                try {
                    const response = await apostRequest(`${backendUrl}/api/admin/update-system-cover`, logoForm);

                    setIsLoading(false);

                    if (response.error) {
                        setErrorResponse({message: response.message, isError: true});
                    }else{
                        setErrorResponse({message: response.message, isError: false});
                        setSettingsMount(settingsMount ? false : true);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log("Error: ", error);
                }
            };
            autoImage();
        }
    }, [cover]);

    return <AdminContext.Provider value={{
        addDepartmentData,
        setAddDepartmentData,
        isAddDepartment,
        setIsAddDepartment,
        handleAddDepartment,
        departmentToSearch,
        searchDepartment,
        setSearchDepartment,
        editDepartmentData, setEditDepartmentData,
        isEditDepartment, setIsEditDepartment,
        handleEditDepartment,
        deleteData, setDeleteData,
        isDeleteDepartment, setIsDeleteDepartment,
        handleDeleteDepartment,
        courseList,
        courseData, setCourseData, isAddCourse, setIsAddCourse, handleAddCourse,
        editCourseData, setEditCourseData, isEditCourse, setIsEditCourse, handleEditCourse,
        deleteCourseData, setDeleteCourseData, isDeleteCourse, setIsDeleteCourse, handleDeleteCourse,
        schoolYearList,
        addSYData, setAddSYData, isAddSY, setIsAddSY, handleAddSY,
        editSYData, setEditSYData, isEditSY, setIsEditSY, handleEditSY,
        deleteSYData, setDeleteSYData, isDeleteSY, setIsDeleteSY, handleDeleteSY,
        usersList,
        deleteUserData, setDeleteUserData, isDeleteUser, setIsDeleteUser, handleDeleteUser,
        updateSettingsData, handleUpdateSettings, setUpdateSettingsData,
        settingsMount, setSettingsMount,
        setLogo, setCover
    }}>{children}</AdminContext.Provider>
}