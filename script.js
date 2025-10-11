// Backend Portfolio JavaScript - Terminal & API Focused

class BackendPortfolio {
    constructor() {
        this.logSetIndex = 0;
        this.sqlSetIndex = 0;
        this.init();
    }

    init() {
        console.log('Initializing portfolio...');
        
        // Make sure body is scrollable
        document.body.style.overflow = 'auto';
        
        try {
            // Initialize all components
            console.log('Setting up navigation...');
            this.setupNavigation();
            
            console.log('Setting up terminal tabs...');
            this.setupTerminalTabs();
            
            console.log('Setting up about tabs...');
            this.setupAboutTabs();
            
            console.log('Setting up logs...');
            this.setupLogs();
            
            console.log('Setting up animations...');
            this.setupAnimations();
            
            console.log('Setting up random status...');
            this.setupRandomStatus();
            
            console.log('Initializing default content...');
            this.initializeDefaultContent();
            
            console.log('Portfolio initialization complete!');
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    }

    // Navigation Setup
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');

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
                    
                    // Setup about tabs when navigating to about section
                    if (targetId === 'about') {
                        setTimeout(() => {
                            this.setupAboutTabs();
                        }, 500);
                    }
                }

                // Terminal command simulation
                const cmd = link.getAttribute('data-cmd');
                if (cmd) {
                    this.executeTerminalCommand(cmd);
                }
            });
        });

        // Scroll spy for navigation
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }



    // Terminal Tabs Setup
    setupTerminalTabs() {
        const tabs = document.querySelectorAll('.terminal-tabs .tab');
        const terminalBody = document.getElementById('mainTerminal');

        // Initialize default content (bash tab)
        if (terminalBody) {
            const activeTab = document.querySelector('.terminal-tabs .tab.active');
            if (activeTab) {
                const defaultTabName = activeTab.textContent.trim();
                this.switchTabContent(defaultTabName, terminalBody);
            } else {
                // Fallback to bash if no active tab found
                this.showBashTerminal(terminalBody);
            }
        }

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.textContent.trim();
                
                // If clicking the same active tab, cycle through content
                if (tab.classList.contains('active')) {
                    if (tabName === 'api.log') {
                        this.cycleLogSet();
                        return;
                    } else if (tabName === 'db.sql') {
                        this.cycleSqlSet();
                        return;
                    }
                }
                
                // Use utility function for tab switching
                this.handleTabSwitch(tabs, tab, () => {
                    this.switchTabContent(tabName, terminalBody);
                });
            });
        });
    }

    // Switch tab content
    switchTabContent(tabName, terminalBody) {
        switch(tabName) {
            case 'api.log':
                this.showApiLogs(terminalBody);
                break;
            case 'db.sql':
                this.showDbSql(terminalBody);
                break;
            case 'bash':
            default:
                this.showBashTerminal(terminalBody);
                break;
        }
    }

    // Show API logs tab
    showApiLogs(terminalBody) {
        terminalBody.innerHTML = `
            ${this.getLogSet(this.logSetIndex)}
        `;
    }

    // Show database SQL tab
    showDbSql(terminalBody) {
        terminalBody.innerHTML = `
            ${this.getSqlSet(this.sqlSetIndex)}
        `;
    }

    // Show bash terminal tab
    showBashTerminal(terminalBody) {
        terminalBody.innerHTML = `
            ${this.generateTerminalLine('~/portfolio', '<span class="command typing" data-text="whoami">whoami</span>', 'Computer Engineer')}
            
            <div class="terminal-line">
                ${this.generatePrompt('~/portfolio')}
                <span class="command">cat profile.json</span>
            </div>
            <div class="output json-output">
                <pre id="profileJson">{
  "name": "Anish Karki",
  "role": "Backend Developer || ML Engineer",
  "specialization": ["Existential Crisis Management"],
  "current_stack": {
    "languages": ["Python", "JavaScript", "C/C++"],
    "frameworks": ["Node.js", "Express.js"],
    "databases": ["PostgreSQL", "MySQL", "MongoDB"],
    "ml_tools": ["Numpy","Pandas","PyTorch", "TensorFlow", "Scikit-Learn"]
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

    // Helper function to update line numbers
    updateLineNumbers(content, aboutSection) {
        const lineNumbersContainer = aboutSection.querySelector('.line-numbers');
        if (!lineNumbersContainer) return;
        
        const lines = content.split('\n').length;
        let lineNumbersHtml = '';
        
        for (let i = 1; i <= lines; i++) {
            lineNumbersHtml += `<span>${i}</span>`;
        }
        
        lineNumbersContainer.innerHTML = lineNumbersHtml;
    }

    // Setup About Section Editor Tabs
    setupAboutTabs() {
        const aboutSection = document.querySelector('#about');
        
        if (!aboutSection) {
            return false;
        }
        
        const editorTabs = aboutSection.querySelectorAll('.editor-tabs .tab');
        const codeContent = aboutSection.querySelector('.code-content');
        const lineCount = aboutSection.querySelector('.line-count');
        const fileSize = aboutSection.querySelector('.file-size');
        
        if (editorTabs.length === 0 || !codeContent) {
            return false;
        }

        // Content for each tab
        const tabContent = {
            'about.json': {
            content: `{
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
      "Model Deployment"
    ],

    "personal_interests": {
      "hobbies": ["Gym", "Coding", "Football", "Chess", "Guitar", "Anime"]
    },

    "fun_facts": {
      "debugging_style": "console.log everywhere",
      "favorite_error": "Works on my machine",
      "coffee_dependency": "Critical",
      "chatgpt_visits": "Daily",
      "deployment_time": "Always Friday 5PM"
    }
  }
}`,
            language: 'json',
            lines: 32,
            size: '2.1KB'
            },
            'skills.json': {
            content: `{
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
        "description": "Systems programming, algorithms, competitive programming",
        "use_cases": ["Data structures", "Performance-critical applications", "System-level programming"]
          },
          {
        "name": "JavaScript",
        "proficiency": "Experienced",
        "description": "Backend development, API integration",
        "runtime": ["Node.js"],
        "frameworks": ["Express.js"]
          },
        ],
        "backend_development": {
          "frameworks": [
        {
          "name": "Node.js",
          "description": "RESTful APIs, microservices"
        },
        {
          "name": "Express.js", 
          "description": "Web server development, API endpoints"
        }
          ]
        },
        "databases": {
          "relational": [
        {
          "name": "PostgreSQL",
          "use_cases": ["Complex queries", "Data integrity", "ACID compliance"]
        },
        {
          "name": "MySQL",
          "use_cases": ["Web applications", "Data storage", "Performance optimization"]
        }
          ],
          "nosql": [
        {
          "name": "MongoDB",
          "use_cases": ["Document storage", "Flexible schemas", "JSON-like data"]
        }
          ]
        },
        "machine_learning": {
          "libraries": [
        {
          "name": "NumPy",
          "description": "Numerical computing, array operations"
        },
        {
          "name": "Pandas", 
          "description": "Data manipulation, analysis, preprocessing"
        },
        {
          "name": "Matplotlib",
          "description": "Data visualization, plotting, charts"
        },
        {
          "name": "Scikit-Learn",
          "description": "Traditional ML algorithms, model training"
        },
        {
          "name": "PyTorch",
          "description": "Deep learning, neural networks, research"
        },
        {
          "name": "TensorFlow",
          "description": "Machine learning, production ML models"
        }
          ]
        }
      }
    }`,
            language: 'json',
            lines: 68,
            size: '2.8KB'
            },
            'experience.json': {
            content: `{
              "work_experience": [
                {
                  "own_projects": "Backend Developer",
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
                  "core_value_proposition": "Skilled coder with good humor "
                }
              ]
            }`,
            language: 'json',
            lines: 15,
            size: '1.2KB'
            }
        };

        // Setup editor tabs
        editorTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Use utility function for tab switching
                this.handleTabSwitch(editorTabs, tab, () => {
                    // Get tab content
                    const tabName = tab.textContent.trim();
                    const content = tabContent[tabName];
                    
                    if (content) {
                        try {
                            // Update content
                            codeContent.innerHTML = `<pre><code class="${content.language}">${content.content}</code></pre>`;
                            
                            // Update file info
                            if (lineCount) lineCount.textContent = `Lines: ${content.lines}`;
                            if (fileSize) fileSize.textContent = `Size: ${content.size}`;
                            
                            // Update line numbers
                            this.updateLineNumbers(content.content, aboutSection);
                        } catch (error) {
                            console.error('Error updating content:', error);
                        }
                    }
                }); // Close handleTabSwitch callback
            }); // Close addEventListener
        }); // Close forEach
        
        // Initialize default content and line numbers (about.json)
        const defaultContent = tabContent['about.json'];
        if (defaultContent && codeContent) {
            // Set initial content
            codeContent.innerHTML = `<pre><code class="${defaultContent.language}">${defaultContent.content}</code></pre>`;
            
            // Update file info
            if (lineCount) lineCount.textContent = `Lines: ${defaultContent.lines}`;
            if (fileSize) fileSize.textContent = `Size: ${defaultContent.size}`;
            
            // Update line numbers
            this.updateLineNumbers(defaultContent.content, aboutSection);
        }
        
        return true;
    }

    // Setup System Logs
    setupLogs() {
        const logContent = document.getElementById('logsContent');
        const logButtons = document.querySelectorAll('.log-btn');
        
        if (!logContent || logButtons.length === 0) {
            return;
        }
        
        const logData = {
            system: [
                { time: '14:32:15', level: 'info', message: 'Backend services initialized successfully' },
                { time: '14:32:18', level: 'success', message: 'Database connection established' },
                { time: '14:32:22', level: 'info', message: 'Portfolio application started on port 8080' },
                { time: '14:32:28', level: 'info', message: 'System monitoring enabled' },
                { time: '14:32:35', level: 'success', message: 'All services operational' }
            ],
            app: [
                { time: '14:30:45', level: 'info', message: 'User session created for portfolio visitor' },
                { time: '14:31:28', level: 'info', message: 'Project showcase data loaded' },
                { time: '14:32:01', level: 'info', message: 'Navigation interaction logged' },
                { time: '14:32:15', level: 'success', message: 'About section JSON parsed successfully' },
                { time: '14:32:22', level: 'info', message: 'Portfolio performance optimized' }
            ],
            error: [
                { time: '14:28:45', level: 'warning', message: 'Slow network response detected' },
                { time: '14:29:12', level: 'error', message: 'Failed to load external resource - retrying...' },
                { time: '14:30:33', level: 'warning', message: 'High CPU usage detected: 85%' },
                { time: '14:31:56', level: 'info', message: 'Portfolio optimization completed successfully' },
                { time: '14:32:18', level: 'warning', message: 'Memory usage approaching threshold' }
            ]
        };

        const displayLogs = (logType) => {
            const logs = logData[logType] || [];
            logContent.innerHTML = logs.map(log => 
                `<div class="log-entry">
                    <span class="log-timestamp">[${log.time}]</span>
                    <span class="log-level-${log.level}">[${log.level.toUpperCase()}]</span>
                    ${log.message}
                </div>`
            ).join('');
        };

        logButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Use utility function for button switching
                this.handleTabSwitch(logButtons, btn, () => {
                    const logType = btn.getAttribute('data-log');
                    displayLogs(logType);
                });
            });
        });

        // Initialize with system logs
        displayLogs('system');
    }



    // Setup Animations
    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe all major sections
        document.querySelectorAll('.api-card, .project-card, .metric-card').forEach(el => {
            observer.observe(el);
        });

        // Cursor animation for terminal prompts
        setInterval(() => {
            document.querySelectorAll('.cursor-blink').forEach(cursor => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            });
        }, 600);
    }

    // Get different log sets for variety
    getLogSet(index) {
        const logSets = [
            // Production Nightmare Unfolding
            `
            <div class="log-line error">
                <span class="log-timestamp">2024-10-11 14:57:01.000</span>
                <span class="log-level">[PANIC]</span>
                <span class="log-message">POST /api/v1/hotfix - 500 Internal Server Error | Fix broke more things | Classic Friday deployment</span>
            </div>
            <div class="log-line success">
                <span class="log-timestamp">2024-10-11 15:30:22.555</span>
                <span class="log-level">[RESOLVED]</span>
                <span class="log-message">GET /api/v1/rollback - 200 OK | Rollback #47 successful | Lesson learned: Never deploy on Friday</span>
            </div>
            <div class="log-line warning">
                <span class="log-timestamp">2024-10-11 15:35:01.337</span>
                <span class="log-level">[RETROSPECTIVE]</span>
                <span class="log-message">POST /api/v1/postmortem - 201 Created | Action items: 23 | Items actually implemented: TBD</span>
            </div>
   
            <div class="log-line error">
                <span class="log-timestamp">2024-10-11 10:30:45.123</span>
                <span class="log-level">[DEBUGGING]</span>
                <span class="log-message">GET /api/v1/bug-hunt - 404 Not Found | "It was working yesterday" - every developer ever</span>
            </div>
            <div class="log-line warning">
                <span class="log-timestamp">2024-10-11 13:00:00.000</span>
                <span class="log-level">[LUNCH]</span>
                <span class="log-message">GET /api/v1/lunch-break - 403 Forbidden | Lunch is for quitters | Survival mode: ACTIVATED</span>
            </div>
            <div class="log-line success">
                <span class="log-timestamp">2024-10-11 23:59:59.999</span>
                <span class="log-level">[EPIPHANY]</span>
                <span class="log-message">GET /api/v1/solution - 200 OK | Bug found: Missing semicolon | 8 hours well spent</span>
            </div>
                     <div class="terminal-line active">
                <span class="prompt">dev@chaos-server:/var/log$</span>
                <span class="command">grep "Friday" api.log | wc -l && echo "reasons to quit"</span>
                <span class="cursor-blink">_</span>
            </div>
            `
        ];
        return logSets[index % logSets.length];
    }

    // Get different SQL query sets
    getSqlSet(index) {
        const sqlSets = [
            // Current SQL queries (unchanged for now)
            `
            <div class="sql-query">
                <span class="prompt">postgres=#</span>
                <span class="command">SELECT * FROM developers WHERE sleep_hours > 4;</span>
            </div>
            <div class="sql-result">
                <div class="sql-info">(0 rows)</div>
            </div>
            <div class="sql-query">
                <span class="prompt">postgres=#</span>
                <span class="command">UPDATE developers SET coffee_level = 'CRITICAL' WHERE deadline = 'yesterday';</span>
            </div>
            <div class="sql-result">
                <div class="sql-info">UPDATE 42 rows affected. Caffeine dependency increasing exponentially.</div>
            </div>
            <div class="sql-query">
                <span class="prompt">postgres=#</span>
                <span class="command">SELECT COUNT(*) FROM bugs WHERE status = 'it_works_on_my_machine';</span>
            </div>
            <div class="sql-result">
                <div class="table-row header"> count </div>
                <div class="table-row">-------</div>
                <div class="table-row">   ∞</div>
            </div>
            <div class="sql-query">
                <span class="prompt">postgres=#</span>
                <span class="command">CREATE VIEW all_my_regrets AS SELECT * FROM career_decisions WHERE year >= 2020;</span>
            </div>
            <div class="sql-result">
                <div class="sql-info">VIEW created. Warning: May cause existential crisis when queried.</div>
            </div>
            <div class="terminal-line active">
                <span class="prompt">postgres=#</span>
                <span class="command">-- ROLLBACK; -- Save me from my own decisions</span>
                <span class="cursor-blink">_</span>
            </div>
            `
        ];
        return sqlSets[index % sqlSets.length];
    }

    // Generic cycle function to reduce duplication
    cycleContent(indexProperty, maxSets, tabDataAttr, showMethod) {
        this[indexProperty] = (this[indexProperty] + 1) % maxSets;
        const activeTab = document.querySelector(`.terminal-tab.active[data-tab="${tabDataAttr}"]`);
        if (activeTab) {
            const terminalBody = document.querySelector('.terminal-body');
            showMethod.call(this, terminalBody);
        }
    }

    // Cycle to next log set
    cycleLogSet() {
        this.cycleContent('logSetIndex', 3, 'api.log', this.showApiLogs);
    }

    // Cycle to next SQL set
    cycleSqlSet() {
        this.cycleContent('sqlSetIndex', 3, 'db.sql', this.showDbSql);
    }

    // Random status messages for dark humor
    getRandomStatus() {
        const statuses = [
            "API Online",
        ];
        return statuses[Math.floor(Math.random() * statuses.length)];
    }

    // Update status message randomly
    updateStatusMessage() {
        const statusText = document.querySelector('.status-text');
        if (statusText) {
            statusText.textContent = this.getRandomStatus();
        }
    }

    // Setup random status updates
    setupRandomStatus() {
        // Update status every 5 seconds with some random humor
        setInterval(() => {
            this.updateStatusMessage();
        }, 5000);
        
        // Initial update after a short delay
        setTimeout(() => {
            this.updateStatusMessage();
        }, 2000);
    }

    // Setup animations
    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe all major sections
        document.querySelectorAll('.api-card, .project-card, .metric-card').forEach(el => {
            observer.observe(el);
        });

        // Cursor animation for terminal prompts
        setInterval(() => {
            document.querySelectorAll('.cursor-blink').forEach(cursor => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            });
        }, 600);
    }

    // Utility function to handle tab switching (removes duplicated code)
    handleTabSwitch(tabs, activeTab, callback) {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        activeTab.classList.add('active');
        
        // Execute callback with tab data
        if (callback) callback(activeTab);
    }

    // Utility function to generate terminal prompt HTML (reduces duplication)
    generatePrompt(path = '~/portfolio') {
        return `<span class="prompt">anish@engineer:${path}$</span>`;
    }

    // Utility function to generate terminal line HTML
    generateTerminalLine(path, command, output = '') {
        return `
            <div class="terminal-line">
                ${this.generatePrompt(path)}
                <span class="command">${command}</span>
            </div>
            ${output ? `<div class="output">${output}</div>` : ''}
        `;
    }

    // Initialize default content after boot sequence
    initializeDefaultContent() {
        // Initialize terminal content
        const terminalBody = document.getElementById('mainTerminal');
        if (terminalBody) {
            this.showBashTerminal(terminalBody);
        }
        
        // Initialize about section content
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const codeContent = aboutSection.querySelector('.code-content');
            const lineCount = aboutSection.querySelector('.line-count');
            const fileSize = aboutSection.querySelector('.file-size');
            
            // Get about.json content from setupAboutTabs
            const aboutContent = {
                content: `{
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
}`,
                language: 'json',
                lines: 32,
                size: '2.1KB'
            };
            
            if (codeContent) {
                codeContent.innerHTML = `<pre><code class="${aboutContent.language}">${aboutContent.content}</code></pre>`;
                if (lineCount) lineCount.textContent = `Lines: ${aboutContent.lines}`;
                if (fileSize) fileSize.textContent = `Size: ${aboutContent.size}`;
                this.updateLineNumbers(aboutContent.content, aboutSection);
            }
        }
    }

}

// Initialize the portfolio when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded successfully');
    try {
        window.portfolio = new BackendPortfolio();
        console.log('Portfolio initialized successfully');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
});
