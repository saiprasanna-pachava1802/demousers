import { useState } from "react";
import "./Support.css";

function Support() {

    // =====================================================
    // OPTIONS
    // =====================================================

    const defaultTechnologies = [
        "Java",
        "Python",
        "Gen AI",
        "React",
        "Angular",
        ".NET",
        "DevOps",
        "Cloud Computing"
    ];

    const amountOptions = [
        "10000",
        "20000",
        "30000",
        "40000"
    ];

    const countryCodes = [
        "+91",
        "+1"
    ];

    const statusOptions = [
        "Active",
        "On Hold",
        "Completed",
        "Cancelled"
    ];

    // =====================================================
    // COMMON
    // =====================================================

    const [activeMenu, setActiveMenu] =
        useState("home");

    const [successMessage, setSuccessMessage] =
        useState("");

    // =====================================================
    // TECHNOLOGIES
    // =====================================================

    const [technologies, setTechnologies] =
        useState(defaultTechnologies);

    // =====================================================
    // USERS
    // =====================================================

    const [users, setUsers] =
        useState([]);

    const [nextUserNumber, setNextUserNumber] =
        useState(1);

    const [name, setName] =
        useState("");

    const [userType, setUserType] =
        useState("");

    const [countryCode, setCountryCode] =
        useState("+91");

    const [contact, setContact] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [technology, setTechnology] =
        useState([]);

    const [customTechnology, setCustomTechnology] =
        useState("");

    const [selectedUserId, setSelectedUserId] =
        useState(null);

    const [searchUser, setSearchUser] =
        useState("");

    const [editUserId, setEditUserId] =
        useState(null);

    const [viewUser, setViewUser] =
        useState(null);

    const [deleteUser, setDeleteUser] =
        useState(null);

    // =====================================================
    // SUPPORT
    // =====================================================

    const [supports, setSupports] =
        useState([]);

    const [supportClient, setSupportClient] =
        useState("");

    const [assignedSupportUser, setAssignedSupportUser] =
        useState("");

    const [supportStartDate, setSupportStartDate] =
        useState("");

    const [supportEndDate, setSupportEndDate] =
        useState("");

    const [supportStatus, setSupportStatus] =
        useState("Active");

    // Customer agreed amount
    const [agreedAmount, setAgreedAmount] =
        useState("");

    const [customAgreedAmount, setCustomAgreedAmount] =
        useState("");

    // Support person's agreed amount
    const [supportAgreedAmount, setSupportAgreedAmount] =
        useState("");

    const [
        customSupportAgreedAmount,
        setCustomSupportAgreedAmount
    ] = useState("");

    const [selectedSupportId, setSelectedSupportId] =
        useState(null);

    const [highlightedSupportId, setHighlightedSupportId] =
        useState(null);

    const [searchSupport, setSearchSupport] =
        useState("");

    const [editSupportId, setEditSupportId] =
        useState(null);

    const [deleteSupport, setDeleteSupport] =
        useState(null);

    // =====================================================
    // PAYMENT HISTORY
    // =====================================================

    const [payments, setPayments] =
        useState([]);

    const [historySupport, setHistorySupport] =
        useState(null);

    const [paymentAmountReceived, setPaymentAmountReceived] =
        useState("");

    const [paymentReceivedDate, setPaymentReceivedDate] =
        useState("");

    const [paymentAmountPaid, setPaymentAmountPaid] =
        useState("");

    const [paymentPaidDate, setPaymentPaidDate] =
        useState("");

    const [paymentComments, setPaymentComments] =
        useState("");

    const [editPaymentId, setEditPaymentId] =
        useState(null);

    // =====================================================
    // USER ID
    // =====================================================

    const generateUserId = () => {

        return `USR-${String(
            nextUserNumber
        ).padStart(3, "0")}`;
    };

    // =====================================================
    // SUPPORT ID
    // =====================================================

    const generateSupportId = () => {

        if (supports.length === 0) {
            return "001";
        }

        const numbers = supports.map(
            support => Number(support.id)
        );

        return String(
            Math.max(...numbers) + 1
        ).padStart(3, "0");
    };

    // =====================================================
    // REGISTERED DATE
    // =====================================================

    const getRegisteredDateTime = () => {

        const now = new Date();

        return now.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    // =====================================================
    // SUCCESS MESSAGE
    // =====================================================

    const showSuccess = (message) => {

        setSuccessMessage(message);

        setTimeout(() => {
            setSuccessMessage("");
        }, 2500);
    };

    // =====================================================
    // TECHNOLOGY
    // =====================================================

    const handleTechnologyChange = (e) => {

        const value = e.target.value;

        if (!value) {
            return;
        }

        if (!technology.includes(value)) {

            setTechnology([
                ...technology,
                value
            ]);
        }
    };

    const addCustomTechnology = () => {

        const value =
            customTechnology.trim();

        if (!value) {
            return;
        }

        if (!technologies.includes(value)) {

            setTechnologies([
                ...technologies,
                value
            ]);
        }

        if (!technology.includes(value)) {

            setTechnology([
                ...technology,
                value
            ]);
        }

        setCustomTechnology("");
    };

    const removeTechnology = (item) => {

        setTechnology(
            technology.filter(
                tech => tech !== item
            )
        );
    };

    // =====================================================
    // USER VALIDATION
    // =====================================================

    const validateUser = () => {

        if (
            name.trim().length < 3 ||
            name.trim().length > 50
        ) {

            alert(
                "Name must be between 3 and 50 characters."
            );

            return false;
        }

        if (!userType) {

            alert(
                "Please select User Type."
            );

            return false;
        }

        if (!/^\d{10}$/.test(contact)) {

            alert(
                "Contact number must contain exactly 10 digits."
            );

            return false;
        }

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {

            alert(
                "Please enter a valid email address."
            );

            return false;
        }

        if (technology.length === 0) {

            alert(
                "Please select at least one technology."
            );

            return false;
        }

        return true;
    };

    // =====================================================
    // CLEAR USER
    // =====================================================

    const clearUserForm = () => {

        setName("");
        setUserType("");
        setCountryCode("+91");
        setContact("");
        setEmail("");
        setTechnology([]);
        setCustomTechnology("");
        setEditUserId(null);
    };

    // =====================================================
    // ADD USER
    // =====================================================

    const handleAddUser = (e) => {

        e.preventDefault();

        if (!validateUser()) {
            return;
        }

        const newUser = {

            id: generateUserId(),

            name: name.trim(),

            type: userType,

            countryCode,

            contact,

            email: email.trim(),

            technology: [
                ...technology
            ],

            registeredDate:
                getRegisteredDateTime()
        };

        setUsers([
            ...users,
            newUser
        ]);

        setNextUserNumber(
            nextUserNumber + 1
        );

        clearUserForm();

        setActiveMenu("viewUsers");

        showSuccess(
            "User added successfully."
        );
    };

    // =====================================================
    // USER ROW
    // =====================================================

    const handleUserRowClick = (user) => {

        if (
            selectedUserId === user.id
        ) {

            setSelectedUserId(null);

        } else {

            setSelectedUserId(user.id);
        }
    };

    // =====================================================
    // EDIT USER
    // =====================================================

    const editUserRecord = (user) => {

        setName(user.name);

        setUserType(user.type);

        setCountryCode(
            user.countryCode || "+91"
        );

        setContact(user.contact);

        setEmail(user.email);

        setTechnology(
            Array.isArray(user.technology)
                ? user.technology
                : []
        );

        setEditUserId(user.id);

        setSelectedUserId(null);

        setActiveMenu("addUser");
    };

    // =====================================================
    // UPDATE USER
    // =====================================================

    const handleUpdateUser = (e) => {

        e.preventDefault();

        if (!validateUser()) {
            return;
        }

        setUsers(
            users.map(user => {

                if (
                    user.id === editUserId
                ) {

                    return {

                        ...user,

                        name: name.trim(),

                        type: userType,

                        countryCode,

                        contact,

                        email: email.trim(),

                        technology: [
                            ...technology
                        ]
                    };
                }

                return user;
            })
        );

        clearUserForm();

        setActiveMenu("viewUsers");

        showSuccess(
            "User updated successfully."
        );
    };

    // =====================================================
    // DELETE USER
    // =====================================================

    const confirmDeleteUser = () => {

        setUsers(
            users.filter(
                user =>
                    user.id !==
                    deleteUser.id
            )
        );

        setDeleteUser(null);

        setSelectedUserId(null);

        showSuccess(
            "User deleted successfully."
        );
    };

    // =====================================================
    // USER SEARCH
    // =====================================================

    const filteredUsers =
        users.filter(user => {

            const search =
                searchUser.toLowerCase();

            return (

                user.id
                    .toLowerCase()
                    .includes(search)

                ||

                user.name
                    .toLowerCase()
                    .includes(search)

                ||

                user.email
                    .toLowerCase()
                    .includes(search)

                ||

                user.type
                    .toLowerCase()
                    .includes(search)
            );
        });

    // =====================================================
    // USER TYPES
    // =====================================================

    const supportUsers =
        users.filter(
            user =>
                user.type === "User"
        );

    const customerUsers =
        users.filter(
            user =>
                user.type === "Customer"
        );

    // =====================================================
    // AGREED AMOUNT
    // =====================================================

    const getFinalAgreedAmount = () => {

        if (
            agreedAmount === "custom"
        ) {

            return customAgreedAmount;
        }

        return agreedAmount;
    };

    // =====================================================
    // SUPPORT AGREED AMOUNT
    // =====================================================

    const getFinalSupportAgreedAmount = () => {

        if (
            supportAgreedAmount === "custom"
        ) {

            return customSupportAgreedAmount;
        }

        return supportAgreedAmount;
    };

    // =====================================================
    // SUPPORT PERIOD
    // =====================================================

    const calculateSupportPeriodDays = (
        startDate,
        endDate
    ) => {

        if (
            !startDate ||
            !endDate
        ) {

            return 0;
        }

        const start =
            new Date(
                `${startDate}T00:00:00`
            );

        const end =
            new Date(
                `${endDate}T00:00:00`
            );

        const difference =
            end.getTime() -
            start.getTime();

        if (difference < 0) {
            return 0;
        }

        return (
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            ) + 1
        );
    };

    // =====================================================
    // NEXT DUE DATE
    // =====================================================

    const calculateNextDueDate = (
        paymentDate,
        supportPeriodDays
    ) => {

        if (
            !paymentDate ||
            !supportPeriodDays
        ) {

            return "";
        }

        const date =
            new Date(
                `${paymentDate}T00:00:00`
            );

        date.setDate(
            date.getDate() +
            Number(supportPeriodDays)
        );

        const year =
            date.getFullYear();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                date.getDate()
            ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    // =====================================================
    // SUPPORT VALIDATION
    // =====================================================

    const validateSupport = () => {

        if (!assignedSupportUser) {

            alert(
                "Please select Support Person."
            );

            return false;
        }

        if (!supportClient) {

            alert(
                "Please select Client / Paying User."
            );

            return false;
        }

        if (!supportStartDate) {

            alert(
                "Please select Support Start Date."
            );

            return false;
        }

        if (
            supportEndDate &&
            supportEndDate < supportStartDate
        ) {

            alert(
                "Support End Date cannot be before Start Date."
            );

            return false;
        }

        if (!supportStatus) {

            alert(
                "Please select Status."
            );

            return false;
        }

        const finalAmount =
            getFinalAgreedAmount();

        if (
            finalAmount === "" ||
            isNaN(finalAmount) ||
            Number(finalAmount) <= 0
        ) {

            alert(
                "Please enter valid Agreed Amount."
            );

            return false;
        }

        const finalSupportAmount =
            getFinalSupportAgreedAmount();

        if (
            finalSupportAmount === "" ||
            isNaN(finalSupportAmount) ||
            Number(finalSupportAmount) <= 0
        ) {

            alert(
                "Please enter valid Support Agreed Amount."
            );

            return false;
        }

        return true;
    };

    // =====================================================
    // CLEAR SUPPORT
    // =====================================================

    const clearSupportForm = () => {

        setSupportClient("");
        setAssignedSupportUser("");
        setSupportStartDate("");
        setSupportEndDate("");

        setSupportStatus("Active");

        setAgreedAmount("");
        setCustomAgreedAmount("");

        setSupportAgreedAmount("");
        setCustomSupportAgreedAmount("");

        setEditSupportId(null);
    };

    // =====================================================
    // ADD SUPPORT
    // =====================================================

    const handleAddSupport = (e) => {

        e.preventDefault();

        if (!validateSupport()) {
            return;
        }

        const finalAmount =
            Number(
                getFinalAgreedAmount()
            );

        const finalSupportAmount =
            Number(
                getFinalSupportAgreedAmount()
            );

        const supportPeriodDays =
            calculateSupportPeriodDays(
                supportStartDate,
                supportEndDate
            );

        const newSupport = {

            id: generateSupportId(),

            client:
                supportClient,

            assignedUser:
                assignedSupportUser,

            startDate:
                supportStartDate,

            endDate:
                supportEndDate,

            status:
                supportStatus,

            agreedAmount:
                finalAmount,

            supportAgreedAmount:
                finalSupportAmount,

            supportPeriodDays,

            supportPeriod:
                supportEndDate
                    ? `${supportPeriodDays} Days`
                    : "Ongoing",

            nextDueDate: "",

            lastPaymentDate: ""
        };

        setSupports([
            ...supports,
            newSupport
        ]);

        setHighlightedSupportId(
            newSupport.id
        );

        clearSupportForm();

        setActiveMenu(
            "supportView"
        );

        showSuccess(
            "Support assignment added successfully."
        );
    };

    // =====================================================
    // SUPPORT ROW
    // =====================================================

    const handleSupportRowClick = (
        support
    ) => {

        if (
            selectedSupportId ===
            support.id
        ) {

            setSelectedSupportId(null);

        } else {

            setSelectedSupportId(
                support.id
            );
        }
    };

    // =====================================================
    // SELECTED SUPPORT
    // =====================================================

    const getSelectedSupport = () => {

        return supports.find(
            support =>
                support.id ===
                selectedSupportId
        );
    };

    // =====================================================
    // EDIT SUPPORT
    // =====================================================

    const editSupportRecord = (
        support
    ) => {

        if (!support) {
            return;
        }

        setSupportClient(
            support.client
        );

        setAssignedSupportUser(
            support.assignedUser
        );

        setSupportStartDate(
            support.startDate
        );

        setSupportEndDate(
            support.endDate
        );

        setSupportStatus(
            support.status || "Active"
        );

        setAgreedAmount(
            String(
                support.agreedAmount || ""
            )
        );

        setCustomAgreedAmount("");

        setSupportAgreedAmount(
            String(
                support.supportAgreedAmount || ""
            )
        );

        setCustomSupportAgreedAmount("");

        setEditSupportId(
            support.id
        );

        setSelectedSupportId(null);

        setActiveMenu("support");
    };

    // =====================================================
    // UPDATE SUPPORT
    // =====================================================

    const handleUpdateSupport = (
        e
    ) => {

        e.preventDefault();

        if (!validateSupport()) {
            return;
        }

        const finalAmount =
            Number(
                getFinalAgreedAmount()
            );

        const finalSupportAmount =
            Number(
                getFinalSupportAgreedAmount()
            );

        const supportPeriodDays =
            calculateSupportPeriodDays(
                supportStartDate,
                supportEndDate
            );

        setSupports(
            supports.map(
                support => {

                    if (
                        support.id ===
                        editSupportId
                    ) {

                        return {

                            ...support,

                            client:
                                supportClient,

                            assignedUser:
                                assignedSupportUser,

                            startDate:
                                supportStartDate,

                            endDate:
                                supportEndDate,

                            status:
                                supportStatus,

                            agreedAmount:
                                finalAmount,

                            supportAgreedAmount:
                                finalSupportAmount,

                            supportPeriodDays,

                            supportPeriod:
                                supportEndDate
                                    ? `${supportPeriodDays} Days`
                                    : "Ongoing"
                        };
                    }

                    return support;
                }
            )
        );

        clearSupportForm();

        setActiveMenu(
            "support"
        );

        showSuccess(
            "Support updated successfully."
        );
    };

    // =====================================================
    // DELETE SUPPORT
    // =====================================================

    const confirmDeleteSupport = () => {

        setSupports(
            supports.filter(
                support =>
                    support.id !==
                    deleteSupport.id
            )
        );

        setPayments(
            payments.filter(
                payment =>
                    payment.supportId !==
                    deleteSupport.id
            )
        );

        setDeleteSupport(null);

        setSelectedSupportId(null);

        showSuccess(
            "Support deleted successfully."
        );
    };

    // =====================================================
    // SUPPORT SEARCH
    // =====================================================

    const filteredSupports =
        supports.filter(
            support => {

                const search =
                    searchSupport.toLowerCase();

                const assignedUser =
                    users.find(
                        user =>
                            user.id ===
                            support.assignedUser
                    );

                const clientUser =
                    users.find(
                        user =>
                            user.id ===
                            support.client
                    );

                return (

                    support.id
                        .toLowerCase()
                        .includes(search)

                    ||

                    support.assignedUser
                        .toLowerCase()
                        .includes(search)

                    ||

                    support.client
                        .toLowerCase()
                        .includes(search)

                    ||

                    support.status
                        ?.toLowerCase()
                        .includes(search)

                    ||

                    assignedUser?.name
                        ?.toLowerCase()
                        .includes(search)

                    ||

                    clientUser?.name
                        ?.toLowerCase()
                        .includes(search)

                    ||

                    clientUser?.email
                        ?.toLowerCase()
                        .includes(search)
                );
            }
        );

    // =====================================================
    // PAYMENT TOTALS
    // =====================================================

    const getPaymentTotals = (
        supportId
    ) => {

        const supportPayments =
            payments.filter(
                payment =>
                    payment.supportId ===
                    supportId
            );

        const received =
            supportPayments.reduce(
                (
                    total,
                    payment
                ) =>
                    total +
                    Number(
                        payment.amountReceived || 0
                    ),
                0
            );

        const paid =
            supportPayments.reduce(
                (
                    total,
                    payment
                ) =>
                    total +
                    Number(
                        payment.amountPaid || 0
                    ),
                0
            );

        const sortedPayments =
            [...supportPayments].sort(
                (a, b) => {

                    const dateA =
                        new Date(
                            a.receivedDate ||
                            a.paidDate ||
                            "1900-01-01"
                        );

                    const dateB =
                        new Date(
                            b.receivedDate ||
                            b.paidDate ||
                            "1900-01-01"
                        );

                    return dateB - dateA;
                }
            );

        const latestPayment =
            sortedPayments[0];

        return {

            received,

            paid,

            lastPaymentDate:
                latestPayment
                    ? (
                        latestPayment.receivedDate ||
                        latestPayment.paidDate
                    )
                    : "",

            nextDueDate:
                latestPayment
                    ? latestPayment.nextDueDate
                    : ""
        };
    };

    // =====================================================
    // HISTORY
    // =====================================================

    const openHistory = (
        support
    ) => {

        if (!support) {
            return;
        }

        setHistorySupport(
            support
        );

        setEditPaymentId(null);

        setPaymentAmountReceived("");
        setPaymentReceivedDate("");
        setPaymentAmountPaid("");
        setPaymentPaidDate("");
        setPaymentComments("");
    };

    // =====================================================
    // CLEAR PAYMENT FORM
    // =====================================================

    const clearPaymentForm = () => {

        setPaymentAmountReceived("");
        setPaymentReceivedDate("");
        setPaymentAmountPaid("");
        setPaymentPaidDate("");
        setPaymentComments("");

        setEditPaymentId(null);
    };

    // =====================================================
    // PAYMENT VALIDATION
    // =====================================================

    const validatePayment = () => {

        if (
            paymentAmountReceived === "" &&
            paymentAmountPaid === ""
        ) {

            alert(
                "Please enter Amount Received or Amount Paid to Support."
            );

            return false;
        }

        if (
            paymentAmountReceived !== "" &&
            Number(paymentAmountReceived) < 0
        ) {

            alert(
                "Amount Received cannot be negative."
            );

            return false;
        }

        if (
            paymentAmountPaid !== "" &&
            Number(paymentAmountPaid) < 0
        ) {

            alert(
                "Amount Paid to Support cannot be negative."
            );

            return false;
        }

        if (
            paymentAmountReceived !== "" &&
            !paymentReceivedDate
        ) {

            alert(
                "Please select Received Date."
            );

            return false;
        }

        if (
            paymentAmountPaid !== "" &&
            !paymentPaidDate
        ) {

            alert(
                "Please select Paid Date."
            );

            return false;
        }

        return true;
    };

    // =====================================================
    // ADD / UPDATE PAYMENT
    // =====================================================

    const handleSavePayment = (
        e
    ) => {

        e.preventDefault();

        if (!historySupport) {
            return;
        }

        if (!validatePayment()) {
            return;
        }

        const paymentBaseDate =
            paymentReceivedDate ||
            paymentPaidDate;

        const nextDueDate =
            calculateNextDueDate(
                paymentBaseDate,
                historySupport.supportPeriodDays
            );

        // =================================================
        // UPDATE PAYMENT
        // =================================================

        if (editPaymentId) {

            setPayments(
                payments.map(
                    payment => {

                        if (
                            payment.id ===
                            editPaymentId
                        ) {

                            return {

                                ...payment,

                                amountReceived:
                                    Number(
                                        paymentAmountReceived
                                    ) || 0,

                                receivedDate:
                                    paymentReceivedDate,

                                amountPaid:
                                    Number(
                                        paymentAmountPaid
                                    ) || 0,

                                paidDate:
                                    paymentPaidDate,

                                nextDueDate,

                                comments:
                                    paymentComments
                            };
                        }

                        return payment;
                    }
                )
            );

            setEditPaymentId(null);

            clearPaymentForm();

            showSuccess(
                "Payment updated successfully."
            );

            return;
        }

        // =================================================
        // ADD PAYMENT
        // =================================================

        const newPayment = {

            id: Date.now(),

            supportId:
                historySupport.id,

            amountReceived:
                Number(
                    paymentAmountReceived
                ) || 0,

            receivedDate:
                paymentReceivedDate,

            amountPaid:
                Number(
                    paymentAmountPaid
                ) || 0,

            paidDate:
                paymentPaidDate,

            nextDueDate,

            comments:
                paymentComments
        };

        setPayments([
            ...payments,
            newPayment
        ]);

        setSupports(
            supports.map(
                support => {

                    if (
                        support.id ===
                        historySupport.id
                    ) {

                        return {

                            ...support,

                            nextDueDate,

                            lastPaymentDate:
                                paymentReceivedDate ||
                                paymentPaidDate
                        };
                    }

                    return support;
                }
            )
        );

        clearPaymentForm();

        showSuccess(
            "Payment added successfully."
        );
    };

    // =====================================================
    // EDIT PAYMENT
    // =====================================================

    const editPayment = (
        payment
    ) => {

        setPaymentAmountReceived(
            String(
                payment.amountReceived || ""
            )
        );

        setPaymentReceivedDate(
            payment.receivedDate || ""
        );

        setPaymentAmountPaid(
            String(
                payment.amountPaid || ""
            )
        );

        setPaymentPaidDate(
            payment.paidDate || ""
        );

        setPaymentComments(
            payment.comments || ""
        );

        setEditPaymentId(
            payment.id
        );
    };

    // =====================================================
    // DELETE PAYMENT
    // =====================================================

    const deletePayment = (
        paymentId
    ) => {

        const remainingPayments =
            payments.filter(
                payment =>
                    payment.id !==
                    paymentId
            );

        setPayments(
            remainingPayments
        );

        if (historySupport) {

            const supportPayments =
                remainingPayments.filter(
                    payment =>
                        payment.supportId ===
                        historySupport.id
                );

            const sortedPayments =
                [...supportPayments].sort(
                    (a, b) => {

                        const dateA =
                            new Date(
                                a.receivedDate ||
                                a.paidDate ||
                                "1900-01-01"
                            );

                        const dateB =
                            new Date(
                                b.receivedDate ||
                                b.paidDate ||
                                "1900-01-01"
                            );

                        return dateB - dateA;
                    }
                );

            const latestPayment =
                sortedPayments[0];

            setSupports(
                supports.map(
                    support => {

                        if (
                            support.id ===
                            historySupport.id
                        ) {

                            return {

                                ...support,

                                lastPaymentDate:
                                    latestPayment
                                        ? (
                                            latestPayment.receivedDate ||
                                            latestPayment.paidDate
                                        )
                                        : "",

                                nextDueDate:
                                    latestPayment
                                        ? latestPayment.nextDueDate
                                        : ""
                            };
                        }

                        return support;
                    }
                )
            );
        }

        if (
            editPaymentId ===
            paymentId
        ) {

            clearPaymentForm();
        }

        showSuccess(
            "Payment deleted successfully."
        );
    };

    // =====================================================
    // RETURN UI
    // =====================================================

    return (

        <div className="support-page">

            {/* =================================================
                NAVIGATION
            ================================================= */}

            <div className="support-navigation">

                <div className="support-brand">

                    <h2>
                        Support Management System
                    </h2>

                </div>

                <div className="support-nav-links">

                    <button
                        className={
                            activeMenu === "home"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActiveMenu("home")
                        }
                    >
                        Home
                    </button>

                    <button
                        className={
                            activeMenu === "addUser"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActiveMenu("addUser")
                        }
                    >
                        Add User
                    </button>

                    <button
                        className={
                            activeMenu === "viewUsers"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActiveMenu("viewUsers")
                        }
                    >
                        View Users
                    </button>

                    <button
                        className={
                            activeMenu === "support"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActiveMenu("support")
                        }
                    >
                        Support
                    </button>

                    <button
                        className={
                            activeMenu === "supportView"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActiveMenu("supportView")
                        }
                    >
                        Support View
                    </button>

                    <button
                        className={
                            activeMenu === "contact"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActiveMenu("contact")
                        }
                    >
                        Contact
                    </button>

                </div>

            </div>

            <div className="support-content">

               ```jsx
                {/* =================================================
                    HOME
                ================================================= */}

                {activeMenu === "home" && (

                    <section className="user-form-card home-card">

                        <div className="home-icon">
                            ✦
                        </div>

                        <h1>
                            Welcome to Support Management System
                        </h1>

                        <p>
                            Manage users, support assignments
                            and payment history from one place.
                        </p>

                        <div className="home-count-container">

                            <div className="home-count-card">
                                <h3>No. of Users</h3>
                                <h2>{users.length}</h2>
                            </div>

                            <div className="home-count-card">
                                <h3>No. of Customers</h3>
                                <h2>{customerUsers.length}</h2>
                            </div>

                        </div>

                    </section>

                )}
```

                {/* =================================================
                    ADD USER
                ================================================= */}

                {activeMenu === "addUser" && (

                    <section className="user-form-card">

                        <div className="page-title-row">

                            <div>

                                <span className="page-eyebrow">
                                    USER
                                </span>

                                <h1>
                                    {editUserId
                                        ? "Edit User"
                                        : "Add User"}
                                </h1>

                            </div>

                        </div>

                        <form
                            className="user-form"
                            onSubmit={
                                editUserId
                                    ? handleUpdateUser
                                    : handleAddUser
                            }
                        >

                            <div className="form-grid">

                                <div className="field">

                                    <label>
                                        Name *
                                    </label>

                                    <input
                                        type="text"
                                        value={name}
                                        maxLength="50"
                                        placeholder="Enter full name"
                                        onChange={e =>
                                            setName(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="field">

                                    <label>
                                        Type *
                                    </label>

                                    <select
                                        value={userType}
                                        onChange={e =>
                                            setUserType(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Select Type
                                        </option>

                                        <option value="User">
                                            User
                                        </option>

                                        <option value="Customer">
                                            Customer
                                        </option>

                                    </select>

                                </div>

                                <div className="field">

                                    <label>
                                        Contact Number *
                                    </label>

                                    <div className="contact-input-group">

                                        <select
                                            className="country-code"
                                            value={
                                                countryCode
                                            }
                                            onChange={e =>
                                                setCountryCode(
                                                    e.target.value
                                                )
                                            }
                                        >

                                            {countryCodes.map(
                                                code => (

                                                    <option
                                                        key={code}
                                                        value={code}
                                                    >
                                                        {code}
                                                    </option>

                                                )
                                            )}

                                        </select>

                                        <input
                                            type="text"
                                            value={contact}
                                            maxLength="10"
                                            placeholder="Enter 10 digit number"
                                            onChange={e =>
                                                setContact(
                                                    e.target.value.replace(
                                                        /\D/g,
                                                        ""
                                                    )
                                                )
                                            }
                                        />

                                    </div>

                                </div>

                                <div className="field">

                                    <label>
                                        Email *
                                    </label>

                                    <input
                                        type="email"
                                        value={email}
                                        placeholder="Enter email address"
                                        onChange={e =>
                                            setEmail(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="field">

                                    <label>
                                        Technology *
                                    </label>

                                    <select
                                        value=""
                                        onChange={
                                            handleTechnologyChange
                                        }
                                    >

                                        <option value="">
                                            Select Technology
                                        </option>

                                        {technologies.map(
                                            item => (

                                                <option
                                                    key={item}
                                                    value={item}
                                                >
                                                    {item}
                                                </option>

                                            )
                                        )}

                                    </select>

                                    <div className="custom-tech-row">

                                        <input
                                            type="text"
                                            value={
                                                customTechnology
                                            }
                                            placeholder="Enter new technology"
                                            onChange={e =>
                                                setCustomTechnology(
                                                    e.target.value
                                                )
                                            }
                                            onKeyDown={e => {

                                                if (
                                                    e.key ===
                                                    "Enter"
                                                ) {

                                                    e.preventDefault();

                                                    addCustomTechnology();
                                                }

                                            }}
                                        />

                                        <button
                                            type="button"
                                            className="secondary-button"
                                            onClick={
                                                addCustomTechnology
                                            }
                                        >
                                            Add
                                        </button>

                                    </div>

                                    {technology.length > 0 && (

                                        <div className="technology-tags">

                                            {technology.map(
                                                item => (

                                                    <div
                                                        className="technology-tag"
                                                        key={item}
                                                    >

                                                        <span>
                                                            {item}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeTechnology(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            ×
                                                        </button>

                                                    </div>

                                                )
                                            )}

                                        </div>

                                    )}

                                </div>

                            </div>

                            <div className="form-actions">

                                <button
                                    type="submit"
                                    className="primary-button"
                                >
                                    {editUserId
                                        ? "Update User"
                                        : "Add User"}
                                </button>

                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={
                                        clearUserForm
                                    }
                                >
                                    Clear
                                </button>

                            </div>

                        </form>

                    </section>
                )}

                {/* =================================================
                    VIEW USERS
                ================================================= */}

                {activeMenu === "viewUsers" && (

                    <section className="users-card">

                        <div className="users-header">

                            <div>

                                <span className="page-eyebrow">
                                    USERS
                                </span>

                                <h1>
                                    View Users
                                </h1>

                            </div>

                            <input
                                className="compact-search"
                                type="text"
                                placeholder="Search ID, name or email..."
                                value={searchUser}
                                onChange={e =>
                                    setSearchUser(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        {selectedUserId && (

                            <div className="user-view-tools">

                                <div className="user-top-actions">

                                    <button
                                        onClick={() => {

                                            const user =
                                                users.find(
                                                    u =>
                                                        u.id ===
                                                        selectedUserId
                                                );

                                            setViewUser(
                                                user
                                            );

                                        }}
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() => {

                                            const user =
                                                users.find(
                                                    u =>
                                                        u.id ===
                                                        selectedUserId
                                                );

                                            editUserRecord(
                                                user
                                            );

                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="danger-button"
                                        onClick={() => {

                                            const user =
                                                users.find(
                                                    u =>
                                                        u.id ===
                                                        selectedUserId
                                                );

                                            setDeleteUser(
                                                user
                                            );

                                        }}
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>
                        )}

                        <div className="table-container">

                            <table>

                                <thead>

                                    <tr>

                                        <th>User ID</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Contact</th>
                                        <th>Email</th>
                                        <th>Technology</th>
                                        <th>Registered Date</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredUsers.map(
                                        user => (

                                            <tr
                                                key={user.id}
                                                onClick={() =>
                                                    handleUserRowClick(
                                                        user
                                                    )
                                                }
                                                className={
                                                    selectedUserId ===
                                                    user.id
                                                        ? "selected-user-row"
                                                        : ""
                                                }
                                            >

                                                <td>

                                                    <span className="user-id-badge">
                                                        {user.id}
                                                    </span>

                                                </td>

                                                <td>
                                                    {user.name}
                                                </td>

                                                <td>

                                                    <span
                                                        className={
                                                            user.type ===
                                                            "User"
                                                                ? "type-badge user-type"
                                                                : "type-badge customer-type"
                                                        }
                                                    >
                                                        {user.type}
                                                    </span>

                                                </td>

                                                <td>
                                                    {user.countryCode}{" "}
                                                    {user.contact}
                                                </td>

                                                <td>
                                                    {user.email}
                                                </td>

                                                <td>

                                                    <div className="technology-list">

                                                        {user.technology?.map(
                                                            tech => (

                                                                <span
                                                                    className="table-tech-tag"
                                                                    key={
                                                                        tech
                                                                    }
                                                                >
                                                                    {tech}
                                                                </span>

                                                            )
                                                        )}

                                                    </div>

                                                </td>

                                                <td>
                                                    {
                                                        user.registeredDate
                                                    }
                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                        {filteredUsers.length === 0 && (

                            <div className="empty-state">
                                No users found.
                            </div>

                        )}

                    </section>
                )}

                {/* =================================================
                    SUPPORT ENTRY
                ================================================= */}

                {activeMenu === "support" && (

                    <section className="support-entry-card">

                        <div className="page-title-row">

                            <span className="page-eyebrow">
                                SUPPORT
                            </span>

                            <h1>
                                {editSupportId
                                    ? "Edit Support"
                                    : "Support"}
                            </h1>

                        </div>

                        <form
                            className="user-form"
                            onSubmit={
                                editSupportId
                                    ? handleUpdateSupport
                                    : handleAddSupport
                            }
                        >

                            <div className="support-form-grid">

                                <div className="field">

                                    <label>
                                        Support Person *
                                    </label>

                                    <select
                                        value={
                                            assignedSupportUser
                                        }
                                        onChange={e =>
                                            setAssignedSupportUser(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Select Support Person
                                        </option>

                                        {supportUsers.map(
                                            user => (

                                                <option
                                                    key={user.id}
                                                    value={user.id}
                                                >
                                                    {user.id} -{" "}
                                                    {user.name}
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>

                                <div className="field">

                                    <label>
                                        Client / Paying User *
                                    </label>

                                    <select
                                        value={
                                            supportClient
                                        }
                                        onChange={e =>
                                            setSupportClient(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Select Customer
                                        </option>

                                        {customerUsers.map(
                                            user => (

                                                <option
                                                    key={user.id}
                                                    value={user.id}
                                                >
                                                    {user.id} -{" "}
                                                    {user.name}
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>

                                <div className="field">

                                    <label>
                                        Support Start Date *
                                    </label>

                                    <input
                                        type="date"
                                        value={
                                            supportStartDate
                                        }
                                        onChange={e =>
                                            setSupportStartDate(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="field">

                                    <label>
                                        Support End Date
                                    </label>

                                    <input
                                        type="date"
                                        value={
                                            supportEndDate
                                        }
                                        onChange={e =>
                                            setSupportEndDate(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                {/* STATUS */}

                                <div className="field">

                                    <label>
                                        Status *
                                    </label>

                                    <select
                                        value={
                                            supportStatus
                                        }
                                        onChange={e =>
                                            setSupportStatus(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Select Status
                                        </option>

                                        {statusOptions.map(
                                            status => (

                                                <option
                                                    key={status}
                                                    value={status}
                                                >
                                                    {status}
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>

                                {/* AGREED AMOUNT */}

                                <div className="field">

                                    <label>
                                        Agreed Amount *
                                    </label>

                                    <select
                                        value={
                                            agreedAmount
                                        }
                                        onChange={e =>
                                            setAgreedAmount(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Select Amount
                                        </option>

                                        {amountOptions.map(
                                            amount => (

                                                <option
                                                    key={amount}
                                                    value={amount}
                                                >
                                                    ₹
                                                    {Number(
                                                        amount
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </option>

                                            )
                                        )}

                                        <option value="custom">
                                            Custom Amount
                                        </option>

                                    </select>

                                    {agreedAmount ===
                                        "custom" && (

                                        <input
                                            type="number"
                                            min="1"
                                            step="0.01"
                                            value={
                                                customAgreedAmount
                                            }
                                            placeholder="Enter custom amount"
                                            onChange={e =>
                                                setCustomAgreedAmount(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    )}

                                </div>

                                {/* SUPPORT AGREED AMOUNT */}

                                <div className="field">

                                    <label>
                                        Support Agreed Amount *
                                    </label>

                                    <select
                                        value={
                                            supportAgreedAmount
                                        }
                                        onChange={e =>
                                            setSupportAgreedAmount(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Select Amount
                                        </option>

                                        {amountOptions.map(
                                            amount => (

                                                <option
                                                    key={amount}
                                                    value={amount}
                                                >
                                                    ₹
                                                    {Number(
                                                        amount
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </option>

                                            )
                                        )}

                                        <option value="custom">
                                            Custom Amount
                                        </option>

                                    </select>

                                    {supportAgreedAmount ===
                                        "custom" && (

                                        <input
                                            type="number"
                                            min="1"
                                            step="0.01"
                                            value={
                                                customSupportAgreedAmount
                                            }
                                            placeholder="Enter support agreed amount"
                                            onChange={e =>
                                                setCustomSupportAgreedAmount(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    )}

                                </div>

                                <div className="field">

                                    <label>
                                        Support Period
                                    </label>

                                    <input
                                        type="text"
                                        readOnly
                                        value={
                                            supportStartDate &&
                                            supportEndDate
                                                ? `${calculateSupportPeriodDays(
                                                    supportStartDate,
                                                    supportEndDate
                                                )} Days`
                                                : "Ongoing"
                                        }
                                    />

                                </div>

                            </div>

                            <div className="form-actions">

                                <button
                                    type="submit"
                                    className="primary-button"
                                >
                                    {editSupportId
                                        ? "Update Support"
                                        : "Add Support"}
                                </button>

                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={
                                        clearSupportForm
                                    }
                                >
                                    Clear
                                </button>

                            </div>

                        </form>

                    </section>
                )}

                {/* =================================================
                    SUPPORT VIEW
                ================================================= */}

                {activeMenu === "supportView" && (

                    <section className="support-view-card">

                        <div className="support-view-header">

                            <div>

                                <span className="page-eyebrow">
                                    TRACKING
                                </span>

                                <h1>
                                    Support View
                                </h1>

                            </div>

                            <div className="support-view-tools">

                                <input
                                    className="compact-search"
                                    type="text"
                                    placeholder="Search support, person, client..."
                                    value={
                                        searchSupport
                                    }
                                    onChange={e =>
                                        setSearchSupport(
                                            e.target.value
                                        )
                                    }
                                />

                                {selectedSupportId && (

                                    <div className="support-top-actions">

                                        <button
                                            onClick={() =>
                                                openHistory(
                                                    getSelectedSupport()
                                                )
                                            }
                                        >
                                            History
                                        </button>

                                        <button
                                            onClick={() =>
                                                editSupportRecord(
                                                    getSelectedSupport()
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="danger-button"
                                            onClick={() =>
                                                setDeleteSupport(
                                                    getSelectedSupport()
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                )}

                            </div>

                        </div>

                        <div className="table-container">

                            <table className="support-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Support ID
                                        </th>

                                        <th>
                                            Support Person
                                        </th>

                                        <th>
                                            Client / Paying User
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Start Date
                                        </th>

                                        <th>
                                            End Date
                                        </th>

                                        <th>
                                            Agreed Amount
                                        </th>

                                        <th>
                                            Support Agreed Amount
                                        </th>

                                        <th>
                                            Amount Received
                                        </th>

                                        <th>
                                            Paid to Support
                                        </th>

                                        <th>
                                            Net Profit
                                        </th>

                                        <th>
                                            Support Period
                                        </th>

                                        <th>
                                            Last Payment Date
                                        </th>

                                        <th>
                                            Next Due Date
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredSupports.map(
                                        support => {

                                            const totals =
                                                getPaymentTotals(
                                                    support.id
                                                );

                                            const netProfit =
                                                totals.received -
                                                totals.paid;

                                            const supportPerson =
                                                users.find(
                                                    user =>
                                                        user.id ===
                                                        support.assignedUser
                                                );

                                            const client =
                                                users.find(
                                                    user =>
                                                        user.id ===
                                                        support.client
                                                );

                                            return (

                                                <tr
                                                    key={
                                                        support.id
                                                    }
                                                    onClick={() =>
                                                        handleSupportRowClick(
                                                            support
                                                        )
                                                    }
                                                    className={`
                                                        ${
                                                            selectedSupportId ===
                                                            support.id
                                                                ? "selected-support-row"
                                                                : ""
                                                        }

                                                        ${
                                                            highlightedSupportId ===
                                                            support.id
                                                                ? "latest-support-row"
                                                                : ""
                                                        }
                                                    `}
                                                >

                                                    <td>

                                                        <span className="support-id-badge">
                                                            {support.id}
                                                        </span>

                                                    </td>

                                                    <td>
                                                        {
                                                            supportPerson?.name ||
                                                            support.assignedUser
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            client?.name ||
                                                            support.client
                                                        }
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`status-badge status-${(
                                                                support.status ||
                                                                "Active"
                                                            )
                                                                .toLowerCase()
                                                                .replace(
                                                                    " ",
                                                                    "-"
                                                                )}`}
                                                        >
                                                            {
                                                                support.status ||
                                                                "Active"
                                                            }
                                                        </span>

                                                    </td>

                                                    <td>
                                                        {
                                                            support.startDate
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            support.endDate ||
                                                            "Ongoing"
                                                        }
                                                    </td>

                                                    <td>

                                                        ₹{" "}
                                                        {Number(
                                                            support.agreedAmount
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}

                                                    </td>

                                                    <td>

                                                        ₹{" "}
                                                        {Number(
                                                            support.supportAgreedAmount ||
                                                            0
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}

                                                    </td>

                                                    <td>

                                                        ₹{" "}
                                                        {totals.received.toLocaleString(
                                                            "en-IN"
                                                        )}

                                                    </td>

                                                    <td>

                                                        ₹{" "}
                                                        {totals.paid.toLocaleString(
                                                            "en-IN"
                                                        )}

                                                    </td>

                                                    <td>

                                                        ₹{" "}
                                                        {netProfit.toLocaleString(
                                                            "en-IN"
                                                        )}

                                                    </td>

                                                    <td>
                                                        {
                                                            support.supportPeriod
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            totals.lastPaymentDate ||
                                                            "-"
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            totals.nextDueDate ||
                                                            "-"
                                                        }
                                                    </td>

                                                </tr>

                                            );
                                        }
                                    )}

                                </tbody>

                            </table>

                        </div>

                        {filteredSupports.length === 0 && (

                            <div className="empty-state">
                                No support assignments found.
                            </div>

                        )}

                    </section>
                )}

                {/* =================================================
                    CONTACT
                ================================================= */}

                {activeMenu === "contact" && (

                    <section className="contact-card">

                        <span className="page-eyebrow">
                            SUPPORT
                        </span>

                        <h1>
                            Contact
                        </h1>

                        <div className="contact-content">

                            <div className="contact-item">

                                <span>
                                    Support Team
                                </span>

                                <strong>
                                    Support Management System
                                </strong>

                            </div>

                            <div className="contact-item">

                                <span>
                                    Email
                                </span>

                                <strong>
                                    support@example.com
                                </strong>

                            </div>

                            <div className="contact-item">

                                <span>
                                    Contact Number
                                </span>

                                <strong>
                                    +91 00000 00000
                                </strong>

                            </div>

                        </div>

                    </section>
                )}

            </div>

            {/* =================================================
                SUCCESS
            ================================================= */}

            {successMessage && (

                <div className="success-toast">

                    <span>
                        ✓
                    </span>

                    {successMessage}

                </div>

            )}

            {/* =================================================
                VIEW USER
            ================================================= */}

            {viewUser && (

                <div
                    className="modal-overlay"
                    onClick={() =>
                        setViewUser(null)
                    }
                >

                    <div
                        className="modal-card"
                        onClick={e =>
                            e.stopPropagation()
                        }
                    >

                        <div className="modal-title">

                            <div>

                                <span className="page-eyebrow">
                                    USER DETAILS
                                </span>

                                <h2>
                                    {viewUser.name}
                                </h2>

                            </div>

                        </div>

                        <div className="details-grid">

                            <div>

                                <span>
                                    User ID
                                </span>

                                <strong>
                                    {viewUser.id}
                                </strong>

                            </div>

                            <div>

                                <span>
                                    Type
                                </span>

                                <strong>
                                    {viewUser.type}
                                </strong>

                            </div>

                            <div>

                                <span>
                                    Contact
                                </span>

                                <strong>
                                    {viewUser.countryCode}{" "}
                                    {viewUser.contact}
                                </strong>

                            </div>

                            <div>

                                <span>
                                    Email
                                </span>

                                <strong>
                                    {viewUser.email}
                                </strong>

                            </div>

                            <div>

                                <span>
                                    Technology
                                </span>

                                <strong>
                                    {viewUser.technology?.join(
                                        ", "
                                    )}
                                </strong>

                            </div>

                            <div>

                                <span>
                                    Registered Date
                                </span>

                                <strong>
                                    {
                                        viewUser.registeredDate
                                    }
                                </strong>

                            </div>

                        </div>

                        <div className="confirm-actions">

                            <button
                                className="secondary-button"
                                onClick={() =>
                                    setViewUser(null)
                                }
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {/* =================================================
                DELETE USER
            ================================================= */}

            {deleteUser && (

                <div className="modal-overlay">

                    <div className="modal-card confirm-card">

                        <span className="delete-icon">
                            !
                        </span>

                        <h2>
                            Delete User?
                        </h2>

                        <p>
                            Are you sure you want to
                            delete{" "}
                            <strong>
                                {deleteUser.name}
                            </strong>
                            ?
                        </p>

                        <div className="confirm-actions">

                            <button
                                className="secondary-button"
                                onClick={() =>
                                    setDeleteUser(null)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="danger-confirm"
                                onClick={
                                    confirmDeleteUser
                                }
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {/* =================================================
                DELETE SUPPORT
            ================================================= */}

            {deleteSupport && (

                <div className="modal-overlay">

                    <div className="modal-card confirm-card">

                        <span className="delete-icon">
                            !
                        </span>

                        <h2>
                            Delete Support?
                        </h2>

                        <p>
                            Are you sure you want to
                            delete Support{" "}
                            <strong>
                                {deleteSupport.id}
                            </strong>
                            ?
                        </p>

                        <div className="confirm-actions">

                            <button
                                className="secondary-button"
                                onClick={() =>
                                    setDeleteSupport(null)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="danger-confirm"
                                onClick={
                                    confirmDeleteSupport
                                }
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {/* =================================================
                PAYMENT HISTORY
            ================================================= */}

            {historySupport && (

                <div className="modal-overlay">

                    <div className="modal-card history-modal">

                        <div className="modal-title">

                            <div>

                                <span className="page-eyebrow">
                                    PAYMENT HISTORY
                                </span>

                                <h2>
                                    Support{" "}
                                    {historySupport.id}
                                </h2>

                            </div>

                        </div>

                        {(() => {

                            const totals =
                                getPaymentTotals(
                                    historySupport.id
                                );

                            const balance =
                                Number(
                                    historySupport.agreedAmount
                                ) -
                                totals.received;

                            return (

                                <div className="history-summary">

                                    <div>

                                        <span>
                                            Agreed Amount
                                        </span>

                                        <strong>
                                            ₹{" "}
                                            {Number(
                                                historySupport.agreedAmount
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </strong>

                                    </div>

                                    <div>

                                        <span>
                                            Support Agreed Amount
                                        </span>

                                        <strong>
                                            ₹{" "}
                                            {Number(
                                                historySupport.supportAgreedAmount ||
                                                0
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </strong>

                                    </div>

                                    <div>

                                        <span>
                                            Amount Received
                                        </span>

                                        <strong>
                                            ₹{" "}
                                            {totals.received.toLocaleString(
                                                "en-IN"
                                            )}
                                        </strong>

                                    </div>

                                    <div>

                                        <span>
                                            Paid to Support
                                        </span>

                                        <strong>
                                            ₹{" "}
                                            {totals.paid.toLocaleString(
                                                "en-IN"
                                            )}
                                        </strong>

                                    </div>

                                    <div>

                                        <span>
                                            Balance
                                        </span>

                                        <strong>
                                            ₹{" "}
                                            {balance.toLocaleString(
                                                "en-IN"
                                            )}
                                        </strong>

                                    </div>

                                </div>

                            );

                        })()}

                        {/* PAYMENT FORM */}

                        <form
                            className="payment-form"
                            onSubmit={
                                handleSavePayment
                            }
                        >

                            <div className="payment-form-heading">

                                <div>

                                    <span className="page-eyebrow">
                                        {editPaymentId
                                            ? "EDIT PAYMENT"
                                            : "NEW PAYMENT"}
                                    </span>

                                    <h3>
                                        {editPaymentId
                                            ? "Edit Payment"
                                            : "Add Payment"}
                                    </h3>

                                </div>

                            </div>

                            <div className="payment-grid">

                                <div className="field">

                                    <label>
                                        Amount Received
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={
                                            paymentAmountReceived
                                        }
                                        placeholder="Enter received amount"
                                        onChange={e =>
                                            setPaymentAmountReceived(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="field">

                                    <label>
                                        Received Date
                                    </label>

                                    <input
                                        type="date"
                                        value={
                                            paymentReceivedDate
                                        }
                                        onChange={e =>
                                            setPaymentReceivedDate(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="field">

                                    <label>
                                        Amount Paid to Support
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={
                                            paymentAmountPaid
                                        }
                                        placeholder="Enter paid amount"
                                        onChange={e =>
                                            setPaymentAmountPaid(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="field">

                                    <label>
                                        Paid Date
                                    </label>

                                    <input
                                        type="date"
                                        value={
                                            paymentPaidDate
                                        }
                                        onChange={e =>
                                            setPaymentPaidDate(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="field">

                                    <label>
                                        Next Due Date
                                    </label>

                                    <input
                                        type="date"
                                        readOnly
                                        value={
                                            calculateNextDueDate(
                                                paymentReceivedDate ||
                                                paymentPaidDate,
                                                historySupport.supportPeriodDays
                                            )
                                        }
                                    />

                                </div>

                                <div className="field field-full">

                                    <label>
                                        Comments
                                    </label>

                                    <textarea
                                        value={
                                            paymentComments
                                        }
                                        placeholder="Enter payment comments"
                                        onChange={e =>
                                            setPaymentComments(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className="payment-form-actions">

                                <button
                                    type="submit"
                                    className="primary-button"
                                >
                                    {editPaymentId
                                        ? "Update Payment"
                                        : "Add Payment"}
                                </button>

                                {editPaymentId && (

                                    <button
                                        type="button"
                                        className="secondary-button"
                                        onClick={
                                            clearPaymentForm
                                        }
                                    >
                                        Cancel Edit
                                    </button>

                                )}

                            </div>

                        </form>

                        {/* PAYMENT RECORDS */}

                        <div className="history-table-title">
                            Payment Records
                        </div>

                        <div className="table-container">

                            <table className="payment-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Amount Received
                                        </th>

                                        <th>
                                            Received Date
                                        </th>

                                        <th>
                                            Amount Paid to Support
                                        </th>

                                        <th>
                                            Paid Date
                                        </th>

                                        <th>
                                            Next Due Date
                                        </th>

                                        <th>
                                            Comments
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {payments
                                        .filter(
                                            payment =>
                                                payment.supportId ===
                                                historySupport.id
                                        )
                                        .map(
                                            payment => (

                                                <tr
                                                    key={
                                                        payment.id
                                                    }
                                                >

                                                    <td>
                                                        ₹{" "}
                                                        {Number(
                                                            payment.amountReceived
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </td>

                                                    <td>
                                                        {
                                                            payment.receivedDate ||
                                                            "-"
                                                        }
                                                    </td>

                                                    <td>
                                                        ₹{" "}
                                                        {Number(
                                                            payment.amountPaid
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </td>

                                                    <td>
                                                        {
                                                            payment.paidDate ||
                                                            "-"
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            payment.nextDueDate ||
                                                            "-"
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            payment.comments ||
                                                            "-"
                                                        }
                                                    </td>

                                                    <td>

                                                        <div className="payment-actions">

                                                            <button
                                                                className="edit-payment-button"
                                                                onClick={() =>
                                                                    editPayment(
                                                                        payment
                                                                    )
                                                                }
                                                            >
                                                                Edit
                                                            </button>

                                                            <button
                                                                className="danger-button"
                                                                onClick={() =>
                                                                    deletePayment(
                                                                        payment.id
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                </tbody>

                            </table>

                        </div>

                        <div className="confirm-actions">

                            <button
                                className="secondary-button"
                                onClick={() => {

                                    clearPaymentForm();

                                    setHistorySupport(
                                        null
                                    );

                                }}
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Support;