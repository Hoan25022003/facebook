// * Scroll Theme
let scrollTheme = $(".modal-body-content-theme").scrollLeft();
let numberTheme = $(".modal-body-content-theme img").length;
let widthTheme = 75 + 16;

function conditionBtn() {
  if (scrollTheme === 0) {
    $(".theme-previous").css("display", "none");
  } else {
    $(".theme-previous").css("display", "block");
  }
  if (scrollTheme == widthTheme * (numberTheme - 5)) {
    $(".theme-next").css("display", "none");
  } else {
    $(".theme-next").css("display", "block");
  }
}

$(".theme-next").on("click", () => {
  scrollTheme += widthTheme;
  conditionBtn();
  $(".modal-body-content-theme img").css("right", scrollTheme + "px");
});

$(".theme-previous").on("click", () => {
  scrollTheme -= widthTheme;
  conditionBtn();
  $(".modal-body-content-theme img").css("right", scrollTheme + "px");
});

conditionBtn();

// * Select Theme
let titlePost = $(".modal-body-content textarea");
titlePost.on("keyup", () => {
  if (titlePost.val() != "") {
    $(".modal-footer-post").addClass("show-btn-post");
  } else {
    $(".modal-footer-post").removeClass("show-btn-post");
  }
});

function selectTheme(src) {
  $(".modal-body-content").css(
    "background",
    `url(${src}) no-repeat center / cover`
  );
  titlePost.css("text-align", "center");
}

$(".modal-body-content-theme div").on("click", () => {
  $(".modal-body-content").css("background", "white");
  titlePost.css("text-align", "left");
});

async function btnPost() {
  try {
    if (
      $(".modal-body-content").css("background") ==
      "rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box"
    ) {
      await $.ajax({
        type: "POST",
        url: "post/text",
        data: {
          title: titlePost.val(),
        },
      });
    } else {
      const linkTheme = `/${
        $(".modal-body-content").css("background").split("/")[3]
      }/${$(".modal-body-content").css("background").split("/")[4]}/${
        $(".modal-body-content").css("background").split("/")[5].split('"')[0]
      }`;
      await $.ajax({
        type: "POST",
        url: "post/text",
        data: {
          theme: linkTheme,
          title: titlePost.val(),
        },
      });
    }
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

//* Modal Post Image
$('#title').on("keyup", () => {
  if ($('#title').val() != "") {
    $(".modal-footer-post").addClass("show-btn-post");
  } else {
    $(".modal-footer-post").removeClass("show-btn-post");
  }
});

function importData() {
  document.getElementById("upload-picture").click();
}

var fileToRead = document.getElementById("upload-picture");

fileToRead.addEventListener(
  "change",
  function () {
    var files = fileToRead.files;
    if (files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        $(".modal-body-content-upload").attr("style", `background: url(${fr.result}) no-repeat center / cover;`);
        $(".modal-body-content-upload").addClass('hidden-text')
      };
      fr.readAsDataURL(files[0]);
    } 
  },
  false
);

async function btnPostImg() {
  
}