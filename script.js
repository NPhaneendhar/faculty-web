const facultyData = [
  {
    name: "Dr. Preetha Bhadra",
    role: "CEO",
    category: "ceo",
    label: "CEO",
    specialization: "Animal Biotechnology, Cancer Biology, Stem Cell Biology, Neutraceuticals",
    scholar: "https://scholar.google.com/citations?user=1BhLMfAAAAAJ&hl=en",
    photo: "faculty1.png"
  },
  {
    name: "Dr. Pratyush Kumar Das",
    role: "Coordinator",
    category: "coord-lead",
    label: "Coordinator",
    specialization: "Environmental remediation, Nanotechnology, Cancer therapy, Polymer chemistry, Plant stress physiology",
    scholar: "https://scholar.google.com/citations?user=izRQJdAAAAAJ&hl=en",
    photo: "faculty2.png"
  },
  {
    name: "Dr. Bhadram Kalyan Chekreverthy",
    role: "Co-Coordinator, PKD campus",
    category: "coord-pkd",
    label: "Co-Coordinator, PKD campus",
    specialization: "Food and Pharmaceutical analysis",
    scholar: "https://scholar.google.com/citations?user=dfKZgNEAAAAJ&hl=en&oi=ao",
    photo: "faculty3.png"
  },
  {
    name: "Dr. Poulami Sil",
    role: "Joint Coordinator (VZM campus)",
    category: "coord-vzm",
    label: "Joint Coordinator (VZM campus)",
    specialization: "Biotic and Abiotic stress, Molecular Biology, Phytohormones, Neutraceuticals",
    scholar: "https://scholar.google.com/citations?user=3QKqJEoAAAAJ&hl=en&oi=ao",
    photo: "faculty4.png"
  },
  {
    name: "Dr. S.P. Nanda",
    role: "Faculty Member",
    category: "member",
    label: "Faculty Member",
    specialization: "Inorganic Chemistry, Heterocyclic compounds",
    scholar: "https://scholar.google.com/citations?user=3IP72nEAAAAJ&hl=en",
    photo: "faculty5.png"
  },
  {
    name: "Dr. Rajashree Jena",
    role: "Faculty Member",
    category: "member",
    label: "Faculty Member",
    specialization: "Biofidobacteria, Probiotics, Anaerobes, Dairy Technology",
    scholar: "https://scholar.google.com/citations?user=Sqdvf2QAAAAJ&hl=en&oi=ao",
    photo: "faculty6.png"
  },
  {
    name: "Dr. Ruby Pandey",
    role: "Faculty Member",
    category: "member",
    label: "Faculty Member",
    specialization: "Food Engineering, Microwave assisted extraction, Numerical modelling in food systems",
    scholar: "https://scholar.google.com/citations?user=LxMz7zYAAAAJ&hl=en&oi=ao",
    photo: "faculty7.png"
  },
  {
    name: "Mr. Ankur Ramola",
    role: "Faculty Member",
    category: "member",
    label: "Faculty Member",
    specialization: "Dairy Science, Quality assessment of fortified products",
    scholar: "https://scholar.google.com/citations?user=3QKqJEoAAAAJ&hl=en&oi=ao",
    photo: "faculty8.png"
  },
  {
    name: "Mr. Victor Pradhan",
    role: "Faculty Member",
    category: "member",
    label: "Faculty Member",
    specialization: "Bioinformatics, Systems Biology, Cancer Research, Nutraceuticals, Molecular Biology",
    scholar: "https://scholar.google.com/citations?user=F53A5H4AAAAJ&hl=en&oi=ao",
    photo: "faculty9.png"
  },
  {
    name: "Mr. Anshuman Panda",
    role: "Faculty Member",
    category: "member",
    label: "Faculty Member",
    specialization: "Regulatory Affairs",
    scholar: "https://scholar.google.com/citations?view_op=list_works&hl=en&user=qPC2QsUAAAAJ",
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
      <p class="faculty-role">${faculty.role}</p>
      <p class="faculty-research"><strong>Research Areas:</strong> ${faculty.specialization}</p>
      <a class="scholar-link" href="${faculty.scholar}" target="_blank" rel="noopener">Google Scholar</a>
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

document.querySelectorAll(".scholar-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

const revealItems = document.querySelectorAll(".section, .facility-grid div, .faculty-card");

revealItems.forEach((item) => item.classList.add("reveal"));

const revealHashTarget = () => {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (target && target.classList.contains("reveal")) {
    target.classList.add("is-visible");
  }
};

revealHashTarget();
window.addEventListener("hashchange", revealHashTarget);

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
  document.getElementById("modalSpecialization").innerText = faculty.specialization;
  document.getElementById("modalScholar").href = faculty.scholar;

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
