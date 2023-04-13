document.addEventListener("DOMContentLoaded", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const container = document.querySelector(".container");
  const main = document.querySelector("main");
  const header = document.querySelector(".header");
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
          header.style.top = `-${header.offsetHeight}px`
        } else {
          scrollToTop.classList.add("is-active");
          header.style.top = '0'
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

  /* =====================================================
       Tooltip
  ===================================================== */

  const tooltips = document.querySelectorAll(".tooltip");
  if (matchMedia("screen and (max-width: 640px)").matches) {
    tooltips.forEach(tooltip => {
      tooltip.addEventListener("click", event => {
        tooltip.classList.toggle("is-active");
        const content = tooltip.querySelector(".tooltip-content");
        content.style.top = `${event.clientY}px`;
      });
    });
  }

  const easyTooltips = document.querySelectorAll("[data-tooltip]");
  if (easyTooltips[0]) {
    easyTooltips.forEach(tooltip => {
      tooltip.addEventListener("mouseover", event => {
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
    anchors.forEach(anchor => {
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
  inputs.forEach(input => {
    input.addEventListener("keyup", event => {
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
  const tabs = document.querySelectorAll(".tabs li");
  const tabContents = document.querySelectorAll(".tab-content");

  const showTabContent = event => {
    event.stopPropagation();
    const tabName = event.target.dataset.tab;
    const tabs = document.querySelectorAll(`[data-tab='${tabName}']`);
    const tabContents = document.querySelectorAll(`.tab-content[data-tab='${tabName}']`);
    let menuIndex = [...tabs].indexOf(event.target);

    tabs.forEach(tab => {
      [...tabs].indexOf(tab) === menuIndex ? tab.classList.add("is-active") : tab.classList.remove("is-active");
    });

    tabContents.forEach(content => {
      [...tabContents].indexOf(content) === 0 && content.classList.add("is-active");
      [...tabContents].indexOf(content) === menuIndex
        ? content.classList.add("is-active")
        : content.classList.remove("is-active");
    });
  };

  tabs.forEach(tab => {
    [...tabs][0].classList.add("is-active");
    [...tabContents][0].classList.add("is-active");
    tab.addEventListener("click", showTabContent);
  });

  /* =====================================================
       Toggle
  ===================================================== */
  const toggles = document.querySelectorAll(".toggle");
  if (toggles) {
    toggles.forEach(toggle => {
      toggle.addEventListener("click", event => {
        const button = event.target;
        button.classList.toggle("is-active");
      });
    });
  }

  /* =====================================================
       Checkbox: Check All
  ===================================================== */

  document.querySelectorAll(".checkbox").forEach(checkbox => {
    checkbox.innerHTML += `
    <svg width="15px" height="10px">
      <polyline points="1,5 6,9 14,1"></polyline>
    </svg>
    `;
  });
  const checkAll = document.querySelectorAll(".check-all");
  if (checkAll) {
    checkAll.forEach(all => {
      const handleCheckAll = event => {
        const inputName = event.target.getAttribute("name");
        const checkboxes = document.getElementsByName(inputName);
        checkboxes.forEach(checkbox => {
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
    const questions = document.querySelectorAll(".question")
    const showLists = (event) => {
      console.log("YAY")
      let questionIndex = [...questions].indexOf(event.target);
      questions.forEach(question => {
        const list = question.closest("li");
        [...questions].indexOf(question) === questionIndex
          ? list.classList.toggle("is-active")
          : list.classList.remove("is-active");
      });
    }
    questions.forEach(question => {
      question.addEventListener("click", showLists);
    })
  };

  // Pause Marquee Elements
  const marquees = document.querySelectorAll(".marquee-wrapper");
  marquees.forEach(marquee => {
    marquee.addEventListener("mouseenter", (event) => {
      event.target.style.animationPlayState = "paused"
    })

    marquee.addEventListener("mouseout", (event) => {
      const wrapper = event.target.classList.contains(".marquee-wrapper") || event.target.closest(".marquee-wrapper")
      wrapper.style.animationPlayState = "running"
    })
  })

  // main
  if (main.classList.contains("content-main")) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          entry.target.classList.add("is-active")

          if (entry.target.classList.contains("section_gradient")) {
            const images = entry.target.querySelectorAll("img");
            images.forEach(img => {})
          }
        } else {
          entry.target.classList.remove("is-active")
        }
      })
    })

    const sections = document.querySelectorAll("main.interactive section");
    sections.forEach(section => {
      io.observe(section)
    })
  }
});
