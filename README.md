# Portfolio Website

A modern, responsive portfolio website built with React and Vite. Features a beautiful UI with smooth animations, dark theme, and fully responsive design.

## Features

- 🎨 Modern and beautiful UI design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast performance with Vite
- 🎭 Smooth animations and transitions
- 🌙 Dark theme with gradient accents
- 📧 Contact form
- 🔗 Social media links
- 💼 Projects showcase
- 🛠️ Skills section with progress bars

## Sections

1. **Hero** - Introduction with call-to-action buttons
2. **About** - Personal information and statistics
3. **Skills** - Technical skills with progress indicators
4. **Projects** - Portfolio projects showcase
5. **Contact** - Contact form and information
6. **Footer** - Social links and copyright

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Customization

### Personal Information

1. **Hero Section** (`src/components/Hero.jsx`):
   - Update name, title, and description
   - Change social media links (GitHub, LinkedIn, Email)
   - Update avatar placeholder initials

2. **About Section** (`src/components/About.jsx`):
   - Modify the about text
   - Update statistics (projects, experience, clients)

3. **Skills Section** (`src/components/Skills.jsx`):
   - Add/remove skills
   - Adjust skill levels (percentage)
   - Change skill icons from react-icons

4. **Projects Section** (`src/components/Projects.jsx`):
   - Replace placeholder projects with your own
   - Update project images, descriptions, and technologies
   - Add GitHub and demo links

5. **Contact Section** (`src/components/Contact.jsx`):
   - Update email, phone, and location
   - Connect the form to a backend service or email service

6. **Footer** (`src/components/Footer.jsx`):
   - Update copyright name
   - Update social media links

### Styling

- Colors can be customized in individual component CSS files
- Main color scheme uses `#00d4ff` (cyan) and `#8a2be2` (purple)
- Background colors are in `#0f0f0f` and `#1a1a2e`

### Images

Replace placeholder images in the Projects section with your actual project screenshots. You can:
- Add images to `public/images/` folder
- Use external image URLs
- Use image hosting services

## Project Structure

```
portfolio/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx & Navbar.css
│   │   ├── Hero.jsx & Hero.css
│   │   ├── About.jsx & About.css
│   │   ├── Skills.jsx & Skills.css
│   │   ├── Projects.jsx & Projects.css
│   │   ├── Contact.jsx & Contact.css
│   │   └── Footer.jsx & Footer.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Technologies Used

- React 19
- Vite
- React Icons
- CSS3 (with animations and gradients)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to fork this project and customize it for your own portfolio!

## Support

If you have any questions or need help customizing your portfolio, feel free to open an issue or reach out!
