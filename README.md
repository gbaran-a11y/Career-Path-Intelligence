# Career Intelligence Platform

A sophisticated AI-powered platform for analyzing job descriptions, mapping career progression, and assessing promotion readiness using Claude API.

## Features

### 1. 🔍 JD Analyzer
- Upload job descriptions in multiple formats (PDF, DOCX, TXT, MD)
- AI-powered extraction of competencies using D/C/A/E framework
- Standards-author calibration for accurate proficiency levels
- Manual adjustment capability with confidence scores
- Save analyzed roles to your library

### 2. 🗺️ Career Map Generator
- Generate complete career ladders for any role family
- Both IC (Individual Contributor) and Management tracks
- 4-6 levels per track with:
  - Typical titles and experience ranges
  - Compensation ranges
  - Key competency requirements
  - Promotion criteria

### 3. 📊 Gap Analysis
- Compare current vs target roles
- Prioritized competency gaps (critical/high/medium)
- Transferable strengths identification
- Quarterly development action plans
- Readiness scores and timelines

### 4. ✅ Readiness Assessment
- Self-rate competencies against target role
- Honest promotion readiness score (0-100)
- Strengths and critical gaps breakdown
- Personalized development plan
- Executive coaching insights

## D/C/A/E Proficiency Framework

- **D (Developing)**: Learning with guidance, needs help
- **C (Competent)**: Performs independently, applies knowledge
- **A (Advanced)**: Coaches others, recognized expert internally
- **E (Expert)**: Creates standards, recognized authority (rare!)

## File Support

- **PDF**: Full document analysis with Claude's PDF capabilities
- **Word documents**: .doc, .docx (uses mammoth.js)
- **Text files**: .txt, .md

## Quick Start (Standalone)

**No installation or API key required!**

1. Open `index-standalone.html` in your browser
2. Start analyzing immediately (local mode)
3. **Optional**: Add Anthropic API key for AI features

### Two Modes Available:

**🟦 Local Mode** (default, no API key)
- Works immediately, no setup
- Keyword-based analysis
- TXT, MD, DOCX support
- Completely offline

**🟩 AI Mode** (optional, API key required)
- AI-powered analysis
- PDF support
- Career Maps
- Gap Analysis
- Readiness Assessment

See [MODES.md](MODES.md) for detailed comparison.

## Development Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## API Configuration

You need an Anthropic API key to use this platform:

1. Get your API key from https://console.anthropic.com
2. Enter it in the API key field at the top of the page
3. It's stored locally in your browser (localStorage)

## Usage Flow

### Analyze a Job Description
1. Go to "JD Analyzer" tab
2. Upload a file or paste text
3. Click "Run pipeline"
4. Review extracted competencies
5. Adjust levels if needed (click D/C/A/E buttons)
6. Save to library

### Generate Career Map
1. Go to "Career Map" tab
2. Enter a role family (e.g., "Security Analyst")
3. Click "Generate career map"
4. View IC and Management tracks
5. Click on levels to see details

### Compare Roles (Gap Analysis)
1. Analyze and save 2+ roles to library
2. Go to "Gap Analysis" tab
3. Select current and target roles
4. Click "Analyze gap"
5. Review competency gaps and action plans

### Assess Readiness
1. Save target role to library
2. Go to "Readiness" tab
3. Select target role
4. Self-rate your proficiency for each competency
5. Click "Assess my readiness"
6. Review your score and development plan

## Technical Details

- **Framework**: React 18
- **AI Model**: Claude Sonnet 4 (claude-sonnet-4-20250514)
- **File Parsing**: mammoth.js for DOCX, native FileReader for text
- **Styling**: Inline styles with CSS variables
- **State Management**: React hooks (useState)
- **Storage**: localStorage for API key

## Project Structure

```
career-intelligence-platform/
├── index-standalone.html  # Single-file version (no build needed)
├── index.html            # Vite entry point
├── src/
│   ├── main.jsx         # React root
│   └── App.jsx          # Main application
├── package.json
└── README.md
```

## Notes

- The platform uses Claude API directly (requires API key)
- Standalone HTML version works immediately in any browser
- All processing happens client-side (your data stays local)
- Library is stored in component state (resets on refresh)
