import {
    auth,
    signOut,
    onAuthStateChanged,
    updatePassword,
    updateEmail,
    sendEmailVerification,
    storage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    doc,
    setDoc,
    db,
    getDoc,
    onSnapshot,
} from "../firebase.js";

//Initialize Toastr;
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-full-width",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

//To check the user Status
// onAuthStateChanged(auth, async (user) => {
//     if (user) {
//         const uid = user.uid;
//         const userStatus = document.getElementById("userStatus");
//         if (user.emailVerified === false) {
//             userStatus.innerHTML = `Please verify yourself to experience better.`;
//         } else {
//             userStatus.innerHTML = `Congratulations! you are verified user.`;
//         }
//         await picUpdate(uid);
//         await userName(uid);
//     } else {
//         let pathArr = location.pathname.split("/")
//         let path = `/${pathArr[pathArr.length - 2]}/${pathArr[pathArr.length - 1]}`
//         if (path === "/htmlPages/profile.html") {
//             location.pathname = location.pathname.replace("/htmlPages/profile.html", "/htmlPages/signup.html");
//         }
//     }
// });

//Getting User Name
const userName = async (uid) => {
    let userName = document.getElementById("userName");
    const docRef = doc(db, `usersData/${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let { name } = docSnap.data()
        userName.innerHTML = `Hy ${name}`;
    } else {
    }
}

//Select Show Pic
let file;
const selectShowPic = () => {
    let userPhotoUpload = document.getElementById("userPhotoUpload");
    let inputFile = document.getElementById("inputFile");
    userPhotoUpload.addEventListener("click", function () {
        inputFile.click();
    })
    inputFile.onchange = function () {
        file = inputFile.files[0];
        userPhotoUpload.src = URL.createObjectURL(file);
        console.log(file);
    };
}
selectShowPic();

//Uploading file
let uploadTask;
const uploadFile = async () => {
    // Validating select file
    if (!file) {
        toastr.warning("Please select a picture first.");
        return;
    }
    // File size validation
    if (file.size > 1572864) {
        toastr.warning("Picture must be less than 1.5Mb.");
        return;
    }
    // File type validation
    const fileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (!fileTypes.includes(file.type)) {
        toastr.error("Invalid Format. Please select JPG, JPEG, or PNG.");
        return;
    }
    progressDiv.style.display = "block";
    cancelUploadBtn.style.display = "block";
    fileSelectBtn.style.display = "none";
    const authCurrentUserUid = auth.currentUser.uid;
    const storageRef = ref(storage, `usersImages/${authCurrentUserUid}`);
    uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            toastr.info("uploading...");
            document.getElementById('progressBar').style.width = progress + '%';
        },
        (error) => {
            console.log("error", error);
            toastr.error("An error occurred while uploading the file. Please try again.");
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                    const imageUrl = downloadURL;
                    setDoc(doc(db, "usersImages", `${authCurrentUserUid}`), {
                        userImageUrl: imageUrl,
                    });
                    toastr.success("Your picture has been uploaded successfully.");
                    progressDiv.style.display = "none";
                    cancelUploadBtn.style.display = "none"
                })
                .catch(error => {
                    toastr.error("An error occurred while getting the download URL. Please try again.");
                });
        }
    );
}
const fileSelectBtn = document.getElementById("fileSelectBtn");
fileSelectBtn.addEventListener("click", uploadFile);

//Cancel File Upload
const cancelUpload = () => {
    uploadTask.cancel();
    toastr.info("Upload has been cancelled.");
}
const cancelUploadBtn = document.getElementById("cancelUploadBtn");
cancelUploadBtn.addEventListener("click", cancelUpload);

// Picture Update
const picUpdate = async (uid) => {
    await onSnapshot(doc(db, `usersImages/${uid}`), (doc) => {
        let data = doc.data()
        if (data) {
            let { userImageUrl } = data;
            userPhotoUpload.src = userImageUrl;
            toastr.success("Please wait. Your Picture has been updating.");
            fileSelectBtn.style.display = "block";
        }
    });
}

//Sending Email verification
const emailVerification = () => {
    sendEmailVerification(auth.currentUser)
        .then(() => {
            toastr.success("Goto inbox and Verify your-self.");
        }).catch(() => {
            toastr.error("Try again.");
        })
}
const verifyBtn = document.getElementById("verifyBtn");
verifyBtn.addEventListener('click', emailVerification);

//Logout
const logout = () => {
    signOut(auth).then(() => {
        toastr.success("You have logout successfully.");
        setTimeout(() => {
            window.location = "../htmlPages/signup.html";
        }, 2000);
    }).catch((error) => {
        toastr.error("Please try again.");
    });
}
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", logout);

//Privacy Password
const privacyProfile = async () => {
    let oldEmail = document.getElementById("oldEmail");
    let oldPassword = document.getElementById("oldPassword");
    const user = auth.currentUser;
    const uid = user.uid;
    oldEmail.value = user.email;
    const docRef = doc(db, `usersData/${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let { password } = docSnap.data()
        oldPassword.value = password;
    } else {
    }

}
const privacySettingsBtn = document.getElementById("privacySettingsBtn");
privacySettingsBtn.addEventListener("click", privacyProfile);

//Update email
const editEmail = async () => {
    const newEmail = document.getElementById("newEmail").value;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const user = auth.currentUser;
    if (newEmail === "") {
        toastr.error("Please provide email.");
    } else if (!emailRegex.test(newEmail)) {
        toastr.error("Invalid email.");
    } else {
        await updateEmail(user, newEmail).then(() => {
            toastr.success("Email updated successfully.");
            privacySettingsModalCloseBtn.click();
        }).catch((error) => {
            toastr.error("Please try again. An error occured.");
        });
    }
}
const updatEmailBtn = document.getElementById("updateEmailBtn");
updatEmailBtn.addEventListener("click", editEmail);

//Update Password
const editPassword = async () => {
    const newPassword = document.getElementById("newPassword").value;
    var passwordRegex = /^\d{8}$/;
    const user = auth.currentUser;
    if (newPassword === "") {
        toastr.error("Please provide new password.");
    } else if (!passwordRegex.test(newPassword)) {
        toastr.error("Password should be only digits or numbers and minmimum Eight characters.");
    } else {
        await updatePassword(user, newPassword).then(() => {
            toastr.success("Password updated successfully.");
            privacySettingsModalCloseBtn.click();
        }).catch((error) => {
            toastr.error("Try again.")
        });
    }
}
const updatePasswordBtn = document.getElementById("updatePasswordBtn");
updatePasswordBtn.addEventListener("click", editPassword);

//Theme Toggler Js
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const themeIcon = document.getElementById('theme-icon');
    if (body.classList.contains('dark-mode')) {
        themeIcon.outerHTML = `
            <svg  id="theme-icon" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"
              fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-moon"><path stroke="none" d="M0 0h24v24H0z"
                 fill="none"/><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" /></svg>
        `;
    } else {
        themeIcon.outerHTML = `
        <svg id="theme-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="icon icon-tabler icon-tabler-sun">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
        `;
    }
}
const toggleDarkModeBtn = document.getElementById("toggleDarkModeBtn");
toggleDarkModeBtn.addEventListener("click", toggleDarkMode);

//Password Togggle Visiblilty
const showPassword4 = document.getElementById("showPassword4");
showPassword4.addEventListener("click", () => {
    const oldPassword = document.getElementById("oldPassword");
    if (oldPassword.type === "password") {
        oldPassword.type = "text";
        showPassword4.src = "../images/eye.svg";
    } else {
        oldPassword.type = "password";
        showPassword4.src = "../images/eye-off.svg";
    }
});

//Password Togggle Visiblilty
const showPassword5 = document.getElementById("showPassword5");
showPassword5.addEventListener("click", () => {
    const newPassword = document.getElementById("newPassword");
    if (newPassword.type === "password") {
        newPassword.type = "text";
        showPassword5.src = "../images/eye.svg";
    } else {
        newPassword.type = "password";
        showPassword5.src = "../images/eye-off.svg";
    }
});


