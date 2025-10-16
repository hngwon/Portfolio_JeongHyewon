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

    popup.style.display = 'flex';
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
