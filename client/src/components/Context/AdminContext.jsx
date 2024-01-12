import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { agetRequest, apostRequest, backendUrl } from "../../utils/Services";


export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {

    const { userId, userCredentials, errorResponse, setErrorResponse, isLoading, setIsLoading, mount, setMount, notificationMount, setNotificationMount } = useContext(AuthContext);

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
                setNotificationMount(notificationMount ? false : true);
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
                setNotificationMount(notificationMount ? false : true);
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
                setNotificationMount(notificationMount ? false : true);
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
            const response = await apostRequest(`${backendUrl}/api/admin/update-settings`, { updateSettingsData, userId: userId.toString() });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                setSettingsMount(settingsMount ? false : true);
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: ", error);
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
                        setErrorResponse({ message: response.message, isError: true });
                    } else {
                        setErrorResponse({ message: response.message, isError: false });
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
                        setErrorResponse({ message: response.message, isError: true });
                    } else {
                        setErrorResponse({ message: response.message, isError: false });
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

    // #####################################################################    ADD ARCHIVE FILE  ####################################################################
    const [archiveFile, setArchiveFile] = useState(null);
    const [isAlert, setIsAlert] = useState(false);
    const [archiveFilesMount, setArchiveFileMount] = useState(false);
    const [submitThesisAndCapstone, setSubmitThesisAndCapstone] = useState({
        foundAbstract: '',
        pageNumber: '',
        fileName: '',
        department: '',
        course: '',
        schoolYear: '',
        projectTitle: '',
        members: '',
        bannerImage: null
    });

    // ------- get the abstract -----------
    useEffect(() => {
        if (archiveFile) {
            setIsLoading(true);
            setErrorResponse(null);

            const requestAbstract = async () => {
                const data = new FormData();
                data.append('archiveFile', archiveFile);

                try {
                    const response = await apostRequest(`${backendUrl}/api/admin/scan-document`, data);

                    setIsLoading(false);

                    if (response.error) {
                        if (response.message === "No Abstract Found! Please check your PDF file and upload again!") {
                            setIsAlert(true);
                        } else {
                            setErrorResponse({ message: response.message, isError: true });
                        }
                    } else {
                        setSubmitThesisAndCapstone((prev) => ({ ...prev, foundAbstract: response.foundAbstract }));
                        setSubmitThesisAndCapstone((prev) => ({ ...prev, pageNumber: response.pageNumber }));
                        setSubmitThesisAndCapstone((prev) => ({ ...prev, fileName: response.fileName }));
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log("Error: ", error);
                }
            };
            requestAbstract();
        }
    }, [archiveFile]);

    // image preview
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setSubmitThesisAndCapstone({
                    ...submitThesisAndCapstone,
                    bannerImage: selectedImage,
                });
                setImagePreview(e.target.result);
            };

            reader.readAsDataURL(selectedImage);
        }
    };

    // chatbot form data
    const [formData, setFormData] = useState([{ keywords: '', information: '' }]);
    const [isNext, setIsNext] = useState(false);
    const [chatbotMount, setChatbotMount] = useState(false);

    const handleSubmitProject = async (e) => {
        e.preventDefault();

        if (submitThesisAndCapstone.foundAbstract === "") {
            setIsAlert(true);
        } else {
            setIsLoading(true);
            setErrorResponse(null);

            const addProject = new FormData();
            addProject.append('userId', userId.toString());
            addProject.append('userType', userCredentials.user_type);
            addProject.append('fullname', userCredentials.fullname);
            for (const key in submitThesisAndCapstone) {
                if (submitThesisAndCapstone[key] !== null) {
                    addProject.append(key, submitThesisAndCapstone[key]);
                }
            }

            formData.forEach((data, index) => {
                addProject.append(`chatbotInfo[${index}][keywords]`, data.keywords);
                addProject.append(`chatbotInfo[${index}][information]`, data.information);
            });

            try {
                const response = await apostRequest(`${backendUrl}/api/admin/add-project`, addProject);

                setIsLoading(false);

                if (response.error) {
                    setErrorResponse({ message: response.message, isError: true });
                } else {
                    setErrorResponse({ message: response.message, isError: false });
                    setSubmitThesisAndCapstone({
                        foundAbstract: '',
                        pageNumber: '',
                        fileName: '',
                        department: '',
                        course: '',
                        schoolYear: '',
                        projectTitle: '',
                        members: '',
                        bannerImage: null
                    });
                    setFormData([{ keywords: '', information: '' }]);
                    setIsNext(false);
                    setArchiveFileMount(archiveFilesMount ? false : true);
                    setNotificationMount(notificationMount ? false : true);
                    setChatbotMount(chatbotMount ? false : true);
                }
            } catch (error) {
                console.log("Error: ", error);
                setIsLoading(false);
            }
        }
    }

    // #####################################################################    UPDATE ARCHIVE FILE STATUS  ####################################################################
    const [updateFileData, setUpdateFileData] = useState({
        editId: '',
        projectTitle: '',
        status: ''
    });
    const [isUpdateFile, setIsUpdateFile] = useState(false);

    const handleUpdateFile = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/admin/update-archive-status`, { updateFileData, userId: userId.toString() });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                setIsUpdateFile(false);
                setArchiveFileMount(archiveFilesMount ? false : true);
            }
        } catch (error) {
            console.log("Error", error);
            setIsLoading(false);
        }
    }

    // #####################################################################    DELETE ARCHIVE FILE STATUS  ####################################################################
    const [deleteArchiveData, setDeleteArchiveData] = useState({
        deleteId: '',
        projectTitle: ''
    });
    const [isDeleteArchive, setIsDeleteArchive] = useState(false);

    const handleDeleteArchive = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/admin/delete-archive`, { deleteArchiveData, userId: userId.toString() });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                setIsDeleteArchive(false);
                setArchiveFileMount(archiveFilesMount ? false : true);
            }
        } catch (error) {
            console.log("Error: ", error);
            setIsLoading(false);
        }
    }

    // #####################################################################    FETCH REQUESTED USERS  ####################################################################
    const [usersRequestList, setUsersRequestList] = useState([]);
    const [requestMount, setRequestMount] = useState(false);

    useEffect(() => {
        if (userId) {
            const getUserRequest = async (e) => {
                setIsLoading(true);

                try {
                    const response = await agetRequest(`${backendUrl}/api/admin/get-users-request`);

                    setIsLoading(false);

                    if (response.error) {
                        console.log(response.message);
                    } else {
                        setUsersRequestList(response.message);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log("Error: ", error);
                }
            };
            getUserRequest();
        }
    }, [userId, requestMount]);

    // #####################################################################    FETCH ARCHIVE ID REQUEST  ####################################################################
    const [archiveId, setArchiveId] = useState('');
    const [requestData, setRequestData] = useState([]);

    useEffect(() => {
        if (archiveId) {
            const fetchId = async (e) => {
                setIsLoading(true);

                try {
                    const response = await apostRequest(`${backendUrl}/api/admin/request-id`, { archiveId, userId: userId.toString() });

                    setIsLoading(false);

                    if (response.error) {
                        console.log(response.message);
                    } else {
                        setRequestData(response.message);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log("Error: ", error);
                }
            };
            fetchId();
        }
    }, [archiveId, userId, requestMount]);

    // ##########################################################################   REQUEST USER    ############################################################################
    const handleButtonRequest = async (item) => {
        const archiveId = item.id.toString();
        const projectTitle = item.project_title;
        const fullname = userCredentials && userCredentials.fullname;

        setIsLoading(true);

        try {
            const response = await apostRequest(`${backendUrl}/api/admin/user-request`, { archiveId, projectTitle, fullname, userId: userId.toString() });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                setRequestMount(requestMount ? false : true);

            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: ", error);
        }
    }

    // ##########################################################################   ACCEPT/DECLINE USER REQUEST    ############################################################################
    const handleAccept = async (item) => {
        let currentStatus = '';
        if (item.status === "Approved") {
            currentStatus = 'Pending';
        } else {
            currentStatus = "Approved";
        }

        const fullname = userCredentials.fullname;
        const projectTitle = item.project_title;
        const acceptId = item.id.toString();
        const userRequestId = item.user_request_id.toString();

        setIsLoading(true);

        try {
            const response = await apostRequest(`${backendUrl}/api/admin/request-response`, { fullname, projectTitle, acceptId, userId: userId.toString(), userRequestId, currentStatus });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                setRequestMount(requestMount ? false : true);
                setNotificationMount(notificationMount ? false : true);
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error: ", error);
        }
    }

    // #############################################################    ACCEPT USERS REQUEST TO UPLOAD DOCUMENT ##########################################################
    const handleAcceptFile = async (item) => {
        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/admin/accept-document`, { acceptId: item.id.toString(), projectTitle: item.project_title, userUploadId: item.user_id.toString() });

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                setArchiveFileMount(archiveFilesMount ? false : true);
                setNotificationMount(notificationMount ? false : true);
            }
        } catch (error) {
            console.log("Error: ", error);
            setIsLoading(false);
        }
    }

    // ######################################################################   FETCH CHATBOT INFORMATION   ##############################################################################
    const [chatbotInfoList, setChatbotInfoList] = useState([]);

    useEffect(() => {
        if (userId) {
            const getInfo = async (e) => {
                setIsLoading(true);

                try {
                    const response = await agetRequest(`${backendUrl}/api/admin/fetch-chatbot-info`);

                    setIsLoading(false);

                    if (response.error) {
                        console.log(response.message);
                    } else {
                        setChatbotInfoList(response.message);
                    }
                } catch (error) {
                    console.log("Error: ", error);
                    setIsLoading(false);
                }
            };
            getInfo();
        }
    }, [userId, chatbotMount]);

    // ######################################################################   ADD CHATBOT INFORMATION   ##############################################################################
    const [addChatbotData, setAddChatbotData] = useState([{ keywords: '', information: '' }]);
    const [isAddChatbot, setIsAddChatbot] = useState(false);

    const handleAddChatbot = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/admin/add-chatbot-info`, {chatbotInfo: addChatbotData, userId: userId.toString()});

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({ message: response.message, isError: true });
            } else {
                setErrorResponse({ message: response.message, isError: false });
                setChatbotMount(chatbotMount ? false : true);
                setIsAddChatbot(false);
                setAddChatbotData([{ keywords: '', information: '' }]);
            }
        } catch (error) {
            console.log("Error: ", error);
            setIsLoading(false);
        }
    }

    // ############################################################ EDIT CHATBOT INFORMATION    #######################################################################
    const [editChatbotData, setEditChatbotData] = useState({
        deleteId: '',
        keyword: '',
        information: ''
    });
    const [isEditChatbot, setIsEditChatbot] = useState(false);

    const handleEditChatbot = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/admin/edit-chatbot-info`, {editChatbotData, userId: userId.toString()});

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({message: response.message, isError: true});
            }else{
                setErrorResponse({message: response.message, isError: false});
                setIsEditChatbot(false);
                setChatbotMount(chatbotMount ? false : true);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    // ###############################################  DELETE CHATBOT INFORMATION  ############################################################
    const [deleteChatbotData, setDeleteChatbotData] = useState({deleteId: '', keyword: ''});
    const [isDeleteChatbot, setIsDeleteChatbot] = useState(false);

    const handleDeleteChatbot = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorResponse(null);

        try {
            const response = await apostRequest(`${backendUrl}/api/admin/delete-chatbot-info`, {deleteChatbotData, userId: userId.toString()});

            setIsLoading(false);

            if (response.error) {
                setErrorResponse({message: response.message, isError: true});
            }else{
                setErrorResponse({message: response.message, isError: false});
                setIsDeleteChatbot(false);
                setChatbotMount(chatbotMount ? false : true);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

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
        setLogo, setCover,
        archiveFile, setArchiveFile, submitThesisAndCapstone, setSubmitThesisAndCapstone, isAlert, setIsAlert,
        handleImageChange, imagePreview, handleSubmitProject, archiveFilesMount,
        updateFileData, setUpdateFileData, handleUpdateFile, isUpdateFile, setIsUpdateFile,
        deleteArchiveData, setDeleteArchiveData, handleDeleteArchive, isDeleteArchive, setIsDeleteArchive,
        usersRequestList, setArchiveId, requestData,
        handleButtonRequest, handleAccept, handleAcceptFile,
        formData, setFormData, isNext, setIsNext,
        chatbotInfoList, addChatbotData, setAddChatbotData, isAddChatbot, setIsAddChatbot, handleAddChatbot,
        editChatbotData, setEditChatbotData, isEditChatbot, setIsEditChatbot, handleEditChatbot,
        deleteChatbotData, setDeleteChatbotData, isDeleteChatbot, setIsDeleteChatbot, handleDeleteChatbot
    }}>{children}</AdminContext.Provider>
}