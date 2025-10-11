// Simple Portfolio JavaScript
console.log('Loading portfolio script...');

class BackendPortfolio {
    constructor() {
        console.log('Portfolio constructor called');
        this.init();
    }

    init() {
        console.log('Initializing portfolio...');
        this.setupAboutSection();
        this.setupTerminalSection();
        this.setupNavigation();
        console.log('Portfolio initialized successfully');
    }

    setupAboutSection() {
        console.log('Setting up about section...');
        const codeContent = document.querySelector('.code-content');
        const lineCount = document.querySelector('.line-count');
        const fileSize = document.querySelector('.file-size');

        if (codeContent) {
            const aboutContent = `{
  "personal": {
    "name": "Anish Karki",
    "title": "Backend Developer || ML Engineer",
    "location": "Pokhara, Nepal",
    "education": "Computer Engineering, IOE WRC",
    "philosophy": "Build scalable backend systems with intelligent ML integration",

    "current_focus": [
      "ML-Enhanced Backend Systems",
      "Real-time Model Serving",
      "AI/ML API Architecture",
      "MLOps & Model Deployment",
      "Scalable Data Pipelines"
    ],

    "personal_interests": {
      "hobbies": ["Gym", "Coding", "Football", "Chess", "Guitar", "Anime"],
      "current_status": "Currently doing Bachelor in Computer Engineering at IOE WRC"
    },

    "contact_info": {
      "email": "anishkarki753@gmail.com",
      "github": "github.com/anishkarki",
      "linkedin": "linkedin.com/in/anish-karki",
      "location": "Available for remote work"
    },

    "fun_facts": {
      "debugging_style": "Print statements everywhere",
      "favorite_error": "Works on my machine",
      "coffee_dependency": "Critical",
      "stack_overflow_visits": "Daily",
      "deployment_time": "Always Friday 5PM"
    }
  }
}`;

            codeContent.innerHTML = `<pre><code class="json">${aboutContent}</code></pre>`;
            
            if (lineCount) lineCount.textContent = 'Lines: 32';
            if (fileSize) fileSize.textContent = 'Size: 2.1KB';
            
            this.updateLineNumbers(aboutContent);
        }

        // Setup tab switching
        const tabs = document.querySelectorAll('.editor-tabs .tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const tabName = tab.textContent.trim();
                this.switchTabContent(tabName);
            });
        });
    }

    switchTabContent(tabName) {
        const codeContent = document.querySelector('.code-content');
        if (!codeContent) return;

        let content = '';
        let lines = 0;
        let size = '';

        switch(tabName) {
            case 'skills.json':
                content = `{
  "technical_skills": {
    "programming_languages": [
      {
        "name": "Python",
        "proficiency": "Experienced",
        "description": "Data analysis, ML pipelines",
        "libraries": ["NumPy", "Pandas", "Matplotlib", "Scikit-Learn", "PyTorch", "TensorFlow"]
      },
      {
        "name": "C/C++",
        "proficiency": "Experienced",
        "description": "Systems programming, algorithms"
      },
      {
        "name": "JavaScript",
        "proficiency": "Intermediate",
        "description": "Backend development, API integration",
        "runtime": ["Node.js"],
        "frameworks": ["Express.js"]
      }
    ],
    "databases": {
      "relational": ["PostgreSQL", "MySQL"],
      "nosql": ["MongoDB"]
    }
  }
}`;
                lines = 25;
                size = '1.8KB';
                break;
                
            case 'experience.json':
                content = `{
  "work_experience": [
    {
      "role": "Backend Developer",
      "type": "Personal Projects",
      "responsibilities": [
        "Developing RESTful APIs using Node.js and Express",
        "Implementing authentication and authorization mechanisms",
        "Optimizing database queries for performance",
        "Collaborating with frontend developers to integrate user-facing elements"
      ]
    }
  ],
  "why_hire_me": [
    {
      "core_value_proposition": "Skilled coder with good humor"
    }
  ]
}`;
                lines = 18;
                size = '1.2KB';
                break;
                
            default: // about.json
                content = `{
  "personal": {
    "name": "Anish Karki",
    "title": "Backend Developer || ML Engineer",
    "location": "Pokhara, Nepal",
    "education": "Computer Engineering, IOE WRC",
    "philosophy": "Build scalable backend systems with intelligent ML integration",

    "current_focus": [
      "ML-Enhanced Backend Systems",
      "Real-time Model Serving",
      "AI/ML API Architecture",
      "MLOps & Model Deployment"
    ],

    "contact_info": {
      "email": "anishkarki753@gmail.com",
      "github": "github.com/anishkarki",
      "linkedin": "linkedin.com/in/anish-karki"
    }
  }
}`;
                lines = 32;
                size = '2.1KB';
        }

        codeContent.innerHTML = `<pre><code class="json">${content}</code></pre>`;
        
        const lineCount = document.querySelector('.line-count');
        const fileSize = document.querySelector('.file-size');
        
        if (lineCount) lineCount.textContent = `Lines: ${lines}`;
        if (fileSize) fileSize.textContent = `Size: ${size}`;
        
        this.updateLineNumbers(content);
    }

    updateLineNumbers(content) {
        const lineNumbersContainer = document.querySelector('.line-numbers');
        if (!lineNumbersContainer) return;
        
        const lines = content.split('\n').length;
        let lineNumbersHtml = '';
        
        for (let i = 1; i <= lines; i++) {
            lineNumbersHtml += `<span>${i}</span>`;
        }
        
        lineNumbersContainer.innerHTML = lineNumbersHtml;
    }

    setupTerminalSection() {
        console.log('Setting up terminal section...');
        const terminalBody = document.getElementById('mainTerminal');
        
        if (terminalBody) {
            terminalBody.innerHTML = `
                <div class="terminal-line">
                    <span class="prompt">anish@engineer:~/portfolio$</span>
                    <span class="command">whoami</span>
                </div>
                <div class="output">Computer Engineer</div>
                
                <div class="terminal-line">
                    <span class="prompt">anish@engineer:~/portfolio$</span>
                    <span class="command">cat profile.json</span>
                </div>
                <div class="output json-output">
                    <pre>{
  "name": "Anish Karki",
  "role": "Backend Developer || ML Engineer",
  "specialization": ["Existential Crisis Management"],
  "current_stack": {
    "languages": ["Python", "JavaScript", "C/C++"],
    "frameworks": ["Node.js", "Express.js"],
    "databases": ["PostgreSQL", "MySQL", "MongoDB"],
    "ml_tools": ["NumPy", "Pandas", "PyTorch", "TensorFlow", "Scikit-Learn"]
  },
  "bugs_created": "∞",
  "bugs_fixed": "∞ - 1",
  "coffee_consumption": "Lethal levels",
  "status": "(please hire me, I need therapy money)"
}</pre>
                </div>
                
                <div class="terminal-line">
                    <span class="prompt">anish@engineer:~/portfolio$</span>
                    <span class="command">systemctl status</span>
                </div>
                <div class="output services-output">
                    <div class="service-line">   Loaded: loaded (/etc/systemd/system/reality/)</div>
                    <div class="service-line">   Active: <span class="status-active">barely functioning</span> since birth</div>
                    <div class="service-line">   Memory: 32GB (31.9GB used by Chrome tabs)</div>
                </div>
                
                <div class="terminal-line active">
                    <span class="prompt">anish@engineer:~/portfolio$</span>
                    <span class="command">sudo rm -rf /life</span>
                    <span class="cursor-blink">_</span>
                </div>
            `;
        }
    }

    setupNavigation() {
        console.log('Setting up navigation...');
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Smooth scroll to section
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing portfolio...');
    try {
        window.portfolio = new BackendPortfolio();
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
});
