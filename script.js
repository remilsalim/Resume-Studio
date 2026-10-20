
const form = document.getElementById("resumeForm");
const preview = document.getElementById("resumePreview");

// ==========================================
// 1. Resume entry configuration
// ==========================================

const sectionConfig = {
  education: {
    container: "educationEntries",
    label: "Education",
    fields: [
      {
        name: "qualification",
        label: "Degree / qualification",
        placeholder: "B.Sc. Computer Science"
      },
      {
        name: "institution",
        label: "Institution",
        placeholder: "College / University"
      },
      {
        name: "year",
        label: "Year / duration",
        placeholder: "2022 – 2025"
      },
      {
        name: "grade",
        label: "CGPA / percentage (optional)",
        placeholder: "8.2 CGPA"
      }
    ]
  },

  certification: {
    container: "certificationEntries",
    label: "Certification / training",
    fields: [
      {
        name: "name",
        label: "Course / certificate name",
        placeholder: "Python Programming"
      },
      {
        name: "provider",
        label: "Provider / organization",
        placeholder: "Coursera / Infosys Springboard"
      },
      {
        name: "date",
        label: "Completion date",
        placeholder: "Jun 2026"
      },
      {
        name: "url",
        label: "Credential URL (optional)",
        placeholder: "https://..."
      }
    ]
  },

  internship: {
    container: "internshipEntries",
    label: "Internship / experience",
    fields: [
      {
        name: "role",
        label: "Role / title",
        placeholder: "Software Developer Intern"
      },
      {
        name: "company",
        label: "Organization",
        placeholder: "Company name"
      },
      {
        name: "duration",
        label: "Duration",
        placeholder: "Jan 2026 – Mar 2026"
      },
      {
        name: "details",
        label: "Responsibilities / achievements",
        placeholder: "Describe contributions; use one point per line.",
        type: "textarea",
        full: true
      }
    ]
  },

  project: {
    container: "projectEntries",
    label: "Project",
    fields: [
      {
        name: "name",
        label: "Project name",
        placeholder: "Smart Attendance System"
      },
      {
        name: "technologies",
        label: "Technologies",
        placeholder: "Python, OpenCV, Flask"
      },
      {
        name: "url",
        label: "Project URL (optional)",
        placeholder: "https://..."
      },
      {
        name: "details",
        label: "Description / outcome",
        placeholder: "What you built and what it does.",
        type: "textarea",
        full: true
      }
    ]
  }
};

// ==========================================
// 2. Design settings
// ==========================================

const defaultDesign = {
  fontFamily: "Arial, sans-serif",

  nameSize: 27,
  roleSize: 12,
  headingSize: 11,
  contactSize: 9,
  summarySize: 10,
  entryTitleSize: 11,
  subtitleSize: 10,
  dateSize: 9,
  descriptionSize: 10,
  skillsSize: 10,

  nameColor: "#202939",
  headingColor: "#2356a8",
  bodyColor: "#202939",
  accentColor: "#2356a8",

  headerAlign: "left",
  sectionAlign: "left",
  contentAlign: "left",

  pagePadding: 15,
  sectionSpacing: 15,
  entrySpacing: 9,
  lineSpacing: 1.5
};

const designControlIds = Object.keys(defaultDesign);

const numericLimits = {
  nameSize: [18, 48],
  roleSize: [10, 24],
  headingSize: [9, 20],
  contactSize: [8, 14],
  summarySize: [9, 18],
  entryTitleSize: [9, 18],
  subtitleSize: [8, 16],
  dateSize: [8, 14],
  descriptionSize: [9, 16],
  skillsSize: [9, 16],
  pagePadding: [5, 30],
  sectionSpacing: [4, 30],
  entrySpacing: [2, 20],
  lineSpacing: [1, 2.5]
};

// ==========================================
// 3. Section ordering
// ==========================================

// Change this array to set the default section order.
const defaultSectionOrder = [
  "summary",
  "education",
  "skills",
  "certifications",
  "internships",
  "projects"
];

let sectionOrder = [...defaultSectionOrder];

const sectionLabels = {
  summary: "Professional Summary",
  education: "Education",
  skills: "Skills",
  certifications: "Certifications & Training",
  internships: "Internship / Experience",
  projects: "Projects"
};

// ==========================================
// 4. Utility functions
// ==========================================

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));
}

function safeUrl(value) {
  const trimmed = (value || "").trim();

  if (!trimmed) return "";

  try {
    const parsed = new URL(trimmed);

    return ["http:", "https:"].includes(parsed.protocol)
      ? parsed.href
      : "";
  } catch {
    return "";
  }
}

function getFormValue(name) {
  return (form.elements[name]?.value || "").trim();
}

// ==========================================
// 5. Read design controls
// ==========================================

function getDesignSettings() {
  const settings = {};

  for (const key of designControlIds) {
    const control = document.getElementById(key);

    if (!control) continue;

    const rawValue = control.value;

    if (
      ["fontFamily", "headerAlign", "sectionAlign", "contentAlign"]
        .includes(key)
    ) {
      settings[key] = rawValue;
    } else if (key.endsWith("Color")) {
      settings[key] = /^#[0-9a-f]{6}$/i.test(rawValue)
        ? rawValue
        : defaultDesign[key];
    } else {
      const number = Number(rawValue);
      const [min, max] = numericLimits[key] || [0, 100];

      settings[key] = Number.isFinite(number)
        ? Math.min(max, Math.max(min, number))
        : defaultDesign[key];
    }
  }

  return { ...defaultDesign, ...settings };
}

// ==========================================
// 6. Apply design to the preview
// ==========================================

function applyDesign() {
  const design = getDesignSettings();

  preview.style.fontFamily = design.fontFamily;
  preview.style.color = design.bodyColor;
  preview.style.textAlign = design.contentAlign;
  preview.style.padding = `${design.pagePadding}mm`;

  const cssVariables = {
    "--resume-font-family": design.fontFamily,

    "--resume-name-size": `${design.nameSize}px`,
    "--resume-role-size": `${design.roleSize}px`,
    "--resume-heading-size": `${design.headingSize}px`,
    "--resume-contact-size": `${design.contactSize}px`,
    "--resume-summary-size": `${design.summarySize}px`,
    "--resume-entry-title-size": `${design.entryTitleSize}px`,
    "--resume-subtitle-size": `${design.subtitleSize}px`,
    "--resume-date-size": `${design.dateSize}px`,
    "--resume-description-size": `${design.descriptionSize}px`,
    "--resume-skills-size": `${design.skillsSize}px`,

    "--resume-name-color": design.nameColor,
    "--resume-heading-color": design.headingColor,
    "--resume-body-color": design.bodyColor,
    "--resume-accent-color": design.accentColor,

    "--resume-section-spacing": `${design.sectionSpacing}px`,
    "--resume-entry-spacing": `${design.entrySpacing}px`,
    "--resume-line-spacing": design.lineSpacing,

    "--print-page-padding": `${design.pagePadding}mm`
  };

  Object.entries(cssVariables).forEach(([property, value]) => {
    preview.style.setProperty(property, value);
  });

  const header = preview.querySelector(".resume-header");

  if (header) {
    header.style.fontFamily = design.fontFamily;
    header.style.textAlign = design.headerAlign;
    header.style.borderBottomColor = design.accentColor;

    const contact = header.querySelector(".contact-line");

    if (contact) {
      contact.style.justifyContent = {
        left: "flex-start",
        center: "center",
        right: "flex-end"
      }[design.headerAlign] || "flex-start";
    }
  }

  preview.querySelectorAll(".resume-name").forEach(element => {
    element.style.fontFamily = design.fontFamily;
    element.style.fontSize = `${design.nameSize}px`;
    element.style.color = design.nameColor;
    element.style.textAlign = design.headerAlign;
  });

  preview.querySelectorAll(".resume-role").forEach(element => {
    element.style.fontFamily = design.fontFamily;
    element.style.fontSize = `${design.roleSize}px`;
    element.style.color = design.accentColor;
    element.style.textAlign = design.headerAlign;
  });

  preview.querySelectorAll(".contact-line").forEach(element => {
    element.style.fontFamily = design.fontFamily;
    element.style.fontSize = `${design.contactSize}px`;
  });

  preview.querySelectorAll(".resume-section").forEach(section => {
    section.style.marginBottom = `${design.sectionSpacing}px`;

    const heading = section.querySelector("h2");

    if (heading) {
      heading.style.fontFamily = design.fontFamily;
      heading.style.fontSize = `${design.headingSize}px`;
      heading.style.color = design.headingColor;
      heading.style.textAlign = design.sectionAlign;
      heading.style.borderBottomColor = design.accentColor;
    }
  });

  const typography = [
    [".summary-text", design.summarySize],
    [".entry-title", design.entryTitleSize],
    [".entry-subtitle", design.subtitleSize],
    [".entry-date", design.dateSize],
    [".entry-description", design.descriptionSize],
    [".skills-line", design.skillsSize]
  ];

  typography.forEach(([selector, size]) => {
    preview.querySelectorAll(selector).forEach(element => {
      element.style.fontFamily = design.fontFamily;
      element.style.fontSize = `${size}px`;
      element.style.color = design.bodyColor;
      element.style.textAlign = design.contentAlign;
      element.style.lineHeight = design.lineSpacing;
    });
  });

  preview.querySelectorAll(".resume-entry").forEach(element => {
    element.style.marginBottom = `${design.entrySpacing}px`;
  });

  preview.querySelectorAll(
    ".resume-entry a, .contact-line a"
  ).forEach(link => {
    link.style.color = design.accentColor;
  });
}

// ==========================================
// 7. Section order controls
// ==========================================

function renderSectionOrderControls() {
  const container = document.getElementById("sectionOrderControls");

  if (!container) return;

  container.innerHTML = sectionOrder.map((key, index) => `
    <div class="section-order-item">
      <span class="section-order-number">${index + 1}</span>

      <span class="section-order-label">
        ${sectionLabels[key]}
      </span>

      <div class="section-order-actions">
        <button
          type="button"
          class="section-order-button"
          data-action="up"
          data-section="${key}"
          aria-label="Move ${sectionLabels[key]} up"
          ${index === 0 ? "disabled" : ""}
        >↑</button>

        <button
          type="button"
          class="section-order-button"
          data-action="down"
          data-section="${key}"
          aria-label="Move ${sectionLabels[key]} down"
          ${index === sectionOrder.length - 1 ? "disabled" : ""}
        >↓</button>
      </div>
    </div>
  `).join("");
}

const sectionOrderControls = document.getElementById(
  "sectionOrderControls"
);

if (sectionOrderControls) {
  sectionOrderControls.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");

    if (!button || button.disabled) return;

    const key = button.dataset.section;
    const index = sectionOrder.indexOf(key);

    if (index === -1) return;

    const direction = button.dataset.action === "up" ? -1 : 1;
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= sectionOrder.length) return;

    // Swap the selected section with the adjacent section.
    [
      sectionOrder[index],
      sectionOrder[newIndex]
    ] = [
        sectionOrder[newIndex],
        sectionOrder[index]
      ];

    renderSectionOrderControls();
    renderPreview();
  });
}

const resetSectionOrderButton = document.getElementById(
  "resetSectionOrder"
);

if (resetSectionOrderButton) {
  resetSectionOrderButton.addEventListener("click", () => {
    sectionOrder = [...defaultSectionOrder];

    renderSectionOrderControls();
    renderPreview();
  });
}

// ==========================================
// 8. Dynamic entry cards
// ==========================================

function makeEntry(type) {
  const config = sectionConfig[type];

  if (!config) return null;

  const container = document.getElementById(config.container);

  if (!container) return null;

  const card = document.createElement("div");
  card.className = "entry-card";
  card.dataset.entryType = type;

  const fields = config.fields.map(field => {
    const control = field.type === "textarea"
      ? `<textarea name="${field.name}" rows="3"
          placeholder="${field.placeholder}"></textarea>`
      : `<input name="${field.name}"
          placeholder="${field.placeholder}"
          ${field.name === "url" ? 'type="url"' : ""}>`;

    return `
      <label ${field.full ? 'style="grid-column:1/-1"' : ""}>
        ${field.label}
        ${control}
      </label>
    `;
  }).join("");

  card.innerHTML = `
    <div class="entry-card-head">
      <span>${config.label}</span>
      <button class="remove-entry" type="button">Remove</button>
    </div>
    <div class="field-grid">${fields}</div>
  `;

  card.querySelector(".remove-entry").addEventListener("click", () => {
    card.remove();
    renderPreview();
  });

  card.addEventListener("input", renderPreview);

  container.appendChild(card);

  return card;
}

// Add-entry buttons
document.querySelectorAll("[data-add]").forEach(button => {
  button.addEventListener("click", () => {
    makeEntry(button.dataset.add);
    renderPreview();
  });
});

// Collect dynamic entry values
function valuesIn(containerId) {
  return [
    ...document.querySelectorAll(`#${containerId} .entry-card`)
  ]
    .map(card => {
      const data = {};

      card.querySelectorAll("input, textarea").forEach(input => {
        data[input.name] = input.value.trim();
      });

      return data;
    })
    .filter(entry => Object.values(entry).some(Boolean));
}

// ==========================================
// 9. Resume HTML helpers
// ==========================================

function section(title, content) {
  if (!content) return "";

  return `
    <section class="resume-section">
      <h2>${title}</h2>
      ${content}
    </section>
  `;
}

function entry(title, subtitle, date, details, link) {
  if (![title, subtitle, date, details, link].some(Boolean)) {
    return "";
  }

  const safeLink = safeUrl(link);

  const titleHtml = title
    ? (
      safeLink
        ? `<a href="${escapeHtml(safeLink)}">${escapeHtml(title)}</a>`
        : escapeHtml(title)
    )
    : "";

  return `
    <div class="resume-entry">
      <div class="entry-title-line">
        <p class="entry-title">${titleHtml}</p>

        ${date
      ? `<span class="entry-date">${escapeHtml(date)}</span>`
      : ""}
      </div>

      ${subtitle
      ? `<p class="entry-subtitle">${escapeHtml(subtitle)}</p>`
      : ""}

      ${details
      ? `<p class="entry-description">${escapeHtml(details)}</p>`
      : ""}
    </div>
  `;
}

// ==========================================
// 10. Render the resume
// ==========================================

function renderPreview() {
  const name = getFormValue("fullName") || "YOUR NAME";
  const role = getFormValue("targetRole");

  const contact = [
    getFormValue("email"),
    getFormValue("phone"),
    getFormValue("location"),
    getFormValue("linkedin"),
    getFormValue("portfolio")
  ].filter(Boolean);

  const contactHtml = contact.map(item => {
    const url = safeUrl(item);

    return url
      ? `<a href="${escapeHtml(url)}">${escapeHtml(
        item.replace(/^https?:\/\//, "")
      )}</a>`
      : `<span>${escapeHtml(item)}</span>`;
  }).join("<span> • </span>");

  const summary = getFormValue("summary");

  const education = valuesIn("educationEntries").map(item =>
    entry(
      item.qualification,
      [
        item.institution,
        item.grade ? `· ${item.grade}` : ""
      ].filter(Boolean).join(" "),
      item.year,
      "",
      ""
    )
  ).join("");

  const technical = getFormValue("technicalSkills");
  const other = getFormValue("otherSkills");

  const skills = [
    technical
      ? `<p class="skills-line"><strong>Technical:</strong> ${escapeHtml(technical)}</p>`
      : "",

    other
      ? `<p class="skills-line"><strong>Tools &amp; other:</strong> ${escapeHtml(other)}</p>`
      : ""
  ].join("");

  const certifications = valuesIn("certificationEntries").map(item =>
    entry(item.name, item.provider, item.date, "", item.url)
  ).join("");

  const internships = valuesIn("internshipEntries").map(item =>
    entry(item.role, item.company, item.duration, item.details, "")
  ).join("");

  const projects = valuesIn("projectEntries").map(item =>
    entry(
      item.name,
      item.technologies,
      "",
      item.details,
      item.url
    )
  ).join("");

  // Each section is built once, then inserted in the selected order.
  const sectionContent = {
    summary: section(
      "Professional Summary",
      summary
        ? `<p class="summary-text">${escapeHtml(summary)}</p>`
        : ""
    ),

    education: section("Education", education),

    skills: section("Skills", skills),

    certifications: section(
      "Certifications & Training",
      certifications
    ),

    internships: section(
      "Internship / Experience",
      internships
    ),

    projects: section("Projects", projects)
  };

  const orderedSections = sectionOrder
    .map(key => sectionContent[key] || "")
    .join("");

  preview.innerHTML = `
    <header class="resume-header">
      <h1 class="resume-name">${escapeHtml(name)}</h1>

      ${role
      ? `<p class="resume-role">${escapeHtml(role)}</p>`
      : ""}

      ${contactHtml
      ? `<div class="contact-line">${contactHtml}</div>`
      : ""}
    </header>

    ${orderedSections}

    ${!summary &&
      !education &&
      !skills &&
      !certifications &&
      !internships &&
      !projects
      ? `<p class="summary-text empty-hint">
            Fill in the form to build your resume preview.
          </p>`
      : ""}
  `;

  applyDesign();
}

// ==========================================
// 11. Event listeners
// ==========================================

// Update the preview when resume fields change.
form.addEventListener("input", renderPreview);

// Update design when design controls change.
designControlIds.forEach(id => {
  const control = document.getElementById(id);

  if (control) {
    control.addEventListener("input", applyDesign);
    control.addEventListener("change", applyDesign);
  }
});

// Reset design settings.
const resetDesignButton = document.getElementById("resetDesign");

if (resetDesignButton) {
  resetDesignButton.addEventListener("click", () => {
    Object.entries(defaultDesign).forEach(([key, value]) => {
      const control = document.getElementById(key);

      if (control) control.value = value;
    });

    applyDesign();
  });
}

// Export as PDF using the browser's print dialog.
const downloadPdfButton = document.getElementById("downloadPdf");

if (downloadPdfButton) {
  downloadPdfButton.addEventListener("click", () => {
    applyDesign();
    window.print();
  });
}

// Reset all resume content, design and section ordering.
const resetFormButton = document.getElementById("resetForm");

if (resetFormButton) {
  resetFormButton.addEventListener("click", () => {
    if (!confirm("Clear all resume details? This cannot be undone.")) {
      return;
    }

    form.reset();

    Object.values(sectionConfig).forEach(config => {
      const container = document.getElementById(config.container);

      if (container) container.innerHTML = "";
    });

    Object.entries(defaultDesign).forEach(([key, value]) => {
      const control = document.getElementById(key);

      if (control) control.value = value;
    });

    sectionOrder = [...defaultSectionOrder];

    addStarterEntries();
    renderSectionOrderControls();
    renderPreview();
  });
}

// ==========================================
// 12. Initialize
// ==========================================

function addStarterEntries() {
  makeEntry("education");
  makeEntry("certification");
  makeEntry("internship");
  makeEntry("project");
}

addStarterEntries();
renderSectionOrderControls();
renderPreview();
