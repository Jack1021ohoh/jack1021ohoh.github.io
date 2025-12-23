# Liang-Jie Chiu - Portfolio Website

A modern, responsive portfolio website showcasing my work in Data Science and Machine Learning.

## Features

- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Project Showcase**: Detailed presentation of 6 featured projects
- **Skills Section**: Comprehensive display of technical skills and technologies
- **Contact Form**: Interactive form for visitors to get in touch
- **Smooth Scrolling**: Enhanced navigation experience
- **Mobile Menu**: Hamburger menu for mobile devices

## Structure

```
portfolio-website/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling and responsive design
├── js/
│   └── script.js       # Interactive features and animations
├── images/             # Project screenshots and assets (optional)
└── README.md          # This file
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, animations
- **JavaScript (Vanilla)**: Interactive features, form handling, scroll effects
- **Font Awesome**: Icons for social links and sections

## Sections

1. **Hero Section**: Eye-catching introduction with name and tagline
2. **About Me**: Background, education, and experience
3. **Projects**: 6 featured projects with descriptions, technologies, and links
4. **Skills**: Technical skills organized by category
5. **Contact**: Contact information and form

## Getting Started

### Local Development

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! No build process required.

### Deployment Options

#### Option 1: GitHub Pages (Recommended)

1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select the main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

#### Option 2: Netlify

1. Go to [Netlify](https://www.netlify.com/)
2. Drag and drop the `portfolio-website` folder
3. Your site will be live instantly with a custom URL

#### Option 3: Vercel

1. Go to [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. Deploy with one click

## Customization

### Adding Projects

Edit the projects section in `index.html`:

```html
<div class="project-card">
    <div class="project-header">
        <i class="fas fa-icon project-icon"></i>
        <span class="project-badge">Badge Text</span>
    </div>
    <h3>Project Title</h3>
    <p class="project-description">Description...</p>
    <!-- Add highlights, tags, and links -->
</div>
```

### Updating Skills

Modify the skills section in `index.html` by adding or removing skill items:

```html
<span class="skill-item">New Skill</span>
```

### Changing Colors

Update CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #7c3aed;
    /* Modify these to change the color scheme */
}
```

### Contact Form Integration

The contact form currently shows a demo message. To make it functional, you need to:

1. **Option 1: Use a form service** like Formspree, EmailJS, or Web3Forms
2. **Option 2: Build a backend API** to handle form submissions
3. **Option 3: Use a serverless function** (Netlify Functions, Vercel Functions)

Example with Formspree:

```javascript
// In js/script.js, replace the form submission code with:
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
});
```

## Adding Project Screenshots

1. Add images to the `images/` folder
2. Update the project cards in `index.html`:

```html
<div class="project-card">
    <img src="images/project-screenshot.png" alt="Project Name" class="project-image">
    <!-- Rest of the card content -->
</div>
```

3. Add CSS styling for the images in `styles.css`:

```css
.project-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
}
```

## Performance Optimization

- Minify CSS and JavaScript for production
- Optimize images (use WebP format, compress files)
- Enable lazy loading for images
- Consider using a CDN for Font Awesome

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contact Information

- **Email**: lc4021@columbia.edu
- **Phone**: (646) 358-5232
- **LinkedIn**: [linkedin.com/in/liang-jie-chiu](https://www.linkedin.com/in/liang-jie-chiu)
- **GitHub**: [github.com/Jack1021ohoh](https://github.com/Jack1021ohoh)

## License

This project is open source and available for personal use.

---

Built with ❤️ by Liang-Jie Chiu
