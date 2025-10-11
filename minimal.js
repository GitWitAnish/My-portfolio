console.log('MINIMAL SCRIPT LOADED SUCCESSFULLY');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - minimal script');
    
    // Test basic functionality
    const aboutSection = document.querySelector('#about');
    const codeContent = document.querySelector('.code-content');
    
    console.log('About section found:', !!aboutSection);
    console.log('Code content found:', !!codeContent);
    
    if (codeContent) {
        codeContent.innerHTML = '<pre><code>{"test": "JAVASCRIPT IS WORKING"}</code></pre>';
        console.log('Content set successfully');
    }
});
