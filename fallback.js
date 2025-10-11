// Simple fallback script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fallback script running...');
    
    // Basic about.json content fallback
    const codeContent = document.querySelector('.code-content');
    if (codeContent && !codeContent.innerHTML.trim()) {
        console.log('Populating fallback about.json content...');
        codeContent.innerHTML = `<pre><code class="json">{
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
}</code></pre>`;
    }
    
    // Basic terminal content fallback
    const terminalBody = document.getElementById('mainTerminal');
    if (terminalBody && !terminalBody.innerHTML.trim()) {
        console.log('Populating fallback terminal content...');
        terminalBody.innerHTML = `
            <div class="terminal-line">
                <span class="prompt">anish@engineer:~/portfolio$</span>
                <span class="command">whoami</span>
            </div>
            <div class="output">Backend Developer</div>
            
            <div class="terminal-line">
                <span class="prompt">anish@engineer:~/portfolio$</span>
                <span class="command">cat about.json</span>
            </div>
            <div class="output">Loading portfolio data...</div>
        `;
    }
});
