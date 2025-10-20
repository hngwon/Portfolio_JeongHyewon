// =-------------
// 헤더 스크롤 따라오기
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("#header_wrap");
  const video = document.querySelector("#video"); // 비디오 섹션

  window.addEventListener("scroll", () => {
    // video 섹션의 bottom 위치
    const videoBottom = video.offsetTop + video.offsetHeight;

    if (window.scrollY >= videoBottom) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
});

// 첫 번째 Swiper 설정 (기존 코드)
const artworkSwiper1 = new Swiper("#Detailed_Page .detailedSwiper1", {
  slidesPerView: "auto",
  spaceBetween: 30,
  loop: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  initialSlide: 3,
});

const artworkSlides1 = document.querySelectorAll(".detailedSwiper1 .swiper-slide");
const artworkTexts1 = document.querySelectorAll("#Swiper_wrap .swiper_list"); // 첫 번째 텍스트 그룹만 선택
const totalArtwork1 = artworkSlides1.length;

// 이미지 hover → 역순 매핑된 텍스트 강조
artworkSlides1.forEach((slide, index) => {
  slide.addEventListener("mouseenter", () => {
    artworkTexts1.forEach(item => item.classList.remove("active"));
    const mappedIndex = totalArtwork1 - 1 - index;
    artworkTexts1[mappedIndex]?.classList.add("active");
  });
});

// 텍스트 hover → 역순 매핑된 이미지로 이동
artworkTexts1.forEach((item, index) => {
  item.addEventListener("mouseenter", () => {
    artworkTexts1.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const mappedIndex = totalArtwork1 - 1 - index;
    artworkSwiper1.slideTo(mappedIndex, 600);
  });
});

// 첫 번째 텍스트 클릭 시 첫 번째 Swiper만 이동
artworkTexts1.forEach((item, index) => {
  item.addEventListener("click", () => {
    artworkTexts1.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const mappedIndex = totalArtwork1 - 1 - index;
    artworkSwiper1.slideTo(mappedIndex, 600);  // 첫 번째 Swiper만 이동
  });
});

// 두 번째 Swiper 설정 (기존 코드)
const artworkSwiper2 = new Swiper(".detailedSwiper2", {
  slidesPerView: "auto",
  spaceBetween: 30,
  loop: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  initialSlide: 0,
});

const artworkSlides2 = document.querySelectorAll(".detailedSwiper2 .swiper-slide");
const artworkTexts2 = document.querySelectorAll("#Swiper_wrap2 .swiper_list"); // 두 번째 텍스트 그룹만 선택
const totalArtwork2 = artworkSlides2.length;

// 이미지 hover → 같은 순서 텍스트 강조
artworkSlides2.forEach((slide, index) => {
  slide.addEventListener("mouseenter", () => {
    artworkTexts2.forEach(item => item.classList.remove("active"));
    artworkTexts2[index]?.classList.add("active");    // ← 역순 제거
  });
});

// 텍스트 hover → 같은 순서 이미지로 이동
artworkTexts2.forEach((item, index) => {
  item.addEventListener("mouseenter", () => {
    artworkTexts2.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    artworkSwiper2.slideTo(index, 600);               // ← 역순 제거
  });
});

// 텍스트 click → 같은 순서 이미지로 이동
artworkTexts2.forEach((item, index) => {
  item.addEventListener("click", () => {
    artworkTexts2.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    artworkSwiper2.slideTo(index, 600);               // ← 역순 제거
  });
});

// -----------------
// 팝업창
const popup = document.getElementById('popup');
const popupImages = document.querySelector('.popup-images');
const closeBtn = document.querySelector('.close-btn');

// open-popup 클릭 이벤트
document.querySelectorAll('.open-popup').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    popupImages.innerHTML = ''; // 이전 이미지 제거

    // data-img1 ~ data-img5까지 탐색
    for (let i = 1; i <= 6; i++) {
      const imgSrc = item.getAttribute(`data-img${i}`);
      if (imgSrc) {
        const img = document.createElement('img');
        img.src = imgSrc;
        popupImages.appendChild(img);
      }
    }
  });
});

// 닫기 버튼
closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});

// 배경 클릭시 닫기
popup.addEventListener('click', e => {
  if (e.target === popup) {
    popup.style.display = 'none';
  }
});

// 비디오 팝업
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const popupContent = popup.querySelector(".popup-content");
  const popupImages = popup.querySelector(".popup-images");
  const closeBtn = popup.querySelector(".close-btn");

  // 팝업 열기
  document.addEventListener("click", (e) => {
    const a = e.target.closest(".open-popup");
    if (!a) return;
    e.preventDefault();

    const videoSrc = a.dataset.video;
    const img1 = a.dataset.img1;
    const img2 = a.dataset.img2;
    const img3 = a.dataset.img3;
    const img4 = a.dataset.img4;

    popupImages.innerHTML = ""; // 기존 이미지/비디오 제거

    // ✅ 비디오인 경우
    if (videoSrc) {
      const video = document.createElement("video");
      video.src = videoSrc;
      video.controls = true;
      video.autoplay = true;
      video.muted = true;
      video.style.width = "100%";
      video.style.borderRadius = "8px";
      popupImages.appendChild(video);
    } 
    // ✅ 이미지인 경우
    else {
      [img1, img2, img3, img4].forEach(src => {
        if (src) {
          const img = document.createElement("img");
          img.src = src;
          img.alt = "";
          popupImages.appendChild(img);
        }
      });
    }

    popup.classList.add("is-open");
  });

  // 팝업 닫기
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("is-open");
    popupImages.innerHTML = "";
  });
});
// ✅ 팝업 열릴 때 닫기 버튼 위치 계산
document.addEventListener("click", (e) => {
  const a = e.target.closest(".open-popup");
  if (!a) return;

  setTimeout(() => {
    const popup = document.getElementById("popup");
    const popupContent = popup.querySelector(".popup-content");
    const closeBtn = popup.querySelector(".close-btn");

    if (popupContent && closeBtn) {
      const rect = popupContent.getBoundingClientRect();

      closeBtn.style.position = "fixed";
      closeBtn.style.top = `${rect.top - 50}px`;    // 박스보다 살짝 위
      closeBtn.style.left = `${rect.right - 25}px`; // 박스 오른쪽 끝 살짝 바깥
    }
  }, 50);
});
// =============================
// artwork
// =============================
$(document).ready(function () {
  console.log("✅ script.js loaded");

  // ==============================
  // 1️⃣ 헤더 스크롤 고정
  // ==============================
  const header = $("#header_wrap");
  const video = $("#video");

  $(window).on("scroll", function () {
    const videoBottom = video.offset().top + video.outerHeight();
    if ($(window).scrollTop() >= videoBottom) {
      header.addClass("fixed");
    } else {
      header.removeClass("fixed");
    }
  });

  // ==============================
  // 2️⃣ 카드뉴스 / 비디오 팝업 (#popup)
  // ==============================
  const popup = $("#popup");
  const popupImages = $(".popup-images");
  const closeBtn = $(".close-btn");

  $(".open-popup").on("click", function (e) {
    e.preventDefault();

    // Artwork용은 제외
    if ($(this).data("type") === "artwork") return;

    popupImages.html("");
    for (let i = 1; i <= 6; i++) {
      const imgSrc = $(this).attr(`data-img${i}`);
      if (imgSrc) {
        const img = $("<img>").attr("src", imgSrc);
        popupImages.append(img);
      }
    }

    popup.addClass("is-open").css("display", "flex");
  });

  closeBtn.on("click", () => popup.removeClass("is-open").hide());
  popup.on("click", function (e) {
    if (e.target === this) popup.removeClass("is-open").hide();
  });

  // ==============================
  // 3️⃣ Artwork 필터 버튼
  // ==============================
  $(".filter-buttons button").click(function () {
    const filter = $(this).data("filter");

    $(".filter-buttons button").removeClass("active");
    $(this).addClass("active");

    $(".art-item").each(function () {
      if (filter === "*" || $(this).is(filter)) {
        $(this).removeClass("hide").addClass("show");
      } else {
        $(this).removeClass("show").addClass("hide");
      }
    });
  });

  // ==============================
  // 4️⃣ Artwork 팝업 (별도 스타일)
  // ==============================
  $(".art-item").click(function () {
    const popupId = $(this).data("popup");
    const popupTemplate = $("#" + popupId);

    if (!popupTemplate.length) return; // 템플릿 없으면 종료

    const popupContent = popupTemplate.html();

    const popup = $(`
      <div class="art-popup">
        ${popupContent}
      </div>
    `);

    $("body").append(popup);

    // 닫기 기능
    $(".art-close, .art-popup").on("click", function (e) {
      if ($(e.target).hasClass("art-popup") || $(e.target).hasClass("art-close")) {
        $(".art-popup").remove();
      }
    });
  });

  // ==============================
  // 5️⃣ 타임라인 Hover (기존 유지)
  // ==============================
  const contents = $(".timeline-box_left .content, .timeline-box_right .content");
  contents.on("mouseenter", function () {
    contents.removeClass("on");
    $(this).addClass("on");
  });

  // ==============================
  // ✅ 디버깅 확인용 로그
  // ==============================
  console.log("✅ All event bindings complete.");
});


        // ---------------------------
// 날짜/타임라인: hover 시 한 개만 on 유지 (정상 동작 버전)
document.addEventListener("DOMContentLoaded", () => {
  const contents = document.querySelectorAll(
    ".timeline-box_left .content, .timeline-box_right .content"
  );

  contents.forEach((content) => {
    content.addEventListener("mouseenter", () => {
      contents.forEach((c) => c.classList.remove("on"));
      content.classList.add("on");
    });
  });
});
