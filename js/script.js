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
(() => {
  const modal = document.getElementById('workModal');
  if (!modal) return;

  const scrim = modal.querySelector('.modal__scrim');
  const panel = modal.querySelector('.modal__panel');
  const closeBtn = modal.querySelector('.modal__close');
  const img1 = document.getElementById('modalImg1');
  const img2 = document.getElementById('modalImg2');

  function openModal(src1, src2) {
    img1.src = src1 || '';
    img2.src = src2 || '';
    img2.style.display = src2 ? 'block' : 'none';
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('is-open');
    img1.src = ''; img2.src = '';
    document.body.style.overflow = '';
  }

  // 위임: 페이지 어디에서든 .open-popup 클릭 시 작동
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a.open-popup');
    if (!a) return;
    e.preventDefault();
    openModal(a.dataset.img1, a.dataset.img2);
  });

  scrim.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();
// 영상팝업
(() => {
  const modal = document.getElementById('workModal');
  if (!modal) return;

  const scrim = modal.querySelector('.modal__scrim');
  const closeBtn = modal.querySelector('.modal__close');
  const content = modal.querySelector('.modal__content'); // 컨텐트 래퍼
  const img1 = document.getElementById('modalImg1');
  const img2 = document.getElementById('modalImg2');

  function clearDynamicMedia() {
    // 동적으로 추가한 video/iframe 제거 + 재생 멈춤
    const v = content.querySelector('video');
    if (v) { try { v.pause(); } catch(e){} v.remove(); }
    const f = content.querySelector('iframe');
    if (f) f.remove();
  }

 function openImages(src1, src2) {
  clearDynamicMedia();
  img1.style.display = src1 ? 'block' : 'none';
  img2.style.display = src2 ? 'block' : 'none';
  img1.src = src1 || '';
  img2.src = src2 || '';

  closeBtn.style.display = "block"; // 이미지일 때는 닫기 버튼 보이게
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function openVideo(src) {
  clearDynamicMedia();
  img1.style.display = 'none';
  img2.style.display = 'none';

  const v = document.createElement('video');
  v.src = src;
  v.controls = true;
  v.autoplay = true;
  v.playsInline = true;
  content.appendChild(v);

  closeBtn.style.display = "none"; // ✅ 비디오일 때는 닫기 버튼 숨김
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function openEmbed(url) {
  clearDynamicMedia();
  img1.style.display = 'none';
  img2.style.display = 'none';

  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
  iframe.allowFullscreen = true;
  content.appendChild(iframe);

  closeBtn.style.display = "block"; // 임베드(Youtube 등)에는 닫기 버튼 유지
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}


  // 위임 클릭: 모든 .open-popup 에서 동작
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a.open-popup');
    if (!a) return;

    e.preventDefault();

    // 1) 우선순위: data-embed(유튜브 등) > data-video(로컬 파일) > 이미지
    const embed = a.dataset.embed;
    const video = a.dataset.video || a.dataset.img1; // 혹시 img1에 mp4 넣어도 처리
    const img1Src = a.dataset.img1 && !/\.mp4|\.webm|\.ogg/i.test(a.dataset.img1) ? a.dataset.img1 : '';
    const img2Src = a.dataset.img2 || '';

    if (embed) {
      openEmbed(embed);
    } else if (video && /(\.mp4|\.webm|\.ogg)$/i.test(video)) {
      openVideo(video);
    } else if (img1Src || img2Src) {
      openImages(img1Src, img2Src);
    } else {
      // 데이터가 없으면 무시
      return;
    }
  });

  scrim.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();

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
