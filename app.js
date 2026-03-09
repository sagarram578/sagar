/**
 * Java LMS Mock Data and Logic
 */

// --- DATA ---
const courses = [
  {
    id: 1,
    title: "Java Fundamentals Masterclass",
    desc: "Start your software engineering journey. Learn core Java syntax, variables, loops, and object-oriented concepts from scratch.",
    level: "beginner",
    instructor: "Jane Doe",
    duration: "12 Hours",
    price: "$49.99",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Spring Boot 3 Core Architectures",
    desc: "Build scalable backend applications. Master dependency injection, RESTful APIs, Spring Data JPA, and security best practices.",
    level: "intermediate",
    instructor: "Marcus Rossi",
    duration: "24 Hours",
    price: "$89.99",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "High-Performance Concurrency in Java",
    desc: "Unlock the full power of modern hardware. Deep dive into multithreading, the Fork/Join framework, and thread-safe collections.",
    level: "advanced",
    instructor: "Dr. Elena Volkov",
    duration: "18 Hours",
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Data Structures & Algorithms in Java",
    desc: "Ace your coding interviews by mastering Big-O notation, trees, graphs, and dynamic programming beautifully implemented in Java.",
    level: "intermediate",
    instructor: "Alex Chen",
    duration: "30 Hours",
    price: "$75.00",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "Java Microservices with Spring Cloud",
    desc: "Design resilient distributed systems. Learn service discovery, API gateways, centralized config, and circuit breakers.",
    level: "advanced",
    instructor: "Marcus Rossi",
    duration: "28 Hours",
    price: "$95.00",
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    title: "Testing Java Apps: JUnit & Mockito",
    desc: "Write reliable, bulletproof code. Discover Test-Driven Development (TDD) and effective mocking strategies.",
    level: "beginner",
    instructor: "Jane Doe",
    duration: "8 Hours",
    price: "$35.00",
    image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=800"
  }
];

const mockCurriculum = [
  {
    sectionId: 1,
    title: "1. Introduction to Java",
    active: true,
    lessons: [
      { id: 101, title: "Setting up your environment", duration: "12:30", type: "video", active: true, youtubeId: "A74TOX803D0", start: 0 },
      { id: 102, title: "Your first HelloWorld program", duration: "15:45", type: "video", youtubeId: "A74TOX803D0", start: 800 },
      { id: 103, title: "Understanding JVM, JRE, and JDK", duration: "20:00", type: "video", youtubeId: "A74TOX803D0", start: 1600 },
      { id: 104, title: "Knowledge Check", duration: "5 Qs", type: "quiz" }
    ]
  },
  {
    sectionId: 2,
    title: "2. Variables & Data Types",
    lessons: [
      { id: 201, title: "Primitive Types vs Objects", duration: "18:20", type: "video", youtubeId: "A74TOX803D0", start: 2400 },
      { id: 202, title: "Working with Strings", duration: "25:10", type: "video", youtubeId: "A74TOX803D0", start: 3200 },
      { id: 203, title: "Arrays and Collections intro", duration: "22:15", type: "video", youtubeId: "A74TOX803D0", start: 4000 }
    ]
  },
  {
    sectionId: 3,
    title: "3. Object-Oriented Principles",
    lessons: [
      { id: 301, title: "Classes and Objects", duration: "30:00", type: "video" },
      { id: 302, title: "Inheritance and Polymorphism", duration: "35:45", type: "video" },
      { id: 303, title: "Interfaces and Abstract Classes", duration: "28:10", type: "video" },
      { id: 304, title: "Course Project: Building a Library System", duration: "45:00", type: "project" }
    ]
  }
];

// --- APP INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {

  // 1. If on Landing Page: Render Courses
  const grid = document.getElementById('courses-grid');
  if (grid) {
    renderCourses(courses);
    setupFilters();
  }

  // 2. If on Player Page: Render Sidebar & Setup Tabs
  const sidebar = document.getElementById('curriculum-container');
  if (sidebar) {
    renderCurriculum();
    setupTabs();
  }

  // 3. If on Auth Page: Setup toggles
  const loginView = document.getElementById('login-view');
  if (loginView) {
    setupAuthToggles();
  }

  // 4. Setup Chatbot (available on all pages that include its HTML)
  setupChatbot();

});

// --- AUTH PAGE LOGIC ---
function setupAuthToggles() {
  const goToSignup = document.getElementById('go-to-signup');
  const goToLogin = document.getElementById('go-to-login');
  const loginView = document.getElementById('login-view');
  const signupView = document.getElementById('signup-view');

  goToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginView.classList.remove('active');
    signupView.classList.add('active');
  });

  goToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupView.classList.remove('active');
    loginView.classList.add('active');
  });

  // Dummy form submissions
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = 'course-player.html';
  });

  document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = 'course-player.html';
  });
}

// --- LANDING PAGE LOGIC ---
function renderCourses(data) {
  const grid = document.getElementById('courses-grid');
  grid.innerHTML = ''; // Clear container

  data.forEach(course => {
    // Determine level styling class
    const levelClass = `level-${course.level}`;

    const card = document.createElement('a');
    card.href = 'course-player.html';
    card.className = 'course-card glass';

    card.innerHTML = `
      <div class="course-image-wrapper">
        <img src="${course.image}" alt="${course.title}">
        <span class="course-level ${levelClass}">${course.level}</span>
      </div>
      <div class="course-content">
        <div class="course-meta">
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${course.duration}
          </span>
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"></path><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"></path></svg>
            25 Lectures
          </span>
        </div>
        <h3 class="course-title">${course.title}</h3>
        <p class="course-desc">${course.desc}</p>
        <div class="course-footer">
          <div class="instructor">
             <div class="instructor-avatar"></div>
             <span class="instructor-name">${course.instructor}</span>
          </div>
          <span class="price">${course.price}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function setupFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      // Manage active state
      tabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');

      // Filter Logic
      const filterValue = e.target.getAttribute('data-filter');
      if (filterValue === 'all') {
        renderCourses(courses);
      } else {
        const filtered = courses.filter(c => c.level === filterValue);
        renderCourses(filtered);
      }
    });
  });
}

// --- PLAYER PAGE LOGIC ---
function renderCurriculum() {
  const container = document.getElementById('curriculum-container');
  container.innerHTML = '';

  mockCurriculum.forEach(section => {
    const secDiv = document.createElement('div');
    secDiv.className = `section ${section.active ? 'active' : ''}`;

    // Section Header
    const hdrBtn = document.createElement('button');
    hdrBtn.className = 'section-header-btn';
    hdrBtn.innerHTML = `
      <span>${section.title}</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
    `;

    // Accordion Toggle
    hdrBtn.addEventListener('click', () => {
      secDiv.classList.toggle('active');
    });

    secDiv.appendChild(hdrBtn);

    // Section Content (Lessons)
    const contentDiv = document.createElement('div');
    contentDiv.className = 'section-content';

    section.lessons.forEach(lesson => {
      const iconSVG = getIconForType(lesson.type);
      const activeClass = lesson.active ? 'active' : '';

      const lessonA = document.createElement('a');
      lessonA.href = "#";
      lessonA.className = `lesson-item ${activeClass}`;
      lessonA.innerHTML = `
        <div class="lesson-icon">${iconSVG}</div>
        <div class="lesson-details">
          <div class="lesson-title">${lesson.title}</div>
          <div class="lesson-duration">${lesson.duration}</div>
        </div>
      `;

      lessonA.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all items
        document.querySelectorAll('.lesson-item').forEach(el => el.classList.remove('active'));
        lessonA.classList.add('active');

        // Update Video if it's a video type
        if (lesson.type === 'video' && lesson.youtubeId) {
          const iframeContent = document.getElementById('youtube-player');
          if (iframeContent) {
            iframeContent.src = `https://www.youtube.com/embed/${lesson.youtubeId}?rel=0&autoplay=1&start=${lesson.start || 0}`;
          }

          const mainTitle = document.querySelector('.lesson-main-title');
          if (mainTitle) {
            mainTitle.innerText = lesson.title;
          }
        }
      });
      contentDiv.appendChild(lessonA);
    });

    secDiv.appendChild(contentDiv);
    container.appendChild(secDiv);
  });
}

function getIconForType(type) {
  if (type === 'video') {
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
  } else if (type === 'quiz') {
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  } else {
    // Project/Doc
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"></path><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"></path></svg>`;
  }
}

function setupTabs() {
  const btns = document.querySelectorAll('.tab-btn');
  const panes = document.querySelectorAll('.tab-pane');

  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remove active from all
      btns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      // Add to current
      e.target.classList.add('active');
      const targetId = e.target.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });
}

// --- CHATBOT LOGIC ---
function setupChatbot() {
  const toggleBtn = document.getElementById('chatbot-toggle');
  const closeBtn = document.getElementById('chatbot-close');
  const chatbotWindow = document.getElementById('chatbot-window');
  const sendBtn = document.getElementById('chatbot-send');
  const inputField = document.getElementById('chatbot-input');
  const messagesContainer = document.getElementById('chatbot-messages');

  if (!toggleBtn || !chatbotWindow) return;

  toggleBtn.addEventListener('click', () => {
    chatbotWindow.classList.toggle('open');
  });

  closeBtn.addEventListener('click', () => {
    chatbotWindow.classList.remove('open');
  });

  const responses = [
    "That's a great question about Java! To understand that, you should review Object-Oriented principles.",
    "I recommend checking out the 'Spring Boot 3 Core Architectures' course for related concepts.",
    "In Java, memory management is handled by the Garbage Collector automatically, but it's good to understand variable scopes.",
    "Make sure your JDK path is correctly set in your environment variables.",
    "That sounds like a NullPointerException. Ensure your objects are properly initialized before accessing their methods!",
    "Are you asking about interfaces vs abstract classes? Interfaces are contracts, while abstract classes can hold state.",
    "Yes, you can run Java on almost any operating system, thanks to the JVM!"
  ];

  function sendMessage() {
    const text = inputField.value.trim();
    if (!text) return;

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'msg user-msg';
    userMsg.innerText = text;
    messagesContainer.appendChild(userMsg);

    inputField.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulate bot thinking
    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'msg bot-msg';
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      botMsg.innerText = randomResponse;
      messagesContainer.appendChild(botMsg);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 600 + Math.random() * 500); // delay between 0.6s and 1.1s
  }

  if (sendBtn && inputField) {
    sendBtn.addEventListener('click', sendMessage);
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
}
