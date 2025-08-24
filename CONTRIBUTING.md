# Contributing to Sugarwares Website

Thank you for your interest in contributing to the Sugarwares website! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Git
- A modern web browser
- Text editor (VS Code recommended)

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/sugarwares/website.git
   cd website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm start
   ```

## 📁 Project Structure

```
staticpage/
├── index.html              # Main homepage
├── about.html              # About us page
├── products.html           # Products overview
├── contact.html            # Contact page
├── blog.html               # Blog page
├── CSS/                    # Stylesheets
├── JavaScript/             # JavaScript files
├── images/                 # Images and assets
├── product-pages/          # Individual product pages
└── README.md               # Project documentation
```

## 🔧 Development Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Follow existing naming conventions
- Write clear, descriptive commit messages
- Comment complex code sections

### HTML Guidelines
- Use semantic HTML5 elements
- Ensure proper heading hierarchy (h1, h2, h3, etc.)
- Add alt text to all images
- Use descriptive link text

### CSS Guidelines
- Use CSS custom properties for colors and spacing
- Follow BEM methodology for class naming
- Ensure responsive design principles
- Optimize for performance

### JavaScript Guidelines
- Use modern ES6+ syntax
- Implement error handling
- Follow functional programming principles
- Test functionality across browsers

## 🚀 Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- Implement your feature or fix
- Test thoroughly
- Ensure responsive design works

### 3. Commit Changes
```bash
git add .
git commit -m "feat: add new product page for eco-friendly containers"
```

### 4. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

## 📝 Commit Message Format

Use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
- `feat(products): add new bagasse plate category`
- `fix(navigation): resolve mobile menu toggle issue`
- `docs(readme): update installation instructions`

## 🧪 Testing

### Manual Testing
- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Test responsive design on various screen sizes
- Verify all links work correctly
- Check form submissions

### Performance Testing
- Use Lighthouse for performance metrics
- Optimize images and assets
- Minimize CSS and JavaScript
- Implement lazy loading

## 🚀 Deployment

### Pre-deployment Checklist
- [ ] All tests pass
- [ ] Code is minified and optimized
- [ ] Images are compressed
- [ ] SEO meta tags are correct
- [ ] Cross-browser compatibility verified

### Deployment Commands
```bash
# Build for production
npm run build

# Deploy to server
npm run deploy
```

## 🐛 Bug Reports

When reporting bugs, please include:
- Browser and version
- Operating system
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots if applicable

## 💡 Feature Requests

For feature requests:
- Describe the feature clearly
- Explain the use case
- Provide examples if possible
- Consider impact on existing functionality

## 📞 Contact

- **Development Team**: dev@sugarwares.com
- **Project Lead**: lead@sugarwares.com
- **General Inquiries**: info@sugarwares.com

## 📄 License

This project is proprietary to Sugarwares. All contributions are subject to the project's license terms.

---

**Thank you for contributing to making Sugarwares website better! 🌱**
