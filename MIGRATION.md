# Dependency Migration Guide

This document tracks the dependency update process for the Digital Garden project.

## Phase 1: Safe Updates (COMPLETED)

### Updates Applied
- `sass`: `^1.49.9` → `^1.89.0` ✅
- `node-html-parser`: `^6.1.13` → `^7.0.1` ✅
- `@11ty/eleventy-img`: `^4.0.2` → `^5.0.0` ✅
- `axios`: `^1.2.2` → `^1.9.0` ✅
- `dotenv`: `^16.0.3` → `^16.5.0` ✅
- `fs-file-tree`: `^1.1.1` → `^1.1.2` ✅
- `glob`: `^10.2.1` → `^10.4.5` ✅
- `markdown-it-anchor`: `^9.0.1` → `^9.2.0` ✅
- `markdown-it-attrs`: `^4.1.6` → `^4.3.1` ✅
- `rimraf`: `^4.4.1` → `^5.0.10` ✅

### Updates Reverted
- `@sindresorhus/slugify`: Attempted `^2.2.1` → Reverted to `^1.1.2`
  - **Issue**: v2+ is ESM-only, incompatible with current CommonJS setup
  - **Resolution**: Keep on v1.x until Phase 2 ESM migration

### Packages Kept at Current Versions
- `@11ty/eleventy`: `^2.0.1` (v3+ requires ESM migration)
- `@11ty/eleventy-plugin-rss`: `^1.2.0` (wait for Eleventy 3 compatibility)

## Phase 2: Eleventy 3.0 ESM Migration (PLANNED)

### Prerequisites
- Node.js 18+ (current: check with `node --version`)
- Thorough testing environment for Obsidian → website pipeline

### Breaking Changes to Address

#### 1. Package.json Configuration
```json
{
  "type": "module"
}
```

#### 2. Main Config File (.eleventy.js)
**Current (CommonJS):**
```javascript
const slugify = require("@sindresorhus/slugify");
const markdownIt = require("markdown-it");
// ... more requires

module.exports = function (eleventyConfig) {
  // config
  return {
    dir: { ... }
  };
};
```

**Target (ESM):**
```javascript
import slugify from "@sindresorhus/slugify";
import markdownIt from "markdown-it";
// ... more imports

export default function (eleventyConfig) {
  // config
  return {
    dir: { ... }
  };
};
```

#### 3. Helper Files (src/helpers/*.js)
Convert all files from:
```javascript
// Current
function userMarkdownSetup(md) { ... }
exports.userMarkdownSetup = userMarkdownSetup;
```

To:
```javascript
// Target
export function userMarkdownSetup(md) { ... }
```

#### 4. Data Files (src/site/_data/*.js)
Convert module.exports to export default patterns.

#### 5. Dependency Updates for Phase 2
- `@11ty/eleventy`: `^2.0.1` → `^3.1.0`
- `@11ty/eleventy-plugin-rss`: `^1.2.0` → `^2.0.4`
- `@sindresorhus/slugify`: `^1.1.2` → `^2.2.1`
- `markdown-it-footnote`: `^3.0.3` → `^4.0.0`
- `glob`: `^10.4.5` → `^11.0.2` (ESM-only)

### Migration Steps

1. **Backup & Branch**
   - Create git branch: `git checkout -b eleventy-v3-migration`
   - Backup current working site

2. **Install Upgrade Helper**
   ```bash
   npm install @11ty/eleventy-upgrade-help@3
   ```

3. **Add type: module to package.json**

4. **Convert .eleventy.js**
   - Change all `require()` to `import`
   - Change `module.exports` to `export default`

5. **Convert helper files**
   - Update all files in `src/helpers/`
   - Update all files in `src/site/_data/`

6. **Update dependencies**
   - Apply Phase 2 package updates
   - Test each major dependency update individually

7. **Test Critical Features**
   - Wiki-style links (`[[Link]]`)
   - Obsidian callouts
   - Image optimization
   - Math rendering (MathJax)
   - Tag functionality
   - RSS feed generation

8. **Deploy Testing**
   - Test build process
   - Test deployment to hosting platform
   - Verify all Obsidian → website features work

### Rollback Plan
- Keep current working branch as `main-v2-stable`
- Phase 2 migration can be abandoned if issues arise
- Current Phase 1 setup provides stable foundation

### Timeline Recommendation
- Phase 2 should be planned for a period with:
  - Time for thorough testing (1-2 weeks)
  - Ability to troubleshoot Obsidian integration issues
  - No critical content publishing deadlines

## Testing Checklist

### Phase 1 (Current)
- [x] Build process works
- [x] Development server starts
- [x] Sass compilation works
- [x] No security vulnerabilities
- [ ] Test with sample Obsidian content
- [ ] Verify image optimization
- [ ] Check wiki links and callouts

### Phase 2 (Future)
- [ ] ESM conversion successful
- [ ] All markdown processing features work
- [ ] Obsidian plugin integration maintained
- [ ] Performance unchanged or improved
- [ ] Deployment pipeline works
- [ ] RSS feed generation works
- [ ] Search functionality intact