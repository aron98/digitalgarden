# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Digital Obsidian Garden template - a static site generator built with Eleventy that transforms Obsidian markdown notes into a published digital garden website. It's designed to work with the [Digital Garden Obsidian Plugin](https://github.com/oleeskild/Obsidian-Digital-Garden).

## Development Commands

### Essential Commands
- `npm run start` - Start development server (includes Sass watching + Eleventy serve)
- `npm run build` - Production build (runs theme setup + builds Sass + Eleventy)
- `npm run watch:eleventy` - Watch and serve Eleventy in development mode
- `npm run watch:sass` - Watch and compile Sass files
- `npm run build:sass` - Compile Sass to compressed CSS
- `npm run get-theme` - Run theme setup script

### Build Process
The build process is: `get-theme` → `build:sass` + `build:eleventy` in parallel.

## Architecture

### Core Structure
- **Input Directory**: `src/site/` - All source content and templates
- **Output Directory**: `dist/` - Generated static site  
- **Notes Location**: `src/site/notes/` - Markdown content files
- **Templates**: `src/site/_includes/` - Nunjucks layouts and components
- **Styles**: `src/site/styles/` - Sass stylesheets compiled to `dist/styles/`

### Key Configuration Files
- `.eleventy.js` - Main Eleventy configuration with extensive markdown processing
- `src/site/_data/` - Eleventy data files for site metadata and computed values
- `src/helpers/userSetup.js` - User customization hooks for markdown-it and Eleventy

### Markdown Processing Pipeline
The site uses heavily customized markdown-it with plugins for:
- Internal wiki-style links (`[[Link|Title]]`) → converted to HTML anchors
- Obsidian callouts (`[!note]`) → styled div blocks with collapsible support
- Tags (`#tag`) → clickable search links
- Math (MathJax), Mermaid diagrams, PlantUML
- Image optimization with responsive picture elements
- Task lists, footnotes, and Obsidian-specific syntax

### Internal Linking System
- Wiki-style links (`[[filename]]` or `[[filename|display text]]`) are processed in `.eleventy.js:277-290`
- Links automatically resolve to note permalinks and handle dead links (404 redirect)
- Support for header linking with `#` fragments
- Front matter `permalink` property overrides default slugified URLs
- Garden entry notes (tagged `gardenEntry`) redirect to root `/`

### Image Processing
- Images are automatically optimized using `@11ty/eleventy-img`
- Generates WebP and JPEG formats in multiple sizes
- Creates responsive picture elements unless `USE_FULL_RESOLUTION_IMAGES=true`
- Supports Obsidian image syntax with width specifications (`image.png|100`)

### Deployment
Configured for both Netlify and Vercel with matching build commands and 404 handling.

## Extension Points

### Adding Markdown Features
Extend `src/helpers/userSetup.js` functions:
- `userMarkdownSetup(md)` - Add markdown-it plugins
- `userEleventySetup(eleventyConfig)` - Add Eleventy plugins/filters

### Theme Customization
- `src/site/get-theme.js` - Theme setup script
- Sass files in `src/site/styles/` for styling
- Environment variable `NOTE_ICON_DEFAULT` for default note icons