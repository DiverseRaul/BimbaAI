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
    
    // Studio elements
    const goToStudioBtn = document.getElementById('go-to-studio');
    const learnMoreBtn = document.getElementById('learn-more');
    const studioModeButtons = document.querySelectorAll('.studio-mode-btn');
    const studioPrompt = document.getElementById('studio-prompt');
    const generateBtn = document.getElementById('generate-btn');
    const studioOutput = document.getElementById('studio-output');
    const copyOutputBtn = document.getElementById('copy-output-btn');
    const downloadOutputBtn = document.getElementById('download-output-btn');
    const fileUpload = document.getElementById('file-upload');
    const fileName = document.getElementById('file-name');
    const modelSelect = document.getElementById('model-select');
    const temperatureSlider = document.getElementById('temperature-slider');
    const temperatureValue = document.getElementById('temperature-value');
    const modeSelect = document.getElementById('mode-select');
    
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
    const DEFAULT_THEME = 'dark';
    const DEFAULT_LANGUAGE = 'en';
    const API_KEY = 'AIzaSyAjr3Cw9ztcBtVM5Xs1d7txtrxL-qxIJyk';
    const NOTIFICATION_DURATION = 3000;
    
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
        
        // Set up AI Studio
        setupAIStudio();
        
        // Apply saved settings
        applyAllSavedSettings();
    }
    
    // Function to set up navigation
    function setupNavigation() {
        // Get DOM elements
        const navLinks = document.querySelectorAll('nav ul li a');
        const pageSections = document.querySelectorAll('.page-section');
        const goToStudioBtn = document.getElementById('go-to-studio');
        const learnMoreBtn = document.getElementById('learn-more');
        
        // Navigation
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Get the target section ID
                const targetId = this.getAttribute('href').substring(1);
                
                // Hide all sections
                pageSections.forEach(section => section.classList.remove('active'));
                
                // Show target section
                document.getElementById(targetId).classList.add('active');
            });
        });
        
        // Go to Studio button
        if (goToStudioBtn) {
            goToStudioBtn.addEventListener('click', function() {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to AI Studio link
                document.querySelector('nav ul li a[href="#ai-studio"]').classList.add('active');
                
                // Hide all sections
                pageSections.forEach(section => section.classList.remove('active'));
                
                // Show AI Studio section
                document.getElementById('ai-studio').classList.add('active');
            });
        }
        
        // Add click event listener to "Learn More" button
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', function() {
                // Scroll to features section
                const featuresSection = document.getElementById('features');
                if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: 'smooth' });
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
                showNotification('Font size decreased!');
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
                showNotification('Font size increased!');
            }
        });
    }
    
    // Function to set up language selector
    function setupLanguageSelector() {
        // Add change event listener to language selector
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            localStorage.setItem('language', selectedLanguage);
            
            // Show notification
            if (getSettingValue('notifications')) {
                showNotification(`Language changed to ${getLanguageName(selectedLanguage)}!`);
            }
        });
    }
    
    // Function to set up animations toggle
    function setupAnimationsToggle() {
        // Add change event listener to animations toggle
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
                showNotification(`Animations ${animationsEnabled ? 'enabled' : 'disabled'}!`);
            }
        });
    }
    
    // Function to set up notifications toggle
    function setupNotificationsToggle() {
        // Add change event listener to notifications toggle
        notificationsToggle.addEventListener('change', function() {
            const notificationsEnabled = this.checked;
            localStorage.setItem('notifications', notificationsEnabled);
            
            // Show notification
            if (notificationsEnabled) {
                showNotification('Notifications enabled!');
            }
        });
    }
    
    // Function to set up reset settings button
    function setupResetSettings() {
        // Add click event listener to reset settings button
        resetSettingsBtn.addEventListener('click', function() {
            // Reset all settings to default
            localStorage.setItem('theme', DEFAULT_SETTINGS.theme);
            localStorage.setItem('fontSize', DEFAULT_SETTINGS.fontSize);
            localStorage.setItem('language', DEFAULT_SETTINGS.language);
            localStorage.setItem('animations', DEFAULT_SETTINGS.animations);
            localStorage.setItem('notifications', DEFAULT_SETTINGS.notifications);
            
            // Apply default settings
            applyAllSavedSettings();
            
            // Show notification
            if (getSettingValue('notifications')) {
                showNotification('Settings reset to default!');
            }
            
            // Close settings modal
            settingsModal.classList.remove('active');
        });
    }
    
    // Function to apply all saved settings
    function applyAllSavedSettings() {
        // Apply theme
        const savedTheme = getSettingValue('theme');
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
        
        // Apply font size
        const savedFontSize = getSettingValue('fontSize');
        document.documentElement.style.setProperty('--font-size-base', `${savedFontSize}px`);
        currentFontSizeEl.textContent = `${savedFontSize}px`;
        
        // Apply language
        const savedLanguage = getSettingValue('language');
        languageSelect.value = savedLanguage;
        
        // Apply animations
        const savedAnimations = getSettingValue('animations');
        animationsToggle.checked = savedAnimations;
        if (!savedAnimations) {
            document.body.classList.add('no-animations');
        } else {
            document.body.classList.remove('no-animations');
        }
        
        // Apply notifications
        const savedNotifications = getSettingValue('notifications');
        notificationsToggle.checked = savedNotifications;
    }
    
    // Function to get a setting value
    function getSettingValue(settingName) {
        switch (settingName) {
            case 'theme':
                return localStorage.getItem('theme') || DEFAULT_SETTINGS.theme;
            case 'fontSize':
                return parseInt(localStorage.getItem('fontSize')) || DEFAULT_SETTINGS.fontSize;
            case 'language':
                return localStorage.getItem('language') || DEFAULT_SETTINGS.language;
            case 'animations':
                return localStorage.getItem('animations') === null ? DEFAULT_SETTINGS.animations : localStorage.getItem('animations') === 'true';
            case 'notifications':
                return localStorage.getItem('notifications') === null ? DEFAULT_SETTINGS.notifications : localStorage.getItem('notifications') === 'true';
            default:
                return null;
        }
    }
    
    // Function to get language name from code
    function getLanguageName(code) {
        const languages = {
            'en': 'English',
            'es': 'Español',
            'fr': 'Français',
            'pt': 'Português'
        };
        
        return languages[code] || code;
    }
    
    // Function to show notification
    function showNotification(message, type = 'info') {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            
            const notificationContent = document.createElement('div');
            notificationContent.className = 'notification-content';
            
            const icon = document.createElement('i');
            icon.className = 'fas fa-info-circle';
            
            const text = document.createElement('span');
            
            notificationContent.appendChild(icon);
            notificationContent.appendChild(text);
            notification.appendChild(notificationContent);
            
            document.body.appendChild(notification);
        }
        
        // Update notification icon based on type
        const icon = notification.querySelector('.notification-content i');
        icon.className = type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-info-circle';
        icon.style.color = type === 'error' ? 'var(--error-color)' : 'var(--accent-color)';
        
        // Add type class to notification
        notification.className = 'notification';
        if (type === 'error') {
            notification.classList.add('error');
        }
        
        // Update notification message
        const text = notification.querySelector('.notification-content span');
        text.textContent = message;
        
        // Show notification
        notification.classList.add('active');
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('active');
        }, NOTIFICATION_DURATION);
    }
    
    // Function to set up AI Studio
    function setupAIStudio() {
        const STUDIO_MODE_BUTTONS = document.querySelectorAll('.studio-mode-btn');
        const MODE_SELECT = document.getElementById('mode-select');
        const FILE_UPLOAD_CONTAINER = document.querySelector('.file-upload-container');
        
        // Sync mode buttons with dropdown
        STUDIO_MODE_BUTTONS.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                STUDIO_MODE_BUTTONS.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Update mode select dropdown
                const mode = this.getAttribute('data-mode');
                MODE_SELECT.value = mode;
                
                // Update file upload visibility based on mode
                updateFileUploadVisibility(mode);
            });
        });
        
        // Sync dropdown with mode buttons
        if (MODE_SELECT) {
            MODE_SELECT.addEventListener('change', function() {
                const SELECTED_MODE = this.value;
                
                // Remove active class from all buttons
                STUDIO_MODE_BUTTONS.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to corresponding button
                const CORRESPONDING_BUTTON = document.querySelector(`.studio-mode-btn[data-mode="${SELECTED_MODE}"]`);
                if (CORRESPONDING_BUTTON) {
                    CORRESPONDING_BUTTON.classList.add('active');
                }
                
                // Update file upload visibility based on mode
                updateFileUploadVisibility(SELECTED_MODE);
            });
        }
        
        // Function to update file upload visibility
        function updateFileUploadVisibility(mode) {
            if (FILE_UPLOAD_CONTAINER) {
                if (mode === 'image') {
                    FILE_UPLOAD_CONTAINER.style.display = 'flex';
                } else {
                    FILE_UPLOAD_CONTAINER.style.display = 'none';
                }
            }
        }
        
        // Initialize file upload visibility
        const INITIAL_MODE = MODE_SELECT ? MODE_SELECT.value : 'code';
        updateFileUploadVisibility(INITIAL_MODE);
        
        // Set up file upload
        if (fileUpload) {
            fileUpload.addEventListener('change', function() {
                if (this.files.length > 0) {
                    fileName.textContent = this.files[0].name;
                } else {
                    fileName.textContent = '';
                }
            });
        }
        
        // Set up temperature slider
        if (temperatureSlider) {
            temperatureValue.textContent = temperatureSlider.value;
            
            temperatureSlider.addEventListener('input', function() {
                temperatureValue.textContent = this.value;
            });
        }
        
        // Set up generate button
        if (generateBtn) {
            generateBtn.addEventListener('click', function() {
                generateGeminiResponse();
            });
        }
        
        // Set up copy output button
        if (copyOutputBtn) {
            copyOutputBtn.addEventListener('click', function() {
                copyOutputToClipboard();
            });
        }
        
        // Set up download output button
        if (downloadOutputBtn) {
            downloadOutputBtn.addEventListener('click', function() {
                downloadOutput();
            });
        }
    }
    
    // Function to update prompt placeholder based on mode
    function updatePromptPlaceholder(mode) {
        if (!studioPrompt) return;
        
        switch (mode) {
            case 'code':
                studioPrompt.placeholder = 'Describe the code you want Gemini to generate...';
                break;
            case 'content':
                studioPrompt.placeholder = 'Describe the content you want Gemini to create...';
                break;
            case 'image':
                studioPrompt.placeholder = 'Describe what you want Gemini to analyze in your image...';
                break;
            case 'assistant':
                studioPrompt.placeholder = 'Ask Gemini anything...';
                break;
            default:
                studioPrompt.placeholder = 'Describe what you want Gemini to generate or help with...';
        }
    }
    
    // Function to update model options based on mode
    function updateModelOptions(mode) {
        if (!modelSelect) return;
        
        // Clear existing options
        modelSelect.innerHTML = '';
        
        // Add options based on mode
        if (mode === 'image') {
            // For image mode, only Gemini Pro Vision is available
            const option = document.createElement('option');
            option.value = 'gemini-pro-vision';
            option.textContent = 'Gemini Pro Vision';
            modelSelect.appendChild(option);
        } else {
            // For other modes, both models are available
            const option1 = document.createElement('option');
            option1.value = 'gemini-pro';
            option1.textContent = 'Gemini Pro';
            modelSelect.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = 'gemini-pro-vision';
            option2.textContent = 'Gemini Pro Vision';
            modelSelect.appendChild(option2);
        }
    }
    
    // Function to generate Gemini response
    function generateGeminiResponse() {
        const apiKey = document.getElementById('api-key').value;
        const mode = modeSelect.value;
        const model = modelSelect.value;
        const temperature = parseFloat(temperatureSlider.value);
        const prompt = studioPrompt.value;
        
        // Check if API key is provided
        if (!apiKey) {
            showNotification('Please enter your Gemini API key', 'error');
            return;
        }
        
        // Check if prompt is provided
        if (!prompt) {
            showNotification('Please enter a prompt', 'error');
            return;
        }
        
        // Show loading animation on button
        const generateBtn = document.getElementById('generate-btn');
        generateBtn.classList.add('loading');
        
        // Show loading animation in output
        studioOutput.innerHTML = `
            <div class="loading-animation">
                <div class="pulse"></div>
                <div class="spinner"></div>
                <p>Generating your response</p>
                <div class="loading-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        `;
        
        // Prepare request data
        let requestData = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature: temperature
            }
        };
        
        // If image is uploaded and model supports vision
        if (fileUpload && fileUpload.files.length > 0 && model === 'gemini-pro-vision') {
            const file = fileUpload.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const base64Data = e.target.result.split(',')[1];
                
                // Add image to request
                requestData.contents[0].parts = [
                    { text: prompt },
                    { 
                        inline_data: {
                            mime_type: file.type,
                            data: base64Data
                        }
                    }
                ];
                
                // Make API request
                makeGeminiRequest(apiKey, model, requestData, mode, generateBtn);
            };
            
            reader.readAsDataURL(file);
        } else {
            // Make API request without image
            makeGeminiRequest(apiKey, model, requestData, mode, generateBtn);
        }
    }
    
    // Function to make Gemini API request
    function makeGeminiRequest(apiKey, model, requestData, mode, generateBtn) {
        // Determine API endpoint based on model
        let apiUrl;
        if (model === 'gemini-pro') {
            apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;
        } else if (model === 'gemini-pro-vision') {
            apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateContent?key=${apiKey}`;
        } else {
            showNotification('Invalid model selected', 'error');
            generateBtn.classList.remove('loading');
            return;
        }
        
        // Make API request
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Remove loading state
            generateBtn.classList.remove('loading');
            
            // Process response
            if (data.candidates && data.candidates.length > 0 && 
                data.candidates[0].content && 
                data.candidates[0].content.parts && 
                data.candidates[0].content.parts.length > 0) {
                
                const responseText = data.candidates[0].content.parts[0].text;
                
                // Display response
                studioOutput.innerHTML = formatResponse(responseText, mode);
                
                // Show notification
                showNotification('Response generated successfully!');
            } else {
                throw new Error('Invalid response format from Gemini API');
            }
        })
        .catch(error => {
            // Remove loading state
            generateBtn.classList.remove('loading');
            
            console.error('Error calling Gemini API:', error);
            studioOutput.innerHTML = `<div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>Error generating response: ${error.message}</p>
            </div>`;
            showNotification('Error generating response', 'error');
        });
    }
    
    // Function to format response based on mode
    function formatResponse(response, mode) {
        if (mode === 'code') {
            // Format code with syntax highlighting (in a real app, you might use a library like Prism.js)
            return `<pre><code>${response}</code></pre>`;
        } else {
            // Format other responses as markdown (in a real app, you might use a library like Marked.js)
            return response.replace(/\n/g, '<br>').replace(/^# (.*?)$/gm, '<h1>$1</h1>').replace(/^## (.*?)$/gm, '<h2>$1</h2>').replace(/^### (.*?)$/gm, '<h3>$1</h3>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/- (.*?)$/gm, '• $1');
        }
    }
    
    // Function to copy output to clipboard
    function copyOutputToClipboard() {
        if (!studioOutput) return;
        
        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.value = studioOutput.textContent;
        document.body.appendChild(textarea);
        
        // Select and copy the text
        textarea.select();
        document.execCommand('copy');
        
        // Remove the temporary textarea
        document.body.removeChild(textarea);
        
        // Show notification
        showNotification('Output copied to clipboard!');
    }
    
    // Function to download output
    function downloadOutput() {
        if (!studioOutput) return;
        
        // Get the output text
        const text = studioOutput.textContent;
        
        // Create a Blob containing the text
        const blob = new Blob([text], { type: 'text/plain' });
        
        // Create a download link
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'gemini-output.txt';
        
        // Trigger the download
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
        
        // Show notification
        showNotification('Output downloaded!');
    }
    
    // Add notification styles dynamically
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--bg-secondary);
            border-left: 4px solid var(--accent-color);
            border-radius: 8px;
            padding: 0;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            transform: translateX(120%);
            transition: transform 0.3s var(--transition-bounce);
            max-width: 300px;
            overflow: hidden;
        }
        
        .notification.error {
            border-left-color: var(--error-color);
        }
        
        .notification.active {
            transform: translateX(0);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            padding: 12px 16px;
        }
        
        .notification-content i {
            color: var(--accent-color);
            font-size: 1.2rem;
            margin-right: 12px;
        }
        
        .notification-content span {
            color: var(--text-primary);
            font-size: 0.9rem;
        }
        
        .loading-indicator {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 200px;
            color: var(--text-secondary);
        }
        
        .loading-indicator i {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: var(--accent-color);
        }
        
        .error-message {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 200px;
            color: var(--error-color);
            text-align: center;
            padding: 0 2rem;
        }
        
        .error-message i {
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        
        .no-animations * {
            transition: none !important;
            animation: none !important;
        }
        
        .loading-animation {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 200px;
        }
        
        .pulse {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: var(--accent-color);
            animation: pulse 1.5s infinite;
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 4px solid var(--accent-color);
            border-top-color: transparent;
            animation: spinner 1.5s linear infinite;
        }
        
        .loading-dots {
            display: flex;
            justify-content: space-between;
            width: 40px;
            margin-top: 1rem;
        }
        
        .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: var(--accent-color);
            animation: dot 1.5s infinite;
        }
        
        .dot:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .dot:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }
        
        @keyframes spinner {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        
        @keyframes dot {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
            100% {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(notificationStyles);
});
