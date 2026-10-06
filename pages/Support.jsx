import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Support.css";

function Support() {

    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState("add");

    const [users, setUsers] = useState([]);

    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [technology, setTechnology] = useState("");
    const [timeZone, setTimeZone] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [showTimePicker, setShowTimePicker] = useState(false);

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const [deleteUser, setDeleteUser] = useState(null);

    const [editUser, setEditUser] = useState(null);

    // OTP states
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    // Success screen
    const [showSuccess, setShowSuccess] = useState(false);

    // User details
    const [selectedUser, setSelectedUser] = useState(null);


    const technologies = [
        "Java",
        "Python",
        "Gen AI",
        "React",
        "Angular",
        ".NET",
        "DevOps",
        "Cloud Computing"
    ];

    const timeZones = [
        "IST",
        "EST",
        "CST",
        "MST",
        "PST",
        "GMT",
        "CET",
        "AEST"
    ];


    // Generate 30-minute intervals
    const generateTimeOptions = () => {

        const times = [];

        for (let hour = 0; hour < 24; hour++) {

            for (let minute = 0; minute < 60; minute += 30) {

                const value =
                    String(hour).padStart(2, "0") +
                    ":" +
                    String(minute).padStart(2, "0");

                const displayHour =
                    hour === 0
                        ? 12
                        : hour > 12
                            ? hour - 12
                            : hour;

                const period = hour >= 12 ? "PM" : "AM";

                const display =
                    String(displayHour).padStart(2, "0") +
                    ":" +
                    String(minute).padStart(2, "0") +
                    " " +
                    period;

                times.push({
                    value,
                    display
                });
            }
        }

        return times;
    };


    const timeOptions = generateTimeOptions();


    const getDisplayTime = (time) => {

        if (!time) {
            return "";
        }

        const [hour, minute] = time.split(":");

        const hourNumber = Number(hour);

        const displayHour =
            hourNumber === 0
                ? 12
                : hourNumber > 12
                    ? hourNumber - 12
                    : hourNumber;

        const period = hourNumber >= 12 ? "PM" : "AM";

        return (
            String(displayHour).padStart(2, "0") +
            ":" +
            minute +
            " " +
            period
        );
    };


    const selectStartTime = (time) => {

        setStartTime(time);

        if (endTime && endTime <= time) {
            setEndTime("");
        }
    };


    const selectEndTime = (time) => {

        if (!startTime) {
            return;
        }

        if (time <= startTime) {
            return;
        }

        setEndTime(time);

        setTimeout(() => {
            setShowTimePicker(false);
        }, 150);
    };


    const validateForm = () => {

        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Name is required";
        }
        else if (name.trim().length < 3) {
            newErrors.name =
                "Name must contain at least 3 characters";
        }
        else if (name.trim().length > 50) {
            newErrors.name =
                "Name cannot exceed 50 characters";
        }

        if (!contact.trim()) {
            newErrors.contact =
                "Contact number is required";
        }
        else if (!/^\d{10}$/.test(contact)) {
            newErrors.contact =
                "Contact number must contain exactly 10 digits";
        }

        if (!email.trim()) {
            newErrors.email =
                "Email is required";
        }
        else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            newErrors.email =
                "Enter a valid email address";
        }

        if (!technology) {
            newErrors.technology =
                "Please select technology";
        }

        if (!timeZone) {
            newErrors.timeZone =
                "Please select time zone";
        }

        if (!startTime || !endTime) {
            newErrors.supportTime =
                "Please select support time";
        }

        if (
            startTime &&
            endTime &&
            endTime <= startTime
        ) {
            newErrors.supportTime =
                "End time must be after start time";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const clearForm = () => {

        setName("");
        setContact("");
        setEmail("");
        setTechnology("");
        setTimeZone("");
        setStartTime("");
        setEndTime("");

        setErrors({});

        setEditUser(null);
    };


    /*
     * ADD / UPDATE BUTTON
     *
     * Important:
     * We DO NOT directly add the user.
     * First we open OTP verification.
     */

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setOtp("");
        setOtpError("");
        setOtpSent(true);

        setShowOtp(true);
    };


    /*
     * OTP VERIFICATION
     *
     * Currently demo OTP = 123456
     *
     * Later this will call Spring Boot API.
     */

    const verifyOtp = () => {

        if (otp.length !== 6) {

            setOtpError(
                "Please enter the 6-digit OTP"
            );

            return;
        }


        // DEMO OTP
        if (otp !== "123456") {

            setOtpError(
                "Invalid OTP. Please try again."
            );

            return;
        }


        // OTP successful

        const enrollmentDate =
            new Date().toLocaleDateString("en-IN");


        if (editUser) {

            const updatedUser = {
                ...editUser,

                name: name.trim(),

                contact,

                email,

                technology,

                timeZone,

                startTime,

                endTime
            };

            setUsers(
                users.map(user =>
                    user.id === editUser.id
                        ? updatedUser
                        : user
                )
            );

        } else {

            const newUser = {

                id:
                    "USR-" +
                    String(Date.now()).slice(-6),

                name: name.trim(),

                contact,

                email,

                technology,

                timeZone,

                startTime,

                endTime,

                enrollmentDate
            };

            setUsers([
                ...users,
                newUser
            ]);
        }


        setShowOtp(false);

        setOtp("");

        setOtpError("");

        setOtpSent(false);

        setShowSuccess(true);

        clearForm();
    };


    const resendOtp = () => {

        setOtp("");

        setOtpError("");

        setOtpSent(true);

        /*
         * Later:
         * Call Spring Boot API here
         * to send a real OTP.
         */
    };


    const handleDone = () => {

        setShowSuccess(false);

        setActiveMenu("view");
    };


    const handleEdit = (user) => {

        setEditUser(user);

        setName(user.name);
        setContact(user.contact);
        setEmail(user.email);
        setTechnology(user.technology);
        setTimeZone(user.timeZone);
        setStartTime(user.startTime);
        setEndTime(user.endTime);

        setErrors({});

        setActiveMenu("add");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    const confirmDelete = () => {

        setUsers(
            users.filter(
                user =>
                    user.id !== deleteUser.id
            )
        );

        setDeleteUser(null);

        setSuccessMessage(
            "User deleted successfully!"
        );

        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
    };


    const handleMenuChange = (menu) => {

        setActiveMenu(menu);

        setDeleteUser(null);

        setSelectedUser(null);

        setSuccessMessage("");

        setShowSuccess(false);

        if (menu !== "add") {
            setEditUser(null);
        }
    };


    return (

        <div className="support-page">


            {/* ================================
                SUPPORT NAVIGATION
            ================================= */}

            <div className="support-navigation">

                <div className="support-brand">

                    <div className="support-brand-icon">
                        ✦
                    </div>

                    <div>
                        <strong>
                            Support Center
                        </strong>

                        <span>
                            Management Portal
                        </span>
                    </div>

                </div>


                <div className="support-nav-buttons">

                    <button
                        className={
                            activeMenu === "home"
                                ? "support-nav-button active"
                                : "support-nav-button"
                        }
                        onClick={() => {

                            handleMenuChange("home");

                            navigate("/");
                        }}
                    >
                        <span>⌂</span>
                        Home
                    </button>


                    <button
                        className={
                            activeMenu === "add"
                                ? "support-nav-button active"
                                : "support-nav-button"
                        }
                        onClick={() =>
                            handleMenuChange("add")
                        }
                    >
                        <span>＋</span>
                        Add User
                    </button>


                    <button
                        className={
                            activeMenu === "view"
                                ? "support-nav-button active"
                                : "support-nav-button"
                        }
                        onClick={() =>
                            handleMenuChange("view")
                        }
                    >
                        <span>◉</span>
                        View Users
                    </button>

                </div>

            </div>


            <main className="support-content">


                {/* SUCCESS MESSAGE */}

                {successMessage && (

                    <div className="success-card">

                        <div className="success-icon">
                            ✓
                        </div>

                        <div>

                            <strong>
                                Success!
                            </strong>

                            <p>
                                {successMessage}
                            </p>

                        </div>

                    </div>
                )}


                {/* ================================
                    HOME
                ================================= */}

                {activeMenu === "home" && (

                    <section className="support-home">

                        <div className="support-heading">

                            <span>
                                SUPPORT MANAGEMENT
                            </span>

                            <h1>
                                Everything you need,
                                <br />
                                <em>in one place.</em>
                            </h1>

                            <p>
                                Manage support users and
                                their availability with ease.
                            </p>

                        </div>


                        <div className="home-action-cards">

                            <button
                                className="home-action-card purple"
                                onClick={() =>
                                    handleMenuChange("add")
                                }
                            >

                                <div>＋</div>

                                <h3>
                                    Add New User
                                </h3>

                                <p>
                                    Create a new support
                                    user profile.
                                </p>

                            </button>


                            <button
                                className="home-action-card blue"
                                onClick={() =>
                                    handleMenuChange("view")
                                }
                            >

                                <div>◉</div>

                                <h3>
                                    View Users
                                </h3>

                                <p>
                                    View and manage all
                                    support users.
                                </p>

                            </button>

                        </div>

                    </section>
                )}


                {/* ================================
                    ADD USER
                ================================= */}

                {activeMenu === "add" && (

                    <section className="add-user-section">


                        {/* Only small heading */}

                        <div className="simple-page-title">

                            <h1>
                                {editUser
                                    ? "Update User"
                                    : "Add User"}
                            </h1>

                            <p>
                                {editUser
                                    ? "Update the support user's details."
                                    : "Create a new support user profile."}
                            </p>

                        </div>


                        <form
                            className="form-card"
                            onSubmit={handleSubmit}
                        >


                            {/* PERSONAL INFORMATION */}

                            <div className="form-section">

                                <div className="form-top">

                                    <div className="form-icon">
                                        👤
                                    </div>

                                    <div>

                                        <h2>
                                            Personal Information
                                        </h2>

                                        <p>
                                            User contact details
                                        </p>

                                    </div>

                                </div>


                                <div className="input-group">

                                    <label>
                                        Name
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter full name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(
                                                e.target.value
                                            )
                                        }
                                    />

                                    {errors.name && (

                                        <small className="error">
                                            {errors.name}
                                        </small>

                                    )}

                                </div>


                                <div className="input-group">

                                    <label>
                                        Contact Number
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        maxLength="10"
                                        placeholder="10 digit mobile number"
                                        value={contact}
                                        onChange={(e) => {

                                            const value =
                                                e.target.value.replace(
                                                    /\D/g,
                                                    ""
                                                );

                                            setContact(value);
                                        }}
                                    />

                                    {errors.contact && (

                                        <small className="error">
                                            {errors.contact}
                                        </small>

                                    )}

                                </div>


                                <div className="input-group">

                                    <label>
                                        Email
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="example@email.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(
                                                e.target.value
                                            )
                                        }
                                    />

                                    {errors.email && (

                                        <small className="error">
                                            {errors.email}
                                        </small>

                                    )}

                                </div>

                            </div>


                            {/* SUPPORT INFORMATION */}

                            <div className="form-section">

                                <div className="form-top">

                                    <div className="form-icon">
                                        ⚙
                                    </div>

                                    <div>

                                        <h2>
                                            Support Information
                                        </h2>

                                        <p>
                                            Technical availability
                                        </p>

                                    </div>

                                </div>


                                <div className="input-group">

                                    <label>
                                        Technology
                                        <span>*</span>
                                    </label>

                                    <select
                                        value={technology}
                                        onChange={(e) =>
                                            setTechnology(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Select technology
                                        </option>

                                        {technologies.map(
                                            tech => (

                                                <option
                                                    key={tech}
                                                    value={tech}
                                                >
                                                    {tech}
                                                </option>

                                            )
                                        )}

                                    </select>

                                    {errors.technology && (

                                        <small className="error">
                                            {errors.technology}
                                        </small>

                                    )}

                                </div>


                                <div className="input-group">

                                    <label>
                                        Time Zone
                                        <span>*</span>
                                    </label>

                                    <select
                                        value={timeZone}
                                        onChange={(e) =>
                                            setTimeZone(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Select time zone
                                        </option>

                                        {timeZones.map(
                                            zone => (

                                                <option
                                                    key={zone}
                                                    value={zone}
                                                >
                                                    {zone}
                                                </option>

                                            )
                                        )}

                                    </select>

                                    {errors.timeZone && (

                                        <small className="error">
                                            {errors.timeZone}
                                        </small>

                                    )}

                                </div>


                                {/* SUPPORT TIME */}

                                <div className="input-group">

                                    <label>
                                        Support Time
                                        <span>*</span>
                                    </label>


                                    <button
                                        type="button"
                                        className={
                                            startTime &&
                                                endTime
                                                ? "time-selector selected"
                                                : "time-selector"
                                        }
                                        onClick={() =>
                                            setShowTimePicker(
                                                !showTimePicker
                                            )
                                        }
                                    >

                                        <span className="clock">
                                            🕒
                                        </span>

                                        <span className="time-content">

                                            <small>
                                                {startTime &&
                                                    endTime
                                                    ? "Selected Support Time"
                                                    : "Choose Support Time"}
                                            </small>

                                            <strong>

                                                {startTime &&
                                                    endTime
                                                    ? `${getDisplayTime(startTime)} - ${getDisplayTime(endTime)}`
                                                    : "Select start and end time"}

                                            </strong>

                                        </span>

                                        <span className="time-arrow">
                                            {showTimePicker
                                                ? "▲"
                                                : "▼"}
                                        </span>

                                    </button>


                                    {errors.supportTime && (

                                        <small className="error">
                                            {errors.supportTime}
                                        </small>

                                    )}


                                    {showTimePicker && (

                                        <div className="time-picker">

                                            <div className="time-picker-title">

                                                <div>

                                                    <span>
                                                        SUPPORT HOURS
                                                    </span>

                                                    <h3>
                                                        Choose your time
                                                    </h3>

                                                </div>

                                                <div className="time-picker-icon">
                                                    🕐
                                                </div>

                                            </div>


                                            <div className="time-columns">


                                                {/* START TIME */}

                                                <div className="time-column">

                                                    <div className="time-column-header">

                                                        <span>
                                                            01
                                                        </span>

                                                        <div>

                                                            <strong>
                                                                Start Time
                                                            </strong>

                                                            <small>
                                                                Choose starting time
                                                            </small>

                                                        </div>

                                                    </div>


                                                    <div className="time-options">

                                                        {timeOptions.map(
                                                            time => (

                                                                <button
                                                                    type="button"
                                                                    key={
                                                                        time.value
                                                                    }
                                                                    className={
                                                                        startTime ===
                                                                            time.value
                                                                            ? "time-option selected"
                                                                            : "time-option"
                                                                    }
                                                                    onClick={() =>
                                                                        selectStartTime(
                                                                            time.value
                                                                        )
                                                                    }
                                                                >
                                                                    {time.display}
                                                                </button>

                                                            )
                                                        )}

                                                    </div>

                                                </div>


                                                {/* END TIME */}

                                                <div className="time-column">

                                                    <div className="time-column-header">

                                                        <span>
                                                            02
                                                        </span>

                                                        <div>

                                                            <strong>
                                                                End Time
                                                            </strong>

                                                            <small>
                                                                Choose ending time
                                                            </small>

                                                        </div>

                                                    </div>


                                                    <div className="time-options">

                                                        {timeOptions
                                                            .filter(
                                                                time =>
                                                                    !startTime ||
                                                                    time.value >
                                                                    startTime
                                                            )
                                                            .map(
                                                                time => (

                                                                    <button
                                                                        type="button"
                                                                        key={
                                                                            time.value
                                                                        }
                                                                        disabled={
                                                                            !startTime
                                                                        }
                                                                        className={
                                                                            endTime ===
                                                                                time.value
                                                                                ? "time-option selected"
                                                                                : "time-option"
                                                                        }
                                                                        onClick={() =>
                                                                            selectEndTime(
                                                                                time.value
                                                                            )
                                                                        }
                                                                    >
                                                                        {time.display}
                                                                    </button>

                                                                )
                                                            )}

                                                    </div>

                                                </div>

                                            </div>


                                            <div className="time-info">

                                                <span>
                                                    ✓
                                                </span>

                                                Only 30-minute
                                                intervals are available

                                            </div>

                                        </div>
                                    )}

                                </div>


                                <div className="form-actions">

                                    <button
                                        type="button"
                                        className="clear-button"
                                        onClick={clearForm}
                                    >
                                        Clear
                                    </button>


                                    <button
                                        type="submit"
                                        className="submit-button"
                                    >

                                        {editUser
                                            ? "Update User"
                                            : "Add User"}

                                        <span>
                                            →
                                        </span>

                                    </button>

                                </div>

                            </div>

                        </form>

                    </section>
                )}


                {/* ================================
                    VIEW USERS
                ================================= */}

                {activeMenu === "view" && (

                    <section>

                        <div className="simple-page-title">

                            <h1>
                                View Users
                            </h1>

                            <p>
                                Manage your support users.
                            </p>

                        </div>


                        <div className="users-card">

                            <div className="users-header">

                                <div>

                                    <h2>
                                        All Users
                                    </h2>

                                    <p>
                                        Registered support users
                                    </p>

                                </div>

                                <div className="user-count">
                                    {users.length} Users
                                </div>

                            </div>


                            {users.length === 0 ? (

                                <div className="empty-users">

                                    <div>
                                        ◉
                                    </div>

                                    <h3>
                                        No users yet
                                    </h3>

                                    <p>
                                        Add your first support
                                        user to see them here.
                                    </p>

                                    <button
                                        onClick={() =>
                                            handleMenuChange(
                                                "add"
                                            )
                                        }
                                    >
                                        + Add User
                                    </button>

                                </div>

                            ) : (

                                <div className="table-wrapper">

                                    <table>

                                        <thead>

                                            <tr>

                                                <th>
                                                    User
                                                </th>

                                                <th>
                                                    Contact
                                                </th>

                                                <th>
                                                    Technology
                                                </th>

                                                <th>
                                                    Time Zone
                                                </th>

                                                <th>
                                                    Support Time
                                                </th>

                                                <th>
                                                    Actions
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {users.map(
                                                user => (

                                                    <tr
                                                        key={
                                                            user.id
                                                        }
                                                    >

                                                        <td>

                                                            <div className="user-info">

                                                                <div className="avatar">
                                                                    {user.name
                                                                        .charAt(0)
                                                                        .toUpperCase()}
                                                                </div>

                                                                <div>

                                                                    <strong>
                                                                        {user.name}
                                                                    </strong>

                                                                    <small>
                                                                        {user.id}
                                                                    </small>

                                                                </div>

                                                            </div>

                                                        </td>


                                                        <td>

                                                            <div>
                                                                {user.contact}
                                                            </div>

                                                            <small>
                                                                {user.email}
                                                            </small>

                                                        </td>


                                                        <td>

                                                            <span className="badge">
                                                                {user.technology}
                                                            </span>

                                                        </td>


                                                        <td>
                                                            {user.timeZone}
                                                        </td>


                                                        <td>

                                                            {getDisplayTime(
                                                                user.startTime
                                                            )}

                                                            {" - "}

                                                            {getDisplayTime(
                                                                user.endTime
                                                            )}

                                                        </td>


                                                        <td>

                                                            <div className="actions">

                                                                <button
                                                                    className="edit-button"
                                                                    onClick={() =>
                                                                        handleEdit(
                                                                            user
                                                                        )
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>


                                                                <button
                                                                    className="delete-button"
                                                                    onClick={() =>
                                                                        setDeleteUser(
                                                                            user
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
                                                                </button>


                                                                <button
                                                                    className="view-button"
                                                                    onClick={() =>
                                                                        setSelectedUser(
                                                                            user
                                                                        )
                                                                    }
                                                                >
                                                                    View
                                                                </button>

                                                            </div>

                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>
                            )}

                        </div>

                    </section>
                )}

            </main>


            {/* ================================
                OTP POPUP
            ================================= */}

            {showOtp && (

                <div className="delete-overlay">

                    <div className="otp-card">

                        <div className="otp-icon">
                            ✉
                        </div>

                        <span className="otp-label">
                            VERIFY MOBILE NUMBER
                        </span>

                        <h2>
                            Verify your number
                        </h2>

                        <p>
                            We've sent a 6-digit OTP to
                        </p>

                        <strong className="otp-mobile">
                            +91 {contact}
                        </strong>


                        <input
                            className="otp-input"
                            type="text"
                            maxLength="6"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) => {

                                const value =
                                    e.target.value.replace(
                                        /\D/g,
                                        ""
                                    );

                                setOtp(value);

                                setOtpError("");
                            }}
                        />


                        {otpError && (

                            <div className="otp-error">
                                {otpError}
                            </div>

                        )}


                        <button
                            className="verify-otp-button"
                            onClick={verifyOtp}
                        >
                            Verify OTP
                            <span>→</span>
                        </button>


                        <button
                            className="resend-otp-button"
                            onClick={resendOtp}
                        >
                            Resend OTP
                        </button>


                        <div className="demo-otp">
                            Demo OTP: <strong>123456</strong>
                        </div>


                        <button
                            className="cancel-otp"
                            onClick={() =>
                                setShowOtp(false)
                            }
                        >
                            Cancel
                        </button>

                    </div>

                </div>
            )}


            {/* ================================
                PREMIUM SUCCESS
            ================================= */}

            {showSuccess && (

                <div className="delete-overlay">

                    <div className="premium-success-card">

                        <div className="success-orbit">

                            <div className="success-big-icon">
                                ✓
                            </div>

                        </div>


                        <div className="success-stars">
                            ✦　✧　✦
                        </div>


                        <span className="success-small-title">
                            ALL SET
                        </span>


                        <h2>
                            You're all set! ✨
                        </h2>


                        <p>
                            The support user has been
                            successfully added and verified.
                        </p>


                        <div className="thank-you-message">
                            Thank you for keeping your
                            support team connected. 💜
                        </div>


                        <button
                            className="success-done-button"
                            onClick={handleDone}
                        >
                            Done
                            <span>→</span>
                        </button>

                    </div>

                </div>
            )}


            {/* ================================
                USER DETAILS
            ================================= */}

            {selectedUser && (

                <div className="delete-overlay">

                    <div className="user-details-card">

                        <button
                            className="details-close"
                            onClick={() =>
                                setSelectedUser(null)
                            }
                        >
                            ×
                        </button>


                        <div className="details-header">

                            <div className="large-avatar">
                                {selectedUser.name
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div>

                                <span>
                                    SUPPORT USER
                                </span>

                                <h2>
                                    {selectedUser.name}
                                </h2>

                                <small>
                                    {selectedUser.id}
                                </small>

                            </div>

                        </div>


                        <div className="details-grid">

                            <div className="detail-item">

                                <span>
                                    Contact Number
                                </span>

                                <strong>
                                    {selectedUser.contact}
                                </strong>

                            </div>


                            <div className="detail-item">

                                <span>
                                    Email
                                </span>

                                <strong>
                                    {selectedUser.email}
                                </strong>

                            </div>


                            <div className="detail-item">

                                <span>
                                    Technology
                                </span>

                                <strong>
                                    {selectedUser.technology}
                                </strong>

                            </div>


                            <div className="detail-item">

                                <span>
                                    Time Zone
                                </span>

                                <strong>
                                    {selectedUser.timeZone}
                                </strong>

                            </div>


                            <div className="detail-item">

                                <span>
                                    Enrollment Date
                                </span>

                                <strong>
                                    {selectedUser.enrollmentDate}
                                </strong>

                            </div>


                            <div className="detail-item">

                                <span>
                                    Support Time
                                </span>

                                <strong>
                                    {getDisplayTime(
                                        selectedUser.startTime
                                    )}
                                    {" - "}
                                    {getDisplayTime(
                                        selectedUser.endTime
                                    )}
                                </strong>

                            </div>

                        </div>


                        <button
                            className="details-done-button"
                            onClick={() =>
                                setSelectedUser(null)
                            }
                        >
                            Close
                        </button>

                    </div>

                </div>
            )}


            {/* ================================
                DELETE CONFIRMATION
            ================================= */}

            {deleteUser && (

                <div className="delete-overlay">

                    <div className="delete-card">

                        <div className="delete-symbol">
                            !
                        </div>

                        <h2>
                            Delete this user?
                        </h2>

                        <p>
                            You are about to delete this
                            support user.
                        </p>


                        <div className="delete-user">

                            <div className="avatar">
                                {deleteUser.name
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div>

                                <strong>
                                    {deleteUser.name}
                                </strong>

                                <span>
                                    {deleteUser.id}
                                </span>

                            </div>

                        </div>


                        <div className="delete-details">

                            <span>
                                📧 {deleteUser.email}
                            </span>

                            <span>
                                📱 {deleteUser.contact}
                            </span>

                        </div>


                        <div className="delete-buttons">

                            <button
                                onClick={() =>
                                    setDeleteUser(null)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="confirm-delete"
                                onClick={confirmDelete}
                            >
                                Confirm Delete
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Support;