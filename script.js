// ==========================================
// Theme Management
// ==========================================
const themeSelect = document.getElementById('theme-select');
const root = document.documentElement;

// Initialize dropdown with saved theme
if (themeSelect) {
    const savedTheme = localStorage.getItem('rux-theme') || 'catppuccin';
    themeSelect.value = savedTheme;

    themeSelect.addEventListener('change', (e) => {
        const newTheme = e.target.value;
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('rux-theme', newTheme);
        
        // Sync badge colors if needed (purely visual touch)
        const pulse = document.querySelector('.badge');
        if(pulse) {
            pulse.style.borderColor = 'var(--string)';
            pulse.style.backgroundColor = 'rgba(166, 227, 161, 0.1)'; // Keeps the opacity soft
        }
    });
}

// ==========================================
// Mobile Menu Toggle
// ==========================================
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navbar = document.querySelector('.navbar');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navbar.classList.toggle('menu-open');
    });
}

// ==========================================
// Copy Install Code
// ==========================================
const copyBtn = document.getElementById('copyBtn');
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        const code = `git clone https://github.com/your-username/rux.git\ncd rux\ncargo install --path .`;
        navigator.clipboard.writeText(code).then(() => {
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
            copyBtn.style.backgroundColor = "var(--string)";
            copyBtn.style.color = "var(--bg)";
            copyBtn.style.borderColor = "var(--string)";
            
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
                copyBtn.style.backgroundColor = "var(--selection)";
                copyBtn.style.color = "var(--text)";
                copyBtn.style.borderColor = "var(--comment)";
            }, 2500);
        });
    });
}

// ==========================================
// Rux Terminal Typing Effect
// ==========================================
const typewriterElement = document.getElementById('typewriter');

if (typewriterElement) {
    // Exactly formatted Rust code matching Rux Syntax Highlighter
    const codeData =[
        { num: 1, content: `<span class="com">// Rux config initialization</span>` },
        { num: 2, content: `<span class="kw">use</span> <span class="type">rux::editor::Editor</span>;` },
        { num: 3, content: `` },
        { num: 4, content: `<span class="kw">fn</span> <span class="func">main</span>() {` },
        { num: 5, content: `    <span class="kw">let mut</span> app <span class="kw">=</span> <span class="type">Editor</span>::<span class="func">new</span>();` },
        { num: 6, content: `    ` },
        { num: 7, content: `    app.<span class="func">set_theme</span>(<span class="str">"Catppuccin"</span>);` },
        { num: 8, content: `    app.<span class="func">enable_lsp</span>(<span class="kw">true</span>);` },
        { num: 9, content: `    ` },
        { num: 10, content: `    <span class="macro">println!</span>(<span class="str">"Blazingly fast! 🚀"</span>);` },
        { num: 11, content: `    app.<span class="func">run</span>();` },
        { num: 12, content: `}` }
    ];

    let currentLineIndex = 0;
    
    // Clear the container
    typewriterElement.innerHTML = '';

    function renderLines() {
        let html = '';
        // Render completed lines
        for (let i = 0; i < currentLineIndex; i++) {
            html += `
                <div class="line">
                    <span class="line-num">${codeData[i].num}</span>
                    <span class="line-content">${codeData[i].content}</span>
                </div>`;
        }
        
        // Render current line with cursor
        if (currentLineIndex < codeData.length) {
            html += `
                <div class="line">
                    <span class="line-num">${codeData[currentLineIndex].num}</span>
                    <span class="line-content">${codeData[currentLineIndex].content}<span class="cursor"></span></span>
                </div>`;
        } else {
            // Render cursor on the last line after finishing
            html += `
                <div class="line">
                    <span class="line-num">${codeData[codeData.length - 1].num}</span>
                    <span class="line-content">${codeData[codeData.length - 1].content}<span class="cursor"></span></span>
                </div>`;
        }
        
        typewriterElement.innerHTML = html;
        
        if (currentLineIndex < codeData.length) {
            currentLineIndex++;
            // Typing speed logic
            setTimeout(renderLines, 300);
        }
    }

    // Start effect after 800ms
    setTimeout(renderLines, 800);
}