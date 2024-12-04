import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged,
    setDoc,
    db,
    doc
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
onAuthStateChanged(auth, async (user) => {
    if (user) {
    } else {
        if (location.pathname === "../htmlPages/profile.html") {
            location.pathname = "../htmlPages/signup.html";
        }
    }
});

//SignUp Form
// const registerYourSelf = async () => {
//     event.preventDefault();
//     var nameSignUp = document.getElementById("nameSignUp");
//     var emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
//     var emailSignUp = document.getElementById("emailSignUp");
//     var passwordSignUp = document.getElementById("passwordSignUp");
//     var confirmPasswordSignUp = document.getElementById("cpasswordSignUp");
//     var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
//     const signIn = document.getElementById("signIn");

//     if (nameSignUp.value === "") {
//         toastr.error("Please Write Name.");
//     } else if (emailSignUp.value === "") {
//         toastr.error("Please Write email.");
//     } else if (!emailRegex.test(emailSignUp.value)) {
//         toastr.error("Invalid email.");
//     } else if (passwordSignUp.value === "") {
//         toastr.error("Please Write Password.");
//     } else if (!passwordRegex.test(passwordSignUp.value)) {
//         toastr.error("Password should be only digits or numbers and minmimum Eight characters.");
//     } else if (confirmPasswordSignUp.value === "") {
//         toastr.error("Please write confirm Password.");
//     } else if (passwordSignUp.value !== confirmPasswordSignUp.value) {
//         toastr.error("Please match password.");
//     } else {
//         await createUserWithEmailAndPassword(auth, emailSignUp.value, passwordSignUp.value)
//             .then((userCredential) => {
//                 const user = userCredential.user;
//                 toastr.success(`You have been registered successfully.`);

//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 if (errorCode === "auth/email-already-in-use") {
//                     toastr.info("Email already registered.")
//                 }
//             });
//         let uid = auth.currentUser.uid;
//         await setDoc(doc(db, `usersData/${uid}`), {
//             name: nameSignUp.value,
//             password: passwordSignUp.value,
//         });
//         signIn.click();
//         document.getElementById("nameSignUp").value = "";
//         document.getElementById("emailSignUp").value = "";
//         document.getElementById("passwordSignUp").value = "";
//         document.getElementById("cpasswordSignUp").value = "";
//     }

// };

// const registerYourSelfBtn = document.getElementById("registerYourSelfBtn");
// registerYourSelfBtn.addEventListener("click", registerYourSelf);

const registerYourSelf = async (event) => {
    event.preventDefault();

    var nameSignUp = document.getElementById("nameSignUp");
    var emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    var emailSignUp = document.getElementById("emailSignUp");
    var passwordSignUp = document.getElementById("passwordSignUp");
    var confirmPasswordSignUp = document.getElementById("cpasswordSignUp");
    var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const signIn = document.getElementById("signIn");

    // Validation
    if (nameSignUp.value === "") {
        toastr.error("Please Write Name.");
    } else if (emailSignUp.value === "") {
        toastr.error("Please Write email.");
    } else if (!emailRegex.test(emailSignUp.value)) {
        toastr.error("Invalid email.");
    } else if (passwordSignUp.value === "") {
        toastr.error("Please Write Password.");
    } else if (!passwordRegex.test(passwordSignUp.value)) {
        toastr.error("Password should be only digits or numbers and minimum 6 characters.");
    } else if (confirmPasswordSignUp.value === "") {
        toastr.error("Please write confirm Password.");
    } else if (passwordSignUp.value !== confirmPasswordSignUp.value) {
        toastr.error("Passwords do not match.");
    } else {
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, emailSignUp.value, passwordSignUp.value);
            const user = userCredential.user;

            // Check if the user was created successfully
            if (user) {
                toastr.success("You have been registered successfully.");

                // Store user data in Firestore
                await setDoc(doc(db, `usersData/${user.uid}`), {
                    name: nameSignUp.value,
                    password: passwordSignUp.value,
                });

                // Redirect or perform any other action
                signIn.click();
                document.getElementById("nameSignUp").value = "";
                document.getElementById("emailSignUp").value = "";
                document.getElementById("passwordSignUp").value = "";
                document.getElementById("cpasswordSignUp").value = "";
            }

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === "auth/email-already-in-use") {
                toastr.info("Email already registered.");
            } else {
                toastr.error("Registration failed. Please try again later.");
            }
        }
    }
};

// Event listener for button click
const registerYourSelfBtn = document.getElementById("registerYourSelfBtn");
registerYourSelfBtn.addEventListener("click", registerYourSelf);


//SignIn   
const signInYourSelf = async () => {
    event.preventDefault();
    var emailSignIn = document.getElementById("emailSignIn");
    var passwordSignIn = document.getElementById("passwordSignIn");
    if (emailSignIn.value === "") {
        toastr.error('Please Enter email.');
    } else if (passwordSignIn.value === "") {
        toastr.error('Please enter Password.');
    } else {
        await signInWithEmailAndPassword(auth, emailSignIn.value, passwordSignIn.value)
            .then((userCredential) => {
                const user = userCredential.user;
                toastr.success(`You have been login succcessfully.`);
                setTimeout(() => {
                    window.location = "../htmlPages/profile.html";
                }, 3000)
                document.getElementById("emailSignIn").value = "";
                document.getElementById("passwordSignIn").value = "";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toastr.error('Invalid Email or Passowrd.');
            });
    }
};
const signInYourSelfBtn = document.getElementById("signInYourSelfBtn");
signInYourSelfBtn.addEventListener("click", signInYourSelf);

const resetPassword = () => {
    const resetEmail = document.getElementById("resetEmail");
    sendPasswordResetEmail(auth, resetEmail.value)
        .then(() => {
            toastr.success('Your request for reset password has been granted successfully. Please check your inbox.');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toastr.error("Please try again.");
        });
}

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", resetPassword);

// Js Of Form Actions
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});


//Password Togggle Visiblilty
const showPassword1 = document.getElementById("showPassword1");
showPassword1.addEventListener("click", () => {
    const passwordSignUp = document.getElementById("passwordSignUp");
    if (passwordSignUp.type === "password") {
        passwordSignUp.type = "text";
        showPassword1.src = "../images/eye.svg";
    } else {
        passwordSignUp.type = "password";
        showPassword1.src = "../images/eye-off.svg";
    }
})

const showPassword2 = document.getElementById("showPassword2");
showPassword2.addEventListener("click", () => {
    const cpasswordSignUp = document.getElementById("cpasswordSignUp");
    if (cpasswordSignUp.type === "password") {
        cpasswordSignUp.type = "text";
        showPassword2.src = "../images/eye.svg";
    } else {
        cpasswordSignUp.type = "password";
        showPassword2.src = "../images/eye-off.svg";
    }
})

const showPassword3 = document.getElementById("showPassword3");
showPassword3.addEventListener("click", () => {
    const passwordSignIn = document.getElementById("passwordSignIn");
    if (passwordSignIn.type === "password") {
        passwordSignIn.type = "text";
        showPassword3.src = "../images/eye.svg";
    } else {
        passwordSignIn.type = "password";
        showPassword3.src = "../images/eye-off.svg";
    }
})