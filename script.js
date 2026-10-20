
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

/* ===== RALLY NEWS INTERACTIONS ===== */

const newsCards = document.querySelectorAll(".news-card");
const filterButtons = document.querySelectorAll(".filter-button");
const newsCount = document.getElementById("news-count");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    newsCards.forEach((card) => {
      const matches =
        selectedCategory === "all" ||
        card.dataset.category === selectedCategory;

      card.hidden = !matches;

      if (matches) visibleCount++;
    });

    newsCount.textContent =
      `${visibleCount} ${visibleCount === 1 ? "STORY" : "STORIES"}`;
  });
});

const stories = {
  featured: {
    category: "TEAM UPDATE",
    title: "The Journey Continues",
    body: "Welcome to ASLAM GARAGE MOTORS TEAM. This is where we will share our real team news, motorsport ambitions, preparation updates and future adventures. Check back as our story develops."
  },
  journey: {
    category: "RALLY NEWS",
    title: "Our Road Into Rally",
    body: "Every motorsport journey starts with passion and a goal. Follow our progress as we learn, prepare and work towards our rally ambitions. New stories can be added here as the journey develops."
  },
  team: {
    category: "TEAM UPDATE",
    title: "Meet the Team",
    body: "ASLAM GARAGE MOTORS TEAM is about teamwork, dedication and a shared interest in motorsport. We will use this space to introduce our members and share real behind-the-scenes updates."
  },
  car: {
    category: "CAR PREPARATION",
    title: "Building the Dream",
    body: "Our project is inspired by the Subaru Impreza Bug-Eye, with rally number 68. As the project progresses, this story can document real preparation work, maintenance, improvements and lessons learned."
  }
};

const storyDialog = document.getElementById("story-dialog");
const storyCategory = document.getElementById("story-category");
const storyTitle = document.getElementById("story-title");
const storyBody = document.getElementById("story-body");

document.querySelectorAll("[data-story]").forEach((button) => {
  button.addEventListener("click", () => {
    const story = stories[button.dataset.story];

    if (!story || !storyDialog) return;

    storyCategory.textContent = story.category;
    storyTitle.textContent = story.title;
    storyBody.textContent = story.body;

    storyDialog.showModal();
  });
});

function closeStoryDialog() {
  if (storyDialog.open) storyDialog.close();
}

document.getElementById("dialog-close")
  .addEventListener("click", closeStoryDialog);

document.getElementById("dialog-done")
  .addEventListener("click", closeStoryDialog);

storyDialog.addEventListener("click", (event) => {
  if (event.target === storyDialog) closeStoryDialog();
});
