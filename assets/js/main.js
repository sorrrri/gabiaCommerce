/** @format */

document.addEventListener("DOMContentLoaded", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  if (matchMedia("screen and (max-width: 1280px)").matches) {
    window.addEventListener("resize", () => {
      location.reload();
    });
  }

  const container = document.querySelector(".container");
  const main = document.querySelector("main");
  const header = document.querySelector(".header");
  const aside = document.querySelector(".aside");
  const scrollToTop = document.createElement("div");
  scrollToTop.classList.add("scroll-to-top");
  container && container.appendChild(scrollToTop);

  let lastScrollTop = 0;

  container &&
    container.addEventListener("scroll", () => {
      let currentScrollTop = container.scrollTop;

      if (currentScrollTop > 50) {
        if (currentScrollTop > lastScrollTop) {
          scrollToTop.classList.remove("is-active");
          header.style.top = `-${header.offsetHeight}px`;
        } else {
          scrollToTop.classList.add("is-active");
          header.style.top = "0";
        }
        lastScrollTop = currentScrollTop;
      } else {
        scrollToTop.classList.remove("is-active");
      }
    });

  if (matchMedia("screen and (max-width: 640px)").matches) {
    container.addEventListener("scroll", () => {
      let currentScrollTop = container.scrollTop;

      if (currentScrollTop > 50) {
        currentScrollTop > lastScrollTop
          ? scrollToTop.classList.remove("is-active")
          : scrollToTop.classList.add("is-active");
        lastScrollTop = currentScrollTop;
      } else {
        scrollToTop.classList.remove("is-active");
      }
    });
  }

  scrollToTop.addEventListener("click", () => {
    container.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Hamburg Menu
  header.querySelector(".hamburg-menu").addEventListener("click", (event) => {
    const handler = aside.querySelector(".aside-handler");
    aside.classList.add("is-active");
    handler.addEventListener("click", () => {
      aside.classList.remove("is-active");
    });
  });

  /* =====================================================
       Tooltip
  ===================================================== */

  const tooltips = document.querySelectorAll(".tooltip");
  if (matchMedia("screen and (max-width: 640px)").matches) {
    tooltips.forEach((tooltip) => {
      tooltip.addEventListener("click", (event) => {
        tooltip.classList.toggle("is-active");
        const content = tooltip.querySelector(".tooltip-content");
        content.style.top = `${event.clientY}px`;
      });
    });
  }

  const easyTooltips = document.querySelectorAll("[data-tooltip]");
  if (easyTooltips[0]) {
    easyTooltips.forEach((tooltip) => {
      tooltip.addEventListener("mouseover", (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.target.parentElement.style.zIndex = "5";
      });
    });
  }

  /* =====================================================
       Target Smooth Scroll
  ===================================================== */
  // 상품 최저가 리포트: 일별 최저가 차트 클릭시
  const anchors = document.querySelectorAll("a[href^='#']");
  if (anchors[0]) {
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", () => {
        anchor.getAttribute("href").scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  }

  /* =====================================================
       Input Search Clear Button
  ===================================================== */
  // 인풋창에 "x"표시 있을시 clear value
  const inputs = document.querySelectorAll(".input input");
  inputs.forEach((input) => {
    input.addEventListener("keyup", (event) => {
      const { target } = event;
      const container = target.closest(".input");
      const clear = container.querySelector(".x");
      clear.classList.add("is-active");

      clear.addEventListener("click", () => {
        clear.classList.remove("is-active");
        input.value = "";
      });
    });
  });

  /* =====================================================
       Tab Menu
  ===================================================== */
  const tabs = document.querySelectorAll(".tabs [data-tab]");
  const tabContents = document.querySelectorAll(".tab-content");

  const showTabContent = (event) => {
    event.stopPropagation();
    const tabName = event.target.dataset.tab;
    const tabs = document.querySelectorAll(`[data-tab='${tabName}']`);
    const tabContents = document.querySelectorAll(`.tab-content[data-tab='${tabName}']`);
    let menuIndex = [...tabs].indexOf(event.target);

    tabs.forEach((tab) => {
      [...tabs].indexOf(tab) === menuIndex ? tab.classList.add("is-active") : tab.classList.remove("is-active");
    });

    tabContents.forEach((content) => {
      [...tabContents].indexOf(content) === 0 && content.classList.add("is-active");
      [...tabContents].indexOf(content) === menuIndex
        ? content.classList.add("is-active")
        : content.classList.remove("is-active");
    });
  };

  tabs.forEach((tab) => {
    [...tabs][0].classList.add("is-active");
    [...tabContents][0].classList.add("is-active");
    tab.addEventListener("click", showTabContent);
  });

  if (main.classList.contains("content-ads")) {
    const tabs = document.querySelectorAll(".section-diad .swiper-pagination li");

    if (tabs[0]) {
      tabs[0].textContent = "다이애드 PRO";
      tabs[1].textContent = "다이애드 WAVE";
      tabs[2].textContent = "다이애드 TREND";
      const background = document.querySelector(".section-diad .background");
      const slides = document.querySelectorAll(".section-diad  .swiper-slide");
      const sliderObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.target.classList.contains("pro") && mutation.target.classList.contains("swiper-slide-active")) {
            background.classList.remove("wave", "trend");
            background.classList.add("pro");
          }
          if (mutation.target.classList.contains("wave") && mutation.target.classList.contains("swiper-slide-active")) {
            background.classList.remove("pro", "trend");
            background.classList.add("wave");
          }
          if (
            mutation.target.classList.contains("trend") &&
            mutation.target.classList.contains("swiper-slide-active")
          ) {
            background.classList.remove("wave", "pro");
            background.classList.add("trend");
          }
        });
      });

      slides.forEach((slide) => {
        sliderObserver.observe(slide, { attributes: true });
      });
    }
  }

  /* =====================================================
         Toggle
    ===================================================== */
  const toggles = document.querySelectorAll("[data-toggle]");
  const showToggleContent = (event) => {
    event.stopPropagation();
    const toggleName = event.target.dataset.toggle || event.target.closest("[data-toggle]").dataset.toggle;
    const toggles = document.querySelectorAll(`[data-toggle='${toggleName}']`);

    toggles.forEach((toggle) => {
      toggle.classList.contains("is-active") ? toggle.classList.remove("is-active") : toggle.classList.add("is-active");
    });
  };

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", showToggleContent);
  });

  /* =====================================================
       Checkbox: Check All
  ===================================================== */

  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.innerHTML += `
    <svg width="15px" height="10px">
      <polyline points="1,5 6,9 14,1"></polyline>
    </svg>
    `;
  });
  const checkAll = document.querySelectorAll(".check-all");
  if (checkAll) {
    checkAll.forEach((all) => {
      const handleCheckAll = (event) => {
        const inputName = event.target.getAttribute("name");
        const checkboxes = document.getElementsByName(inputName);
        checkboxes.forEach((checkbox) => {
          checkbox.checked = all.checked;

          const controller = checkbox.classList.contains("check-all");
          if (!controller.checked) {
            controller.checked = all.checked;
          }
        });
      };
      all.addEventListener("click", handleCheckAll);
    });
  }

  /* =====================================================
   Accordion
  ===================================================== */
  const questions = document.querySelector(".accordion");
  if (questions) {
    const questions = document.querySelectorAll(".question");
    const showLists = (event) => {
      let questionIndex = [...questions].indexOf(event.target);
      questions.forEach((question) => {
        const list = question.closest("li");
        [...questions].indexOf(question) === questionIndex
          ? list.classList.toggle("is-active")
          : list.classList.remove("is-active");
      });
    };
    questions.forEach((question) => {
      question.addEventListener("click", showLists);
    });
  }

  // Pause Marquee Elements
  const marquees = document.querySelectorAll(".marquee-wrapper");
  marquees.forEach((marquee) => {
    marquee.addEventListener("mouseenter", (event) => {
      event.target.style.animationPlayState = "paused";
    });

    marquee.addEventListener("mouseout", (event) => {
      const wrapper = event.target.classList.contains(".marquee-wrapper") || event.target.closest(".marquee-wrapper");
      wrapper.style.animationPlayState = "running";
    });
  });

  // interactive
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add("is-active");

        if (entry.target.classList.contains("section_gradient")) {
          const images = entry.target.querySelectorAll("img");
          images.forEach((img) => {});
        }
      } else {
        entry.target.classList.remove("is-active");
      }
    });
    if (matchMedia("screen and (min-width: 1281px)").matches) {
      const horizontalSections = document.querySelectorAll(".horizontal");
      horizontalSections.forEach((section) => {
        // 가로스크롤 섹션이 바닥에 닿을때
        console.log(section.getBoundingClientRect().bottom);
        const errorRange = section.getBoundingClientRect().bottom - window.innerHeight;
        if (errorRange < 0 && Math.abs(errorRange) < 30) {
          container.scrollTo({
            top: section.offsetTop + section.offsetHeight - window.innerHeight,
            behavior: "smooth",
          });
          container.classList.add("noscroll");

          container.addEventListener("wheel", (event) => {
            if (container.classList.contains("noscroll")) {
              // 휠아래로
              if (event.deltaY > 0) {
                console.log("right right");
                section.scrollBy({
                  left: 30,
                });
                // 마우스휠을 아래로 내릴때 마지막 이미지에 닿으면 스크롤 풀림
                if (window.innerWidth + section.scrollLeft - section.scrollWidth === 0) {
                  container.classList.remove("noscroll");
                }
              } else {
                console.log("left left");
                section.scrollBy({
                  left: -30,
                });
                // 마우스휠을 위로 올릴때 첫이미지로 돌아오면 스크롤 복구
                if (section.scrollLeft === 0) {
                  container.classList.remove("noscroll");
                }
              }
            }
          });
        }
      });
    }
  });

  const sections = document.querySelectorAll("main.interactive section");
  sections.forEach((section) => {
    io.observe(section);
  });

  const button = document.querySelector(".section-sticky-button button");
  button &&
    container.addEventListener("scroll", () => {
      if (container.scrollTop > 50) {
        button.classList.add("is-active");
      } else {
        button.classList.remove("is-active");
      }
    });

  /* =====================================================
   Swiper Sliders
  ===================================================== */
  var swiper = new Swiper("header .swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: "header .swiper-pagination",
      type: "fraction",
      clickable: true,
    },
    navigation: {
      nextEl: "header .swiper-button-next",
      prevEl: "header .swiper-button-prev",
    },
  });

  const breakpoint = window.matchMedia("(max-width: 640px)");
  let smallSwiper;

  const breakpointChecker = () => {
    if (breakpoint.matches === true) {
      return enableSwiper();
    } else if (breakpoint.matches === false) {
      smallSwiper !== undefined && smallSwiper.destroy(true, true);
      return;
    }
  };

  const enableSwiper = () => {
    smallSwiper = new Swiper(".swiper.small", {
      spaceBetween: 20,
      slidesPerView: 1,
      loop: true,
      centeredSlides: true,
      grabCursor: true,
      pagination: {
        el: ".swiper.small .swiper-pagination",
      },
      paginationClickable: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    });
  };

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
});
