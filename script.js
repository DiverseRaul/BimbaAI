// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navLinks = document.querySelectorAll('nav ul li a');
    const pageSections = document.querySelectorAll('.page-section');
    
    // Settings elements
    const openSettingsBtn = document.getElementById('open-settings');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsBtn = document.getElementById('close-settings');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const decreaseFontBtn = document.getElementById('decrease-font');
    const increaseFontBtn = document.getElementById('increase-font');
    const currentFontSizeEl = document.getElementById('current-font-size');
    const languageSelect = document.getElementById('language-select');
    const animationsToggle = document.getElementById('animations-toggle');
    const notificationsToggle = document.getElementById('notifications-toggle');
    const resetSettingsBtn = document.getElementById('reset-settings');
    
    // Code generator elements
    const goToGeneratorBtn = document.getElementById('go-to-generator');
    const codePrompt = document.getElementById('code-prompt');
    const generateCodeBtn = document.getElementById('generate-code-btn');
    const codeOutput = document.getElementById('code-output');
    const copyCodeBtn = document.getElementById('copy-code-btn');
    
    // CONSTANTS
    const MIN_FONT_SIZE = 12;
    const MAX_FONT_SIZE = 24;
    const FONT_SIZE_STEP = 2;
    const DEFAULT_SETTINGS = {
        theme: 'dark',
        fontSize: 16,
        language: 'en',
        animations: true,
        notifications: true
    };
    
    // Initialize the application
    initApp();
    
    // Function to initialize the application
    function initApp() {
        // Set up navigation
        setupNavigation();
        
        // Set up settings modal
        setupSettingsModal();
        
        // Set up theme toggle
        setupThemeToggle();
        
        // Set up font size controls
        setupFontSizeControls();
        
        // Set up language selector
        setupLanguageSelector();
        
        // Set up animations toggle
        setupAnimationsToggle();
        
        // Set up notifications toggle
        setupNotificationsToggle();
        
        // Set up reset settings button
        setupResetSettings();
        
        // Set up code generator
        setupCodeGenerator();
        
        // Apply saved settings
        applyAllSavedSettings();
    }
    
    // Function to set up navigation
    function setupNavigation() {
        // Add click event listeners to navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the target section ID
                const targetId = this.getAttribute('href').substring(1);
                
                // Remove active class from all links and sections
                navLinks.forEach(link => link.classList.remove('active'));
                pageSections.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked link and target section
                this.classList.add('active');
                document.getElementById(targetId).classList.add('active');
            });
        });
        
        // Add click event listener to "Try Code Generator" button
        if (goToGeneratorBtn) {
            goToGeneratorBtn.addEventListener('click', function() {
                // Remove active class from all links and sections
                navLinks.forEach(link => link.classList.remove('active'));
                pageSections.forEach(section => section.classList.remove('active'));
                
                // Add active class to code generator link and section
                const codeGeneratorLink = document.querySelector('nav ul li a[href="#code-generator"]');
                if (codeGeneratorLink) {
                    codeGeneratorLink.classList.add('active');
                }
                
                const codeGeneratorSection = document.getElementById('code-generator');
                if (codeGeneratorSection) {
                    codeGeneratorSection.classList.add('active');
                }
            });
        }
    }
    
    // Function to set up settings modal
    function setupSettingsModal() {
        // Open settings modal
        openSettingsBtn.addEventListener('click', function() {
            settingsModal.classList.add('active');
            
            // Add entrance animation to settings items
            const settingsItems = document.querySelectorAll('.settings-item');
            settingsItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 50);
                }, index * 50);
            });
        });
        
        // Close settings modal
        closeSettingsBtn.addEventListener('click', function() {
            settingsModal.classList.remove('active');
        });
        
        // Close settings modal when clicking outside
        settingsModal.addEventListener('click', function(e) {
            if (e.target === settingsModal) {
                settingsModal.classList.remove('active');
            }
        });
        
        // Close settings modal when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && settingsModal.classList.contains('active')) {
                settingsModal.classList.remove('active');
            }
        });
    }
    
    // Function to set up theme toggle
    function setupThemeToggle() {
        // Add click event listener to theme toggle button
        themeToggle.addEventListener('click', function() {
            // Toggle between dark and light mode
            if (document.body.classList.contains('dark-mode')) {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            }
            
            // Show notification
            if (getSettingValue('notifications')) {
                showNotification('Theme changed successfully!');
            }
        });
    }
    
    // Function to set up font size controls
    function setupFontSizeControls() {
        // Update current font size display
        function updateFontSizeDisplay() {
            const currentSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--font-size-base'));
            currentFontSizeEl.textContent = `${currentSize}px`;
        }
        
        // Initialize font size display
        updateFontSizeDisplay();
        
        // Add click event listener to decrease font size button
        decreaseFontBtn.addEventListener('click', function() {
            const currentSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--font-size-base'));
            const newSize = Math.max(currentSize - FONT_SIZE_STEP, MIN_FONT_SIZE);
            document.documentElement.style.setProperty('--font-size-base', `${newSize}px`);
            localStorage.setItem('fontSize', newSize);
            updateFontSizeDisplay();
            
            // Show notification
            if (getSettingValue('notifications')) {
                showNotification('Font size decreased');
            }
        });
        
        // Add click event listener to increase font size button
        increaseFontBtn.addEventListener('click', function() {
            const currentSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--font-size-base'));
            const newSize = Math.min(currentSize + FONT_SIZE_STEP, MAX_FONT_SIZE);
            document.documentElement.style.setProperty('--font-size-base', `${newSize}px`);
            localStorage.setItem('fontSize', newSize);
            updateFontSizeDisplay();
            
            // Show notification
            if (getSettingValue('notifications')) {
                showNotification('Font size increased');
            }
        });
    }
    
    // Function to set up language selector
    function setupLanguageSelector() {
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            localStorage.setItem('language', selectedLanguage);
            
            // In a real app, this would load language files and update the UI
            // For now, just show a notification
            if (getSettingValue('notifications')) {
                showNotification(`Language changed to ${getLanguageName(selectedLanguage)}`);
            }
        });
    }
    
    // Function to set up animations toggle
    function setupAnimationsToggle() {
        animationsToggle.addEventListener('change', function() {
            const animationsEnabled = this.checked;
            localStorage.setItem('animations', animationsEnabled);
            
            // Toggle animations class on body
            if (animationsEnabled) {
                document.body.classList.remove('no-animations');
            } else {
                document.body.classList.add('no-animations');
            }
            
            // Show notification
            if (getSettingValue('notifications')) {
                showNotification(`Animations ${animationsEnabled ? 'enabled' : 'disabled'}`);
            }
        });
    }
    
    // Function to set up notifications toggle
    function setupNotificationsToggle() {
        notificationsToggle.addEventListener('change', function() {
            const notificationsEnabled = this.checked;
            localStorage.setItem('notifications', notificationsEnabled);
            
            // Show notification if enabled
            if (notificationsEnabled) {
                showNotification('Notifications enabled');
            }
        });
    }
    
    // Function to set up reset settings button
    function setupResetSettings() {
        resetSettingsBtn.addEventListener('click', function() {
            // Reset all settings to default
            localStorage.setItem('theme', DEFAULT_SETTINGS.theme);
            localStorage.setItem('fontSize', DEFAULT_SETTINGS.fontSize);
            localStorage.setItem('language', DEFAULT_SETTINGS.language);
            localStorage.setItem('animations', DEFAULT_SETTINGS.animations);
            localStorage.setItem('notifications', DEFAULT_SETTINGS.notifications);
            
            // Apply reset settings
            applyAllSavedSettings();
            
            // Show notification
            showNotification('Settings reset to default');
            
            // Add rotation animation to button
            this.querySelector('i').style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            this.querySelector('i').style.transform = 'rotate(-360deg)';
            
            // Reset rotation after animation
            setTimeout(() => {
                this.querySelector('i').style.transform = 'rotate(0)';
            }, 500);
        });
    }
    
    // Function to apply all saved settings
    function applyAllSavedSettings() {
        // Apply saved theme
        const savedTheme = localStorage.getItem('theme') || DEFAULT_SETTINGS.theme;
        if (savedTheme === 'light') {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        
        // Apply saved font size
        const savedFontSize = localStorage.getItem('fontSize') || DEFAULT_SETTINGS.fontSize;
        document.documentElement.style.setProperty('--font-size-base', `${savedFontSize}px`);
        if (currentFontSizeEl) {
            currentFontSizeEl.textContent = `${savedFontSize}px`;
        }
        
        // Apply saved language
        const savedLanguage = localStorage.getItem('language') || DEFAULT_SETTINGS.language;
        if (languageSelect) {
            languageSelect.value = savedLanguage;
        }
        
        // Apply saved animations setting
        const savedAnimations = localStorage.getItem('animations') !== null ? 
            localStorage.getItem('animations') === 'true' : 
            DEFAULT_SETTINGS.animations;
        if (animationsToggle) {
            animationsToggle.checked = savedAnimations;
        }
        if (!savedAnimations) {
            document.body.classList.add('no-animations');
        } else {
            document.body.classList.remove('no-animations');
        }
        
        // Apply saved notifications setting
        const savedNotifications = localStorage.getItem('notifications') !== null ? 
            localStorage.getItem('notifications') === 'true' : 
            DEFAULT_SETTINGS.notifications;
        if (notificationsToggle) {
            notificationsToggle.checked = savedNotifications;
        }
    }
    
    // Function to get a setting value
    function getSettingValue(settingName) {
        const value = localStorage.getItem(settingName);
        
        if (value === null) {
            return DEFAULT_SETTINGS[settingName];
        }
        
        if (value === 'true' || value === 'false') {
            return value === 'true';
        }
        
        return value;
    }
    
    // Function to get language name from code
    function getLanguageName(code) {
        const languages = {
            'en': 'English',
            'es': 'Spanish',
            'fr': 'French',
            'pt': 'Portuguese'
        };
        
        return languages[code] || code;
    }
    
    // Function to show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-info-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add notification to body
        document.body.appendChild(notification);
        
        // Add active class after a small delay (for animation)
        setTimeout(() => {
            notification.classList.add('active');
        }, 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('active');
            
            // Remove from DOM after animation completes
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Function to set up code generator
    function setupCodeGenerator() {
        // Add click event listener to generate code button
        generateCodeBtn.addEventListener('click', function() {
            const prompt = codePrompt.value.trim();
            
            if (prompt === '') {
                // Show error if prompt is empty
                codeOutput.textContent = '// Please enter a prompt to generate code';
                return;
            }
            
            // Show loading message
            codeOutput.textContent = '// Generating code...';
            
            // Detect language from prompt (in a real app, this would be more sophisticated)
            const detectedLanguage = detectLanguageFromPrompt(prompt);
            
            // Simulate code generation (in a real app, this would call an API)
            setTimeout(() => {
                // For now, just acknowledge the prompt
                codeOutput.textContent = `// Your request for ${detectedLanguage} code has been received\n// Prompt: "${prompt}"\n\n// Code generation is simplified in this version`;
                
                // Show notification
                if (getSettingValue('notifications')) {
                    showNotification('Code generated successfully!');
                }
            }, 1000);
        });
        
        // Add click event listener to copy code button
        copyCodeBtn.addEventListener('click', function() {
            const codeText = codeOutput.textContent;
            
            // Copy code to clipboard
            navigator.clipboard.writeText(codeText)
                .then(() => {
                    // Show success message
                    const originalIcon = copyCodeBtn.innerHTML;
                    copyCodeBtn.innerHTML = '<i class="fas fa-check"></i>';
                    
                    // Reset icon after 2 seconds
                    setTimeout(() => {
                        copyCodeBtn.innerHTML = originalIcon;
                    }, 2000);
                    
                    // Show notification
                    if (getSettingValue('notifications')) {
                        showNotification('Code copied to clipboard!');
                    }
                })
                .catch(err => {
                    console.error('Failed to copy code: ', err);
                    
                    // Show notification
                    if (getSettingValue('notifications')) {
                        showNotification('Failed to copy code');
                    }
                });
        });
    }
    
    // Helper function to detect language from prompt
    function detectLanguageFromPrompt(prompt) {
        // Simple language detection based on keywords
        // In a real app, this would be more sophisticated
        const promptLower = prompt.toLowerCase();
        
        if (promptLower.includes('javascript') || promptLower.includes('js') || 
            promptLower.includes('node') || promptLower.includes('react')) {
            return 'JavaScript';
        } else if (promptLower.includes('python') || promptLower.includes('django') || 
                   promptLower.includes('flask') || promptLower.includes('numpy')) {
            return 'Python';
        } else if (promptLower.includes('html') || promptLower.includes('webpage') || 
                   promptLower.includes('website')) {
            return 'HTML';
        } else if (promptLower.includes('css') || promptLower.includes('style') || 
                   promptLower.includes('animation')) {
            return 'CSS';
        } else if (promptLower.includes('java') || promptLower.includes('spring') || 
                   promptLower.includes('android')) {
            return 'Java';
        } else if (promptLower.includes('c#') || promptLower.includes('csharp') || 
                   promptLower.includes('.net') || promptLower.includes('unity')) {
            return 'C#';
        } else if (promptLower.includes('php') || promptLower.includes('laravel') || 
                   promptLower.includes('wordpress')) {
            return 'PHP';
        } else if (promptLower.includes('ruby') || promptLower.includes('rails')) {
            return 'Ruby';
        } else if (promptLower.includes('go') || promptLower.includes('golang')) {
            return 'Go';
        } else if (promptLower.includes('rust')) {
            return 'Rust';
        } else if (promptLower.includes('swift') || promptLower.includes('ios')) {
            return 'Swift';
        } else if (promptLower.includes('kotlin') || promptLower.includes('android')) {
            return 'Kotlin';
        } else if (promptLower.includes('typescript') || promptLower.includes('ts')) {
            return 'TypeScript';
        } else {
            return 'code'; // Default if no specific language is detected
        }
    }
});
