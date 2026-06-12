/* ============================================
   TechHub Student Portal — app.js
   ============================================ */

// ─── DATA STORE ───────────────────────────────
let students = JSON.parse(localStorage.getItem("th_students") || "[]");
let courses = JSON.parse(localStorage.getItem("th_courses") || "[]");
let enrollments = JSON.parse(localStorage.getItem("th_enrollments") || "[]");

// ─── SEED DATA (first load) ───────────────────
function seedData() {
  if (students.length === 0) {
    students = [
      {
        id: "STU001",
        name: "Ada Okafor",
        email: "ada@hub.ng",
        phone: "+234 801 234 5678",
        track: "Web Development",
        joined: "2024-01-15",
      },
      {
        id: "STU002",
        name: "Emeka Nwosu",
        email: "emeka@hub.ng",
        phone: "+234 802 345 6789",
        track: "Data Science",
        joined: "2024-02-03",
      },
      {
        id: "STU003",
        name: "Fatima Bello",
        email: "fatima@hub.ng",
        phone: "+234 803 456 7890",
        track: "Cybersecurity",
        joined: "2024-02-18",
      },
      {
        id: "STU004",
        name: "Chidi Eze",
        email: "chidi@hub.ng",
        phone: "+234 804 567 8901",
        track: "Mobile Dev",
        joined: "2024-03-01",
      },
      {
        id: "STU005",
        name: "Ngozi Adeleke",
        email: "ngozi@hub.ng",
        phone: "+234 805 678 9012",
        track: "UI/UX Design",
        joined: "2024-03-12",
      },
      {
        id: "STU006",
        name: "Tunde Adesanya",
        email: "tunde@hub.ng",
        phone: "+234 806 789 0123",
        track: "Cloud Computing",
        joined: "2024-04-01",
      },
    ];
  }
  if (courses.length === 0) {
    courses = [
      {
        id: "CRS001",
        title: "Full-Stack Web Dev",
        instructor: "Mr. Adeleke Femi",
        duration: 16,
        tag: "Frontend/Backend",
        desc: "End-to-end web development using React, Node.js and MongoDB.",
      },
      {
        id: "CRS002",
        title: "Data Science Bootcamp",
        instructor: "Dr. Amaka Obi",
        duration: 12,
        tag: "Data Science",
        desc: "Python, Pandas, ML algorithms and real-world data projects.",
      },
      {
        id: "CRS003",
        title: "Cybersecurity Fundamentals",
        instructor: "Engr. Taiwo",
        duration: 10,
        tag: "Security",
        desc: "Network security, ethical hacking, and digital forensics.",
      },
      {
        id: "CRS004",
        title: "UI/UX Design Mastery",
        instructor: "Ms. Sade Coker",
        duration: 8,
        tag: "Design",
        desc: "User research, Figma prototyping, and design systems.",
      },
      {
        id: "CRS005",
        title: "Cloud & DevOps",
        instructor: "Engr. Kelvin Nna",
        duration: 14,
        tag: "Cloud",
        desc: "AWS, Docker, Kubernetes, and CI/CD pipelines.",
      },
    ];
  }
  if (enrollments.length === 0) {
    enrollments = [
      {
        id: "ENR001",
        studentId: "STU001",
        courseId: "CRS001",
        enrolledOn: "2024-01-20",
        progress: 78,
      },
      {
        id: "ENR002",
        studentId: "STU001",
        courseId: "CRS004",
        enrolledOn: "2024-02-01",
        progress: 45,
      },
      {
        id: "ENR003",
        studentId: "STU002",
        courseId: "CRS002",
        enrolledOn: "2024-02-10",
        progress: 90,
      },
      {
        id: "ENR004",
        studentId: "STU003",
        courseId: "CRS003",
        enrolledOn: "2024-02-22",
        progress: 55,
      },
      {
        id: "ENR005",
        studentId: "STU004",
        courseId: "CRS001",
        enrolledOn: "2024-03-05",
        progress: 30,
      },
      {
        id: "ENR006",
        studentId: "STU005",
        courseId: "CRS004",
        enrolledOn: "2024-03-15",
        progress: 100,
      },
      {
        id: "ENR007",
        studentId: "STU006",
        courseId: "CRS005",
        enrolledOn: "2024-04-05",
        progress: 15,
      },
    ];
  }
  save();
}

function save() {
  localStorage.setItem("th_students", JSON.stringify(students));
  localStorage.setItem("th_courses", JSON.stringify(courses));
  localStorage.setItem("th_enrollments", JSON.stringify(enrollments));
}

// ─── UTILS ────────────────────────────────────
function uid(prefix) {
  return prefix + String(Date.now()).slice(-6);
}

function fmt(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getStatus(pct) {
  if (pct >= 100) return { label: "Complete", cls: "status-complete" };
  if (pct > 0) return { label: "In Progress", cls: "status-progress" };
  return { label: "Pending", cls: "status-pending" };
}

function studentById(id) {
  return students.find((s) => s.id === id);
}
function courseById(id) {
  return courses.find((c) => c.id === id);
}
function enrollsOf(sId) {
  return enrollments.filter((e) => e.studentId === sId);
}
function enrollsOn(cId) {
  return enrollments.filter((e) => e.courseId === cId);
}

// ─── TOAST ────────────────────────────────────
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2800);
}

// ─── NAVIGATION ───────────────────────────────
function showPage(name) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".nav-item")
    .forEach((n) => n.classList.remove("active"));
  const page = document.getElementById("page-" + name);
  if (page) page.classList.add("active");
  const nav = document.querySelector(`[data-page="${name}"]`);
  if (nav) nav.classList.add("active");
  document.getElementById("pageTitle").textContent =
    {
      dashboard: "Dashboard",
      students: "Students",
      courses: "Courses",
      progress: "Progress",
      enrollments: "Enrollments",
    }[name] || name;
  renderPage(name);
}

function renderPage(name) {
  if (name === "dashboard") renderDashboard();
  if (name === "students") renderStudents();
  if (name === "courses") renderCourses();
  if (name === "progress") renderProgress();
  if (name === "enrollments") renderEnrollments();
}

// ─── DASHBOARD ────────────────────────────────
function renderDashboard() {
  document.getElementById("stat-students").textContent = students.length;
  document.getElementById("stat-courses").textContent = courses.length;
  document.getElementById("stat-enrollments").textContent = enrollments.length;

  const avg = enrollments.length
    ? Math.round(
        enrollments.reduce((a, e) => a + e.progress, 0) / enrollments.length,
      )
    : 0;
  document.getElementById("stat-progress").textContent = avg + "%";

  // Recent students
  const recentEl = document.getElementById("recentStudents");
  const recent = [...students]
    .sort((a, b) => new Date(b.joined) - new Date(a.joined))
    .slice(0, 5);
  recentEl.innerHTML = recent.length
    ? recent
        .map(
          (s) =>
            `<div class="mini-row">
      <div>
        <div class="mini-name">${s.name}</div>
        <div class="mini-date">${s.track}</div>
      </div>
      <span class="mini-date">${fmt(s.joined)}</span>
    </div>`,
        )
        .join("")
    : emptyState("No students yet");

  // Top courses by enrollment
  const topEl = document.getElementById("topCourses");
  const sorted = [...courses]
    .sort((a, b) => enrollsOn(b.id).length - enrollsOn(a.id).length)
    .slice(0, 5);
  topEl.innerHTML = sorted.length
    ? sorted
        .map(
          (c) =>
            `<div class="mini-row">
      <div>
        <div class="mini-name">${c.title}</div>
        <div class="mini-date">${c.instructor}</div>
      </div>
      <span class="enroll-count">${enrollsOn(c.id).length} enrolled</span>
    </div>`,
        )
        .join("")
    : emptyState("No courses yet");
}

function emptyState(msg) {
  return `<div class="empty-state"><div class="empty-icon">◌</div>${msg}</div>`;
}

// ─── STUDENTS ─────────────────────────────────
function renderStudents(list) {
  const data = list || students;
  const tbody = document.getElementById("studentBody");
  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="7">${emptyState("No students registered yet")}</td></tr>`;
    return;
  }
  tbody.innerHTML = data
    .map((s) => {
      const count = enrollsOf(s.id).length;
      return `<tr>
      <td><span class="id-badge">${s.id}</span></td>
      <td><strong>${s.name}</strong></td>
      <td>${s.email}</td>
      <td>${s.phone}</td>
      <td><span class="tag-pill">${count} course${count !== 1 ? "s" : ""}</span></td>
      <td><span class="mini-date">${fmt(s.joined)}</span></td>
      <td>
        <div class="action-btns">
          <button class="btn btn-sm btn-edit" onclick="openEditStudent('${s.id}')">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteStudent('${s.id}')">Delete</button>
        </div>
      </td>
    </tr>`;
    })
    .join("");
}

function openAddStudent() {
  document.getElementById("studentModalTitle").textContent = "Add Student";
  document.getElementById("studentId").value = "";
  document.getElementById("studentName").value = "";
  document.getElementById("studentEmail").value = "";
  document.getElementById("studentPhone").value = "";
  document.getElementById("studentTrack").value = "";
  openModal("studentModal");
}

function openEditStudent(id) {
  const s = studentById(id);
  if (!s) return;
  document.getElementById("studentModalTitle").textContent = "Edit Student";
  document.getElementById("studentId").value = s.id;
  document.getElementById("studentName").value = s.name;
  document.getElementById("studentEmail").value = s.email;
  document.getElementById("studentPhone").value = s.phone;
  document.getElementById("studentTrack").value = s.track;
  openModal("studentModal");
}

function saveStudent() {
  const id = document.getElementById("studentId").value;
  const name = document.getElementById("studentName").value.trim();
  const email = document.getElementById("studentEmail").value.trim();
  const phone = document.getElementById("studentPhone").value.trim();
  const track = document.getElementById("studentTrack").value.trim();

  if (!name || !email) {
    toast("⚠ Name and email are required");
    return;
  }

  if (id) {
    const s = studentById(id);
    Object.assign(s, { name, email, phone, track });
    toast("✓ Student updated");
  } else {
    students.push({
      id: uid("STU"),
      name,
      email,
      phone,
      track,
      joined: new Date().toISOString().slice(0, 10),
    });
    toast("✓ Student added");
  }
  save();
  closeModal("studentModal");
  renderStudents();
  renderDashboard();
}

function deleteStudent(id) {
  if (
    !confirm("Delete this student? All their enrollments will also be removed.")
  )
    return;
  students = students.filter((s) => s.id !== id);
  enrollments = enrollments.filter((e) => e.studentId !== id);
  save();
  renderStudents();
  renderDashboard();
  toast("✓ Student removed");
}

// ─── COURSES ──────────────────────────────────
function renderCourses() {
  const grid = document.getElementById("coursesGrid");
  if (!courses.length) {
    grid.innerHTML = emptyState("No courses created yet");
    return;
  }
  grid.innerHTML = courses
    .map((c) => {
      const count = enrollsOn(c.id).length;
      return `<div class="course-card">
      <span class="course-tag">${c.tag}</span>
      <div class="course-title">${c.title}</div>
      <div class="course-instructor">by ${c.instructor}</div>
      <div class="course-meta">
        <span>⏱ ${c.duration} weeks</span>
        <span class="enroll-count">${count} enrolled</span>
      </div>
      <div class="course-desc">${c.desc}</div>
      <div class="course-actions">
        <button class="btn btn-sm btn-edit" onclick="openEditCourse('${c.id}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteCourse('${c.id}')">Delete</button>
      </div>
    </div>`;
    })
    .join("");
}

function openAddCourse() {
  document.getElementById("courseModalTitle").textContent = "Add Course";
  document.getElementById("courseId").value = "";
  document.getElementById("courseTitle").value = "";
  document.getElementById("courseInstructor").value = "";
  document.getElementById("courseDuration").value = "";
  document.getElementById("courseDesc").value = "";
  document.getElementById("courseTag").value = "";
  openModal("courseModal");
}

function openEditCourse(id) {
  const c = courseById(id);
  if (!c) return;
  document.getElementById("courseModalTitle").textContent = "Edit Course";
  document.getElementById("courseId").value = c.id;
  document.getElementById("courseTitle").value = c.title;
  document.getElementById("courseInstructor").value = c.instructor;
  document.getElementById("courseDuration").value = c.duration;
  document.getElementById("courseDesc").value = c.desc;
  document.getElementById("courseTag").value = c.tag;
  openModal("courseModal");
}

function saveCourse() {
  const id = document.getElementById("courseId").value;
  const title = document.getElementById("courseTitle").value.trim();
  const instructor = document.getElementById("courseInstructor").value.trim();
  const duration =
    parseInt(document.getElementById("courseDuration").value) || 0;
  const desc = document.getElementById("courseDesc").value.trim();
  const tag = document.getElementById("courseTag").value.trim();

  if (!title || !instructor) {
    toast("⚠ Title and instructor are required");
    return;
  }

  if (id) {
    const c = courseById(id);
    Object.assign(c, { title, instructor, duration, desc, tag });
    toast("✓ Course updated");
  } else {
    courses.push({ id: uid("CRS"), title, instructor, duration, desc, tag });
    toast("✓ Course added");
  }
  save();
  closeModal("courseModal");
  renderCourses();
  renderDashboard();
}

function deleteCourse(id) {
  if (
    !confirm("Delete this course? All enrollments in it will also be removed.")
  )
    return;
  courses = courses.filter((c) => c.id !== id);
  enrollments = enrollments.filter((e) => e.courseId !== id);
  save();
  renderCourses();
  renderDashboard();
  toast("✓ Course removed");
}

// ─── PROGRESS ─────────────────────────────────
function renderProgress() {
  const tbody = document.getElementById("progressBody");
  if (!enrollments.length) {
    tbody.innerHTML = `<tr><td colspan="5">${emptyState("No enrollments yet")}</td></tr>`;
    return;
  }
  tbody.innerHTML = enrollments
    .map((e) => {
      const s = studentById(e.studentId);
      const c = courseById(e.courseId);
      if (!s || !c) return "";
      const st = getStatus(e.progress);
      return `<tr>
      <td><strong>${s.name}</strong></td>
      <td>${c.title}</td>
      <td>
        <div class="progress-wrap">
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width:${e.progress}%"></div>
          </div>
          <span class="progress-pct">${e.progress}%</span>
        </div>
      </td>
      <td><span class="status-badge ${st.cls}">${st.label}</span></td>
      <td>
        <input type="range" min="0" max="100" value="${e.progress}"
          oninput="updateProgress('${e.id}', this.value, this)"
          style="width:100px" />
      </td>
    </tr>`;
    })
    .join("");
}

function updateProgress(enrollId, val, input) {
  const e = enrollments.find((e) => e.id === enrollId);
  if (!e) return;
  e.progress = parseInt(val);
  save();
  // update same row live
  const row = input.closest("tr");
  row.querySelector(".progress-bar-fill").style.width = val + "%";
  row.querySelector(".progress-pct").textContent = val + "%";
  const st = getStatus(e.progress);
  const badge = row.querySelector(".status-badge");
  badge.className = "status-badge " + st.cls;
  badge.textContent = st.label;
  renderDashboard();
}

// ─── ENROLLMENTS ──────────────────────────────
function renderEnrollments() {
  const tbody = document.getElementById("enrollBody");
  if (!enrollments.length) {
    tbody.innerHTML = `<tr><td colspan="5">${emptyState("No enrollments yet")}</td></tr>`;
    return;
  }
  tbody.innerHTML = enrollments
    .map((e) => {
      const s = studentById(e.studentId);
      const c = courseById(e.courseId);
      if (!s || !c) return "";
      const st = getStatus(e.progress);
      return `<tr>
      <td><strong>${s.name}</strong></td>
      <td>${c.title}</td>
      <td><span class="mini-date">${fmt(e.enrolledOn)}</span></td>
      <td>
        <div class="progress-wrap">
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width:${e.progress}%"></div>
          </div>
          <span class="progress-pct">${e.progress}%</span>
        </div>
      </td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="removeEnrollment('${e.id}')">Remove</button>
      </td>
    </tr>`;
    })
    .join("");
}

function openEnrollModal() {
  const sEl = document.getElementById("enrollStudent");
  const cEl = document.getElementById("enrollCourse");
  sEl.innerHTML = students
    .map((s) => `<option value="${s.id}">${s.name}</option>`)
    .join("");
  cEl.innerHTML = courses
    .map((c) => `<option value="${c.id}">${c.title}</option>`)
    .join("");
  openModal("enrollModal");
}

function saveEnrollment() {
  const sId = document.getElementById("enrollStudent").value;
  const cId = document.getElementById("enrollCourse").value;
  if (!sId || !cId) {
    toast("⚠ Please select a student and course");
    return;
  }
  if (enrollments.find((e) => e.studentId === sId && e.courseId === cId)) {
    toast("⚠ Student already enrolled in this course");
    return;
  }
  enrollments.push({
    id: uid("ENR"),
    studentId: sId,
    courseId: cId,
    enrolledOn: new Date().toISOString().slice(0, 10),
    progress: 0,
  });
  save();
  closeModal("enrollModal");
  renderEnrollments();
  renderDashboard();
  toast("✓ Student enrolled");
}

function removeEnrollment(id) {
  if (!confirm("Remove this enrollment?")) return;
  enrollments = enrollments.filter((e) => e.id !== id);
  save();
  renderEnrollments();
  renderDashboard();
  toast("✓ Enrollment removed");
}

// ─── MODALS ───────────────────────────────────
function openModal(id) {
  document.getElementById(id).classList.add("open");
  document.getElementById("modalBackdrop").classList.add("open");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("open");
  document.getElementById("modalBackdrop").classList.remove("open");
}

// ─── GLOBAL SEARCH ────────────────────────────
function handleSearch(query) {
  const q = query.toLowerCase().trim();
  if (!q) {
    renderStudents();
    return;
  }
  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.track.toLowerCase().includes(q),
  );
  // Switch to students page and show filtered
  showPage("students");
  renderStudents(filtered);
}

// ─── EVENT LISTENERS ──────────────────────────
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    showPage(item.dataset.page);
    document.getElementById("sidebar").classList.remove("open");
  });
});

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});

document.getElementById("modalBackdrop").addEventListener("click", () => {
  document
    .querySelectorAll(".modal.open")
    .forEach((m) => m.classList.remove("open"));
  document.getElementById("modalBackdrop").classList.remove("open");
});

document.querySelectorAll("[data-close]").forEach((btn) => {
  btn.addEventListener("click", () => closeModal(btn.dataset.close));
});

document
  .getElementById("addStudentBtn")
  .addEventListener("click", openAddStudent);
document
  .getElementById("saveStudentBtn")
  .addEventListener("click", saveStudent);

document
  .getElementById("addCourseBtn")
  .addEventListener("click", openAddCourse);
document.getElementById("saveCourseBtn").addEventListener("click", saveCourse);

document
  .getElementById("addEnrollBtn")
  .addEventListener("click", openEnrollModal);
document
  .getElementById("saveEnrollBtn")
  .addEventListener("click", saveEnrollment);

let searchTimer;
document.getElementById("globalSearch").addEventListener("input", (e) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => handleSearch(e.target.value), 300);
});

// ─── INIT ─────────────────────────────────────
seedData();
showPage("dashboard");
