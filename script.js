const facultyData = [
  {
    name: "Dr. Preetha Bhadra",
    role: "CEO",
    category: "ceo",
    label: "Executive Leadership",
    qualification: "Profile details to be updated",
    specialization: "Center Leadership & Strategic Direction",
    email: "To be updated",
    experience: "To be updated",
    photo: "faculty1.png"
  },
  {
    name: "Dr. Pratyush Kumar Das",
    role: "Coordinator",
    category: "coord-lead",
    label: "Center Coordinator",
    qualification: "Profile details to be updated",
    specialization: "Program Coordination & Academic Operations",
    email: "To be updated",
    experience: "To be updated",
    photo: "faculty2.png"
  },
  {
    name: "Dr. Bhadram Kalyan Chekreverthy",
    role: "Co-Coordinator, PKD campus",
    category: "coord-pkd",
    label: "PKD Campus",
    qualification: "Profile details to be updated",
    specialization: "Campus Coordination - PKD",
    email: "To be updated",
    experience: "To be updated",
    photo: "faculty3.png"
  },
  {
    name: "Dr. Poulami Sil",
    role: "Co-Coordinator, VZM campus",
    category: "coord-vzm",
    label: "VZM Campus",
    qualification: "Profile details to be updated",
    specialization: "Campus Coordination - VZM",
    email: "To be updated",
    experience: "To be updated",
    photo: "faculty4.png"
  },
  {
    name: "Dr. S.P. Nanda",
    role: "Faculty Member",
    category: "member",
    label: "Team Member",
    qualification: "Profile details to be updated",
    specialization: "Phyto Pharma Academic Team",
    email: "To be updated",
    experience: "To be updated",
    photo: "faculty5.png"
  },
  {
    name: "Dr. Rajashree Jena",
    role: "Faculty Member",
    category: "member",
    label: "Team Member",
    qualification: "Profile details to be updated",
    specialization: "Phyto Pharma Academic Team",
    email: "To be updated",
    experience: "To be updated",
    photo: "faculty6.png"
  },
  {
    name: "Dr. Ruby Pandey",
    role: "Faculty Member",
    category: "member",
    label: "Team Member",
    qualification: "Profile details to be updated",
    specialization: "Phyto Pharma Academic Team",
    email: "To be updated",
    experience: "To be updated",
    photo: "faculty7.png"
  },
  {
    name: "Mr. Ankur Ramola",
    role: "Faculty Member",
    category: "member",
    label: "Team Member",
    qualification: "Profile details to be updated",
    specialization: "Phyto Pharma Academic Team",
    email: "To be updated",
    experience: "To be updated",
    photo: "faculty8.png"
  },
  {
    name: "Mr. Victor Pradhan",
    role: "Faculty Member",
    category: "member",
    label: "Team Member",
    qualification: "Profile details to be updated",
    specialization: "Phyto Pharma Academic Team",
    email: "To be updated",
    experience: "To be updated",
    photo: "faculty9.png"
  },
  {
    name: "Mr. Anshuman Panda",
    role: "Faculty Member",
    category: "member",
    label: "Team Member",
    qualification: "Profile details to be updated",
    specialization: "Phyto Pharma Academic Team",
    email: "To be updated",
    experience: "To be updated",
    photo: "faculty10.png"
  }
];

const facultyGrid = document.getElementById("facultyGrid");
const facultyCount = document.getElementById("facultyCount");
const header = document.querySelector(".header");
const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.getElementById("primaryNav");

if (header && navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

if (facultyCount) {
  facultyCount.innerText = facultyData.length.toString().padStart(2, "0");
}

if (facultyGrid && facultyGrid.children.length === 0) {
  facultyData.forEach((faculty, index) => {
    const card = document.createElement("div");
    card.className = `faculty-card faculty-${faculty.category} reveal`;
    card.dataset.facultyIndex = index;
    const initials = faculty.name
      .replace(/^(Dr\.|Mr\.|Ms\.)\s+/i, "")
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2);

    const avatarMarkup = faculty.photo
      ? `<img class="avatar faculty-photo" src="${faculty.photo}" alt="${faculty.name}" onerror="this.outerHTML='<div class=&quot;avatar&quot;>${initials}</div>'">`
      : `<div class="avatar">${initials}</div>`;

    card.innerHTML = `
      <span class="faculty-badge">${faculty.label}</span>
      ${avatarMarkup}
      <h3>${faculty.name}</h3>
      <p>${faculty.role}</p>
      <p>${faculty.specialization}</p>
    `;

    facultyGrid.appendChild(card);
  });
}

document.querySelectorAll(".faculty-card").forEach((card) => {
  const index = Number(card.dataset.facultyIndex);
  if (!Number.isNaN(index)) {
    card.addEventListener("click", () => openModal(index));
  }
});

const revealItems = document.querySelectorAll(".section, .facility-grid div, .faculty-card");

revealItems.forEach((item) => item.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16
    }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

function openModal(index) {
  const faculty = facultyData[index];

  document.getElementById("modalName").innerText = faculty.name;
  document.getElementById("modalRole").innerText = faculty.role;
  document.getElementById("modalQualification").innerText = faculty.qualification;
  document.getElementById("modalSpecialization").innerText = faculty.specialization;
  document.getElementById("modalEmail").innerText = faculty.email;
  document.getElementById("modalExperience").innerText = faculty.experience;

  document.getElementById("facultyModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("facultyModal").style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("facultyModal");
  if (event.target === modal) {
    closeModal();
  }
};
