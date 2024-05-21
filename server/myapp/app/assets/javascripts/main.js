document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".pass_form");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("password_confirm");
    const showPasswordButtons = document.querySelectorAll(".show_password");
    const errorAlert = document.querySelector(".alert_danger");
    const successAlert = document.querySelector(".alert_success");
    const submitButton = document.querySelector(".btn");

    // Додамо обробник події для кнопок показу або приховування паролю
    showPasswordButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const passwordField = this.previousElementSibling;
            if (passwordField.type === "password") {
                passwordField.type = "text";
                this.textContent = "Hide";
            } else {
                passwordField.type = "password";
                this.textContent = "Show";
            }
        });
    });

    form.addEventListener("change", function (event) {
        event.preventDefault();

        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Перевірка довжини пароля
        if (password.length < 8) {
            errorAlert.textContent = "Password should be at least 8 characters long!";
            successAlert.textContent = "";
            return;
        }

        // Перевірка принаймні одна велика літера
        if (!/[A-Z]/.test(password)) {
            errorAlert.textContent =
                "Password should contain at least one uppercase letter!";
            successAlert.textContent = "";
            return;
        }

        // Перевірка принаймні дві цифри
        if (!/(?=(.*\d){2})/.test(password)) {
            errorAlert.textContent = "Password should contain at least two digits!";
            successAlert.textContent = "";
            return;
        }

        // Перевірка принаймні один спеціальний символ
        if (!/[!@#$%^&*()_+]/.test(password)) {
            errorAlert.textContent =
                "Password should contain at least one special character!";
            successAlert.textContent = "";
            return;
        }

        // Перевірка співпадіння паролів
        if (password !== confirmPassword) {
            errorAlert.textContent = "Passwords do not match!";
            successAlert.textContent = "";
            return;
        } else {
            errorAlert.textContent = "";
            successAlert.textContent = "Passwords match!";
            submitButton.classList.remove("disabled");
            submitButton.disabled = false;
        }
    });

});