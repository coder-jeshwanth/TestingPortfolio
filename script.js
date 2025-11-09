// Global Variables and State
let currentSection = 'about';
let isDarkTheme = true;
let chatExpanded = true;

// Project Data
const projectData = {
    offshare: {
        title: "OFFShare - Xerox Shop File Sharing",
        description: "Secure file-sharing platform designed specifically for Xerox shops across India. Users can easily scan a QR code to send files directly to shop dashboards, with automatic deletion after printing for enhanced security.",
        techStack: ["React.js", "Spring Boot", "MySQL", "QR Code API", "JWT Authentication"],
        features: [
            "QR-based file transfer system",
            "Automatic file deletion after 10 minutes",
            "Secure backend with encryption",
            "Real-time dashboard updates",
            "Multi-format file support",
            "Shop management system"
        ],
        architecture: "Microservices architecture with React frontend, Spring Boot backend, and MySQL database. Implemented JWT-based authentication and real-time WebSocket connections for live updates.",
        challenges: "Implementing secure file transfer with automatic cleanup, ensuring cross-platform compatibility, and optimizing for low-bandwidth environments typical in Indian Xerox shops.",
        github: "#",
        demo: "#",
        status: "Deployed on AWS"
    },
    gym: {
        title: "Gym Management Software",
        description: "Comprehensive web application designed to streamline gym operations including membership management, payment tracking, and trainer scheduling with detailed analytics dashboard.",
        techStack: ["Java", "Spring Boot", "MySQL", "React.js", "Chart.js", "Spring Security"],
        features: [
            "Member registration and profile management",
            "Payment history and dues tracking",
            "Trainer assignment and scheduling",
            "Equipment maintenance logs",
            "Analytics dashboard with charts",
            "SMS/Email notification system"
        ],
        architecture: "Full-stack application using Spring Boot REST APIs with React frontend. MySQL database with optimized queries for reporting. Role-based access control for different user types.",
        challenges: "Designing efficient database schema for complex relationships, implementing real-time notifications, and creating responsive charts for mobile devices.",
        github: "#",
        demo: "#",
        status: "Production Ready"
    },
    photoshop: {
        title: "Photoshop Clone - Web Canvas Editor",
        description: "Browser-based image editing application built using React and HTML5 Canvas API, providing essential photo editing tools similar to Adobe Photoshop but accessible through any web browser.",
        techStack: ["React.js", "HTML5 Canvas", "JavaScript", "Context API", "CSS3 Animations"],
        features: [
            "Layer management system",
            "Multiple filters and effects",
            "Crop and rotate functionality",
            "Undo/Redo operations",
            "Brush and drawing tools",
            "Export in multiple formats"
        ],
        architecture: "React-based SPA with Canvas API for image manipulation. Context API for state management and custom hooks for canvas operations. Modular component architecture for tool extensibility.",
        challenges: "Handling large image files efficiently, implementing complex layer blending modes, and ensuring smooth performance across different devices and browsers.",
        github: "#",
        demo: "#",
        status: "Open Source"
    },
    booking: {
        title: "Slot Booking Application",
        description: "Comprehensive online slot booking and scheduling system with real-time availability tracking, automated email notifications, and detailed booking analytics for service providers.",
        techStack: ["React.js", "Spring Boot", "MySQL", "Firebase", "Email API", "Calendar Integration"],
        features: [
            "Real-time slot availability",
            "Automated email notifications",
            "Calendar integration",
            "Booking analytics dashboard",
            "Payment gateway integration",
            "Multi-timezone support"
        ],
        architecture: "Event-driven architecture with React frontend, Spring Boot microservices, MySQL for data persistence, and Firebase for real-time updates. RESTful APIs with comprehensive error handling.",
        challenges: "Managing concurrent bookings without conflicts, implementing reliable notification system, and handling timezone conversions for global users.",
        github: "#",
        demo: "#",
        status: "Enterprise Ready"
    }
};

// Skill tooltips data
const skillTooltips = {
    "React.js": "Advanced React development with hooks, context, and performance optimization",
    "HTML5": "Semantic HTML5 with accessibility best practices",
    "CSS3": "Modern CSS3 with animations, flexbox, and grid layouts",
    "JavaScript": "ES6+ JavaScript with async/await, modules, and advanced concepts",
    "Tailwind": "Utility-first CSS framework for rapid UI development",
    "Java": "Enterprise Java development with Spring ecosystem",
    "Spring Boot": "Microservices development with Spring Boot and Spring Cloud",
    "REST APIs": "RESTful API design and implementation with proper HTTP methods",
    "Maven": "Build automation and dependency management with Maven",
    "MySQL": "Database design, optimization, and complex query writing",
    "Hibernate": "ORM mapping with Hibernate and JPA specifications",
    "JPA": "Java Persistence API for database abstraction",
    "AWS": "Cloud deployment with EC2, S3, RDS, and Lambda services",
    "Docker": "Containerization and orchestration with Docker and Kubernetes",
    "Git": "Version control with advanced Git workflows and branching strategies",
    "Firebase": "Real-time database and authentication services"
};

// AI Chat responses
const chatResponses = {
    "projects": "I've built 4+ major projects including OFFShare (file sharing for Xerox shops), Gym Management Software, a Photoshop Clone, and a Slot Booking Application. Each project showcases different aspects of full-stack development.",
    "skills": "I specialize in Java Spring Boot for backend development, React.js for frontend, and MySQL for databases. I also work with AWS, Docker, and modern development tools.",
    "experience": "I have 3+ years of experience in full-stack development, having completed 10+ projects and worked with 50+ satisfied clients. I focus on building scalable and secure web applications.",
    "contact": "You can reach me via email at jeshwanth.dev@gmail.com, connect on LinkedIn, or check out my GitHub repositories. I'm always open to discussing new opportunities!",
    "technologies": "My tech stack includes Java, Spring Boot, React.js, MySQL, AWS, Docker, Git, and various modern development tools. I'm always learning new technologies to stay current.",
    "education": "I have a Bachelor's degree in Computer Science and continuously update my skills through online courses and hands-on projects.",
    "availability": "I'm currently open to new opportunities, both full-time positions and freelance projects. Feel free to reach out to discuss your requirements!"
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    setupEventListeners();
    setupTypingEffect();
    setupSkillTooltips();
    setupChatWidget();
    setupProjectAnimations();
    
    // Show initial section
    showSection('about');
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    isDarkTheme = savedTheme === 'dark';
    updateTheme();
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    updateTheme();
    localStorage.setItem('portfolio-theme', isDarkTheme ? 'dark' : 'light');
}

function updateTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('#themeToggle i');
    
    if (isDarkTheme) {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-sun';
    } else {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-moon';
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Sidebar navigation
    const folderItems = document.querySelectorAll('.folder-item');
    folderItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.getAttribute('data-section');
            if (section) {
                showSection(section);
                updateActiveTab(section);
            }
        });
    });
    
    // Terminal commands
    const commandItems = document.querySelectorAll('.command-item');
    commandItems.forEach(item => {
        item.addEventListener('click', () => {
            const command = item.getAttribute('data-command');
            executeCommand(command);
        });
    });
    
    // Tab close functionality
    document.querySelectorAll('.tab-close').forEach(close => {
        close.addEventListener('click', (e) => {
            e.stopPropagation();
            // In a real app, you might close the tab and show another section
        });
    });
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Modal close
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.getElementById('projectModal').addEventListener('click', (e) => {
        if (e.target.id === 'projectModal') {
            closeModal();
        }
    });
}

// Section Navigation
function showSection(sectionId) {
    // Update active folder item
    document.querySelectorAll('.folder-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    
    // Update content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    // Update active tab
    updateActiveTab(sectionId);
    
    currentSection = sectionId;
}

function updateActiveTab(sectionId) {
    const tabBar = document.querySelector('.tab-bar');
    
    // Check if tab already exists
    let existingTab = document.querySelector(`[data-section="${sectionId}"].tab`);
    
    if (!existingTab) {
        // Create new tab
        const newTab = document.createElement('div');
        newTab.className = 'tab';
        newTab.setAttribute('data-section', sectionId);
        newTab.innerHTML = `
            <span>${getFileName(sectionId)}</span>
            <i class="fas fa-times tab-close"></i>
        `;
        
        // Add click listener to new tab
        newTab.addEventListener('click', () => showSection(sectionId));
        newTab.querySelector('.tab-close').addEventListener('click', (e) => {
            e.stopPropagation();
            // Close tab functionality can be implemented here
        });
        
        tabBar.appendChild(newTab);
        existingTab = newTab;
    }
    
    // Update active state
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    existingTab.classList.add('active');
}

function getFileName(sectionId) {
    const fileNames = {
        'about': 'about.js',
        'skills': 'skills.json',
        'projects': 'projects/',
        'resume': 'resume.pdf',
        'contact': 'contact.md'
    };
    return fileNames[sectionId] || sectionId;
}

// Terminal Commands
function executeCommand(command) {
    console.log(`Executing command: ${command}`);
    
    // Add visual feedback
    const commandElement = document.querySelector(`[data-command="${command}"]`);
    commandElement.style.background = 'var(--accent-primary)';
    commandElement.style.color = 'white';
    
    setTimeout(() => {
        commandElement.style.background = '';
        commandElement.style.color = '';
    }, 200);
    
    // Execute command logic
    switch (command) {
        case 'help':
            showSection('about');
            break;
        case 'whoami':
            showSection('about');
            break;
        case 'ls -la':
            showSection('projects');
            break;
        case 'cat skills':
            showSection('skills');
            break;
        case 'git log':
            showSection('resume');
            break;
        default:
            console.log('Command not recognized');
    }
}

// Typing Effect
function setupTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.width = '0';
        
        setTimeout(() => {
            typeText(element, text, 0);
        }, 1000);
    });
}

function typeText(element, text, index) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        element.style.width = `${(index + 1) * 0.8}em`;
        setTimeout(() => typeText(element, text, index + 1), 100);
    } else {
        // Remove typing cursor after completion
        setTimeout(() => {
            element.style.borderRight = 'none';
        }, 1000);
    }
}

// Skill Tooltips
function setupSkillTooltips() {
    const skillItems = document.querySelectorAll('.skill-item');
    const tooltip = document.getElementById('skillTooltip');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const skillName = item.getAttribute('data-skill');
            const tooltipText = skillTooltips[skillName];
            
            if (tooltipText) {
                tooltip.querySelector('.tooltip-content').textContent = tooltipText;
                tooltip.style.display = 'block';
                
                const rect = item.getBoundingClientRect();
                tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            }
        });
        
        item.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    });
}

// Project Modal
function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = project.title;
    
    modalBody.innerHTML = `
        <div class="project-detail">
            <div class="project-overview">
                <h3>Project Overview</h3>
                <p>${project.description}</p>
            </div>
            
            <div class="tech-stack-detail">
                <h3>Technology Stack</h3>
                <div class="tech-list">
                    ${project.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div class="features-detail">
                <h3>Key Features</h3>
                <ul class="feature-list">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="architecture-detail">
                <h3>Architecture & Design</h3>
                <p>${project.architecture}</p>
            </div>
            
            <div class="challenges-detail">
                <h3>Challenges & Solutions</h3>
                <p>${project.challenges}</p>
            </div>
            
            <div class="project-links">
                <a href="${project.github}" class="project-link" target="_blank">
                    <i class="fab fa-github"></i> View Code
                </a>
                <a href="${project.demo}" class="project-link demo" target="_blank">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
                <span class="project-status">${project.status}</span>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
}

// Chat Widget
function setupChatWidget() {
    const chatToggle = document.getElementById('chatToggle');
    const chatBody = document.querySelector('.chat-body');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    
    chatToggle.addEventListener('click', () => {
        chatExpanded = !chatExpanded;
        chatBody.classList.toggle('collapsed', !chatExpanded);
        chatToggle.innerHTML = chatExpanded ? '<i class="fas fa-minus"></i>' : '<i class="fas fa-plus"></i>';
    });
    
    chatSend.addEventListener('click', () => sendChatMessage());
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user';
    userMessage.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(userMessage);
    
    // Clear input
    chatInput.value = '';
    
    // Generate bot response
    setTimeout(() => {
        const botResponse = generateChatResponse(message);
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot';
        botMessage.innerHTML = `<p>${botResponse}</p>`;
        chatMessages.appendChild(botMessage);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateChatResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('project')) {
        return chatResponses.projects;
    } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
        return chatResponses.technologies;
    } else if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
        return chatResponses.experience;
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
        return chatResponses.contact;
    } else if (lowerMessage.includes('available') || lowerMessage.includes('hire') || lowerMessage.includes('job')) {
        return chatResponses.availability;
    } else if (lowerMessage.includes('education') || lowerMessage.includes('degree')) {
        return chatResponses.education;
    } else {
        return "That's an interesting question! You can ask me about Jeshwanth's projects, skills, experience, or how to contact him. What would you like to know more about?";
    }
}

// Contact Form
function handleContactSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Add loading state
    const submitButton = e.target.querySelector('.btn-send');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<div class="loading"></div> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Resume Functions
function downloadResume() {
    // In a real application, this would download the actual PDF
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual resume PDF path
    link.download = 'Jeshwanth_A_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show feedback
    alert('Resume download started! (This is a demo - replace with actual PDF link)');
}

function viewResume() {
    // This could open a modal with an interactive resume or navigate to a new page
    alert('Interactive resume feature coming soon! For now, please use the download option.');
}

// Project Animations
function setupProjectAnimations() {
    // Animate project windows on scroll or load
    const projectWindows = document.querySelectorAll('.project-window');
    
    // Add staggered animation delay
    projectWindows.forEach((window, index) => {
        window.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add hover sound effect (optional)
    projectWindows.forEach(window => {
        window.addEventListener('mouseenter', () => {
            // Add subtle scale animation or sound effect
            window.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        window.addEventListener('mouseleave', () => {
            window.style.transform = '';
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance Monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
            }, 0);
        });
    }
}

// Initialize performance tracking
trackPerformance();

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus on chat
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('chatInput').focus();
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS for modal project details
const additionalStyles = `
    .project-detail {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
    
    .project-detail h3 {
        font-family: 'Inter', sans-serif;
        color: var(--accent-primary);
        margin-bottom: 12px;
        font-size: 18px;
        font-weight: 600;
    }
    
    .tech-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 8px;
    }
    
    .tech-badge {
        background: var(--accent-primary);
        color: white;
        padding: 6px 12px;
        border-radius: 16px;
        font-size: 12px;
        font-weight: 500;
    }
    
    .feature-list {
        list-style: none;
        padding: 0;
    }
    
    .feature-list li {
        padding: 8px 0;
        border-bottom: 1px solid var(--border-color);
        position: relative;
        padding-left: 20px;
    }
    
    .feature-list li:before {
        content: "✓";
        color: var(--accent-success);
        font-weight: bold;
        position: absolute;
        left: 0;
    }
    
    .project-links {
        display: flex;
        gap: 16px;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 16px;
    }
    
    .project-link {
        display: flex;
        align-items: center;
        gap: 8px;
        background: var(--accent-primary);
        color: white;
        padding: 10px 16px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.2s ease;
    }
    
    .project-link:hover {
        background: var(--accent-secondary);
        transform: translateY(-2px);
    }
    
    .project-link.demo {
        background: var(--accent-success);
    }
    
    .project-status {
        background: var(--bg-tertiary);
        color: var(--text-secondary);
        padding: 6px 12px;
        border-radius: 12px;
        font-size: 12px;
        border: 1px solid var(--border-color);
    }
`;

// Add the additional styles to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Export functions for global access
window.openProjectModal = openProjectModal;
window.downloadResume = downloadResume;
window.viewResume = viewResume;