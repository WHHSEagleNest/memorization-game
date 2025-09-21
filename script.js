const { createApp, ref, computed } = Vue;

// Eye-friendly color palette for Gemini
const COLOR_PALETTE = [
  // Soft blues
  "#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5",
  // Gentle greens
  "#E8F5E9", "#C8E6C9", "#A5D6A7", "#81C784", "#66BB6A",
  // Warm neutrals
  "#F5F5F5", "#EEEEEE", "#E0E0E0", "#FBE9E7", "#FFCCBC",
  // Soft accents
  "#FFF3E0", "#FFECB3", "#FFE082", "#FFD54F", "#FFF9C4",
  // Muted colors
  "#EFEBE9", "#D7CCC8", "#BCAAA4", "#B2DFDB", "#80CBC4",
  // Pastels
  "#F8BBD0", "#F48FB1", "#F06292", "#E91E63", "#FFCDD2"
];

// Function to get a random color from our eye-friendly palette
function getRandomColor() {
  return COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
}

// Function to get a contrasting text color for background
function getContrastingTextColor(backgroundColor) {
  // Convert hex to RGB
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black or white based on luminance
  return luminance > 0.5 ? '#333333' : '#FFFFFF';
}

// Function to get a harmonious border color
function getHarmoniousBorderColor(backgroundColor) {
  // Convert hex to RGB
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Darken the color slightly for border
  return `rgb(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)})`;
}

// Updated Gemini prompt with color guidance
function generateGeminiPrompt() {
  return `
    Create a random website content layout with exactly 2 sections in JSON format.
    
    Return ONLY a JSON object with this structure:
    {
      "title": "Creative Website Title",
      "backgroundColor": "#hexcolor",
      "headerColor": "#hexcolor",
      "textColor": "#hexcolor",
      "footerText": "Footer text here",
      "footerColor": "#hexcolor",
      "footerTextColor": "#hexcolor",
      "sections": [
        {
          "heading": "Section 1 Heading",
          "content": "Paragraph text for section 1 (2-3 sentences max)",
          "headingColor": "#hexcolor",
          "backgroundColor": "#hexcolor",
          "textColor": "#hexcolor",
          "borderColor": "#hexcolor",
          "hasButton": true/false,
          "buttonText": "Button text" (if hasButton is true),
          "buttonColor": "#hexcolor" (if hasButton is true),
          "buttonTextColor": "#hexcolor" (if hasButton is true)
        },
        {
          "heading": "Section 2 Heading",
          "content": "Paragraph text for section 2 (2-3 sentences max)",
          "headingColor": "#hexcolor",
          "backgroundColor": "#hexcolor",
          "textColor": "#hexcolor",
          "borderColor": "#hexcolor",
          "hasButton": true/false,
          "buttonText": "Button text" (if hasButton is true),
          "buttonColor": "#hexcolor" (if hasButton is true),
          "buttonTextColor": "#hexcolor" (if hasButton is true)
        }
      ]
    }
    
    IMPORTANT COLOR GUIDELINES:
    - Use soft, eye-friendly colors from this palette: 
      Soft blues: #E3F2FD, #BBDEFB, #90CAF9, #64B5F6, #42A5F5
      Gentle greens: #E8F5E9, #C8E6C9, #A5D6A7, #81C784, #66BB6A
      Warm neutrals: #F5F5F5, #EEEEEE, #E0E0E0, #FBE9E7, #FFCCBC
      Soft accents: #FFF3E0, #FFECB3, #FFE082, #FFD54F, #FFF9C4
      Muted colors: #EFEBE9, #D7CCC8, #BCAAA4, #B2DFDB, #80CBC4
      Pastels: #F8BBD0, #F48FB1, #F06292, #E91E63, #FFCDD2
    
    - Ensure text colors have good contrast with their backgrounds
    - Use harmonious color combinations (analogous or complementary colors)
    - Avoid very bright or saturated colors that might strain the eyes
    - Make sure button text is readable against button background
    
    Make the content concise and easy to memorize.
    Topics can include: programming, technology, business, or science.
  `;
}

// Updated fallback content generator with eye-friendly colors
function getFallbackContent() {
  // Fallback content with exactly 2 sections
  const titles = [
    "Tech Innovation Hub",
    "Digital Creators Network",
    "Code Mastery Academy",
    "Future Technology Institute"
  ];
  
  const sectionTemplates = [
    {
      heading: "Advanced Programming",
      content: "Master efficient coding with expert-led workshops and hands-on projects that challenge your problem-solving skills.",
      hasButton: true,
      buttonText: "Learn More"
    },
    {
      heading: "AI Integration",
      content: "Learn to implement cutting-edge AI solutions into your applications with our comprehensive guide.",
      hasButton: false
    },
    {
      heading: "Cloud Deployment",
      content: "Discover best practices for deploying scalable applications across multiple cloud platforms efficiently.",
      hasButton: true,
      buttonText: "View Plans"
    },
    {
      heading: "Cybersecurity",
      content: "Protect applications from modern threats with security-focused development methodology.",
      hasButton: true,
      buttonText: "Get Protected"
    }
  ];
  
  // Select random title
  const randomTitle = titles[Math.floor(Math.random() * titles.length)];
  
  // Select 2 random sections
  const shuffledSections = [...sectionTemplates].sort(() => 0.5 - Math.random());
  const selectedSections = shuffledSections.slice(0, 2);
  
  // Generate harmonious colors
  const baseBgColor = getRandomColor();
  const headerColor = getRandomColor();
  const textColor = getContrastingTextColor(headerColor);
  
  // Add eye-friendly colors to sections
  const coloredSections = selectedSections.map((section, index) => {
    const bgColor = index === 0 ? 
      getRandomColor() : // First section gets a random color
      getRandomColor();  // Second section gets a different random color
    
    return {
      ...section,
      headingColor: getContrastingTextColor(bgColor),
      backgroundColor: bgColor,
      textColor: getContrastingTextColor(bgColor),
      borderColor: getHarmoniousBorderColor(bgColor),
      buttonColor: section.hasButton ? getRandomColor() : "#ffffff",
      buttonTextColor: section.hasButton ? getContrastingTextColor(getRandomColor()) : "#000000"
    };
  });
  
  return {
    title: randomTitle,
    backgroundColor: baseBgColor,
    headerColor: headerColor,
    textColor: textColor,
    footerText: "© 2023 Example Company. All rights reserved.",
    footerColor: getRandomColor(),
    footerTextColor: getContrastingTextColor(getRandomColor()),
    sections: coloredSections
  };
}

const app = createApp({
  setup() {
    const currentPage = ref('start');
    const timer = ref(10);
    const score = ref(0);
    const apiKey = ref('');
    const showApiKeyInput = ref(false);
    const websiteContent = ref(null);
    const userContent = ref({ 
      title: '', 
      backgroundColor: '#ffffff',
      headerColor: '#8B0000',
      textColor: '#ffffff',
      footerText: '',
      footerColor: '#8B0000',
      footerTextColor: '#ffffff',
      sections: [] 
    });
    const memorizationTime = ref(15);
    const showAboutModal = ref(false);
    const showSettingsModal = ref(false);
    
    const scoreMessage = computed(() => {
      if (score.value >= 90) return "Perfect memory! You remembered almost everything!";
      if (score.value >= 70) return "Great job! You remembered most of the details.";
      if (score.value >= 50) return "Good effort! With practice, you'll improve.";
      return "Keep practicing! Try to observe more details next time.";
    });

    function startGame() {
      // Always show API key dialog to choose between Gemini and fallback
      showApiKeyInput.value = true;
    }

    async function startWithApiKey() {
      if (apiKey.value) {
        showApiKeyInput.value = false;
        
        try {
          websiteContent.value = await generateContentWithGemini(apiKey.value);
          startMemorizationPhase();
        } catch (error) {
          console.error("Failed to generate content with Gemini:", error);
          // Fallback to randomized content
          websiteContent.value = getFallbackContent();
          startMemorizationPhase();
        }
      }
    }

    function useDefaultContent() {
      showApiKeyInput.value = false;
      // Use randomized fallback content
      websiteContent.value = getFallbackContent();
      startMemorizationPhase();
    }

    function startMemorizationPhase() {
      currentPage.value = 'memorization';
      timer.value = memorizationTime.value;
      
      // Start countdown
      const countdown = setInterval(() => {
        timer.value--;
        
        if (timer.value <= 0) {
          clearInterval(countdown);
          currentPage.value = 'recreation';
          // Initialize user content with empty fields
          userContent.value = {
            title: '',
            backgroundColor: '#ffffff',
            headerColor: '#8B0000',
            textColor: '#ffffff',
            footerText: '',
            footerColor: '#8B0000',
            footerTextColor: '#ffffff',
            sections: websiteContent.value.sections.map(section => ({
              heading: '',
              content: '',
              headingColor: '#000000',
              backgroundColor: '#ffffff',
              textColor: '#000000',
              borderColor: '#cccccc',
              hasButton: false,
              buttonText: '',
              buttonColor: '#8B0000',
              buttonTextColor: '#ffffff'
            }))
          };
        }
      }, 1000);
    }

    function calculateScore() {
      let totalElements = 7; // Title + 6 color fields
      let correctElements = 0;
      
      // Compare basic fields
      const fieldsToCompare = ['title', 'backgroundColor', 'headerColor', 'textColor', 
                              'footerText', 'footerColor', 'footerTextColor'];
      
      fieldsToCompare.forEach(field => {
        if (userContent.value[field].toLowerCase().trim() === 
            websiteContent.value[field].toLowerCase().trim()) {
          correctElements++;
        }
      });
      
      // Compare sections (only 2 sections now)
      websiteContent.value.sections.forEach((section, index) => {
        if (userContent.value.sections[index]) {
          const userSection = userContent.value.sections[index];
          
          // Compare section fields
          const sectionFields = ['heading', 'content', 'headingColor', 'backgroundColor', 
                                'textColor', 'borderColor', 'hasButton'];
          
          sectionFields.forEach(field => {
            if (userSection[field].toString().toLowerCase().trim() === 
                section[field].toString().toLowerCase().trim()) {
              correctElements++;
              totalElements++;
            }
          });
          
          // Compare button fields if button exists
          if (section.hasButton) {
            const buttonFields = ['buttonText', 'buttonColor', 'buttonTextColor'];
            buttonFields.forEach(field => {
              if (userSection[field].toLowerCase().trim() === 
                  section[field].toLowerCase().trim()) {
                correctElements++;
                totalElements++;
              }
            });
          }
        }
      });
      
      score.value = Math.round((correctElements / totalElements) * 100);
      currentPage.value = 'score';
    }

    function restartGame() {
      currentPage.value = 'start';
      score.value = 0;
      websiteContent.value = null;
      userContent.value = { 
        title: '', 
        backgroundColor: '#ffffff',
        headerColor: '#8B0000',
        textColor: '#ffffff',
        footerText: '',
        footerColor: '#8B0000',
        footerTextColor: '#ffffff',
        sections: [] 
      };
    }

    function showAbout() {
      showAboutModal.value = true;
    }

    function showSettings() {
      showSettingsModal.value = true;
    }

    return {
      currentPage,
      timer,
      score,
      apiKey,
      memorizationTime,
      showApiKeyInput,
      showAboutModal,
      showSettingsModal,
      websiteContent,
      userContent,
      scoreMessage,
      startGame,
      startWithApiKey,
      useDefaultContent,
      calculateScore,
      restartGame,
      showAbout,
      showSettings
    };
  }
});

app.mount('#app');