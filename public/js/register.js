let fullname = $("#fullname");
let email = $("#email");
let password = $("#password");
let date = $("#date");
let gender = $("#gender");

let data = [fullname, email, password];

function checkEmpty(item) {
  if (item.val() === "") {
    item.css("border", "1px solid var(--error-color)");
    item[0].parentElement.querySelector(".form-message").innerText =
      "Thông tin này bắt buộc";
  } else {
    item.css("border", "1px solid #ddd");
    item[0].parentElement.querySelector(".form-message").innerText = "";
  }
}

function checkEmail(email) {
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (regex.test(email.val().trim())) {
    email[0].parentElement.querySelector(".form-message").innerText = "";
    email.css("border", "1px solid #ddd");
  } else {
    email[0].parentElement.querySelector(".form-message").innerText =
      "Email này không hợp lệ";
    email.css("border", "1px solid var(--error-color)");
  }
}

function checkPassword(password) {
  var lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;
  if (
    (password[0].value.match(lowerCaseLetters) ||
      password[0].value.match(upperCaseLetters)) &&
    password[0].value.match(numbers) &&
    password.val().length >= 6
  ) {
    password[0].parentElement.querySelector(".form-message").innerText = "";
    password.css("border", "1px solid #ddd");
  } else {
    password[0].parentElement.querySelector(".form-message").innerText =
      "Mật khẩu phải tối thiểu 6 kí tự bao gồm cả chữ và số";
    password.css("border", "1px solid var(--error-color)");
  }
}

data.forEach((item, i) => {
  item.on("blur", () => {
    checkEmpty(item);
    if (i === 1) {
      item.val() === "" ? checkEmpty(item) : checkEmail(item);
    } else if (i === 2) {
      item.val() === "" ? checkEmpty(item) : checkPassword(item);
    }
  });
});

async function formSubmit() {
  try {
    data.forEach((item) => checkEmpty(item));
    if ($(".form-message").text() == "") {
      await $.ajax({
        type: "POST",
        url: "/user/register",
        data: {
          fullname: fullname.val().trim(),
          email: email.val().trim(),
          password: password.val(),
          date: date.val(),
          gender: gender.val(),
        },
      });
      window.location.href = "/login";
    } else {
      console.log(false);
    }
  } catch (error) {
    email[0].parentElement.querySelector(".form-message").innerText =
      error.responseJSON.message;
    email.css("border", "1px solid var(--error-color)");
  }
}

document.onkeydown = (e) => {
  if (e.code === "Enter") {
    formRegister();
  }
};
