# Operating Modes

The Career Intelligence Platform supports two modes of operation:

## 🟦 Local Mode (No API Key Required)

**What it does:**
- ✅ Analyzes job descriptions using keyword matching
- ✅ Extracts competencies and assigns D/C/A/E levels
- ✅ Saves roles to your library
- ✅ Supports TXT, MD, and DOCX files
- ✅ Works completely offline (no external calls)

**What it doesn't do:**
- ❌ No AI-powered analysis (uses pattern matching instead)
- ❌ Career Map generation unavailable
- ❌ Gap Analysis unavailable  
- ❌ Readiness Assessment unavailable
- ❌ PDF support unavailable

**Perfect for:**
- Quick competency screening
- Offline use
- Privacy-sensitive scenarios
- Learning the D/C/A/E framework
- No API costs

## 🟩 AI Mode (API Key Required)

**What it does:**
- ✅ Everything from Local Mode, PLUS:
- ✅ AI-powered competency extraction with confidence scores
- ✅ Standards-author calibration (prevents Expert inflation)
- ✅ PDF document support
- ✅ Career Map generation (full IC & Management ladders)
- ✅ Gap Analysis with action plans
- ✅ Readiness Assessment with coaching insights
- ✅ More accurate proficiency level detection

**Requirements:**
- Anthropic API key (get from https://console.anthropic.com)
- Internet connection
- API usage costs apply

**Perfect for:**
- Professional career planning
- Accurate competency assessment
- Full feature access
- Career map visualization
- Development planning

## How to Switch Modes

### Start in Local Mode
1. Open `index-standalone.html`
2. Start analyzing immediately
3. No setup required!

### Upgrade to AI Mode
1. Get API key from https://console.anthropic.com
2. Enter it in the top banner
3. Key is saved automatically (localStorage)
4. All features unlock immediately

### Return to Local Mode
1. Clear the API key field
2. Platform switches back to local analysis
3. JD Analyzer continues to work

## Feature Comparison

| Feature | Local Mode | AI Mode |
|---------|------------|---------|
| JD Analysis | ✓ (keyword) | ✓ (AI) |
| TXT/MD Files | ✓ | ✓ |
| DOCX Files | ✓ | ✓ |
| PDF Files | ✗ | ✓ |
| Confidence Scores | ✗ | ✓ |
| Library Save | ✓ | ✓ |
| Career Maps | ✗ | ✓ |
| Gap Analysis | ✗ | ✓ |
| Readiness Score | ✗ | ✓ |
| Cost | Free | ~$0.01-0.05/JD |
| Internet | Optional | Required |

## Technical Details

### Local Mode Analysis
Uses keyword pattern matching against 21 competencies:
- **Technical**: tech_skills, problem_solving, risk_mgmt, innovation
- **Behavioral**: All communication, leadership, and relationship competencies

### AI Mode Analysis
Uses Claude Sonnet 4 with:
- Custom system prompts for each feature
- JSON-structured responses
- Standards-author test for calibration
- Context-aware proficiency detection

## Privacy & Data

### Local Mode
- Zero external network calls
- All processing in-browser
- No data leaves your machine
- Library stored in component state only

### AI Mode
- Job description sent to Anthropic API
- Processed by Claude Sonnet 4
- Not stored by Anthropic (per their policy)
- API key stored in localStorage only
- Library still local (component state)

## Cost Estimate (AI Mode)

Typical usage costs with Claude Sonnet 4:
- **JD Analysis**: ~$0.01-0.02 per job description
- **Career Map**: ~$0.03-0.05 per generation
- **Gap Analysis**: ~$0.02-0.03 per comparison
- **Readiness**: ~$0.02-0.03 per assessment

**Example monthly usage:**
- 10 JDs analyzed: $0.10-0.20
- 5 career maps: $0.15-0.25
- 10 gap analyses: $0.20-0.30
- **Total**: ~$0.50-0.75/month for active use

Free tier on Anthropic often covers personal use.

## Recommendations

**Use Local Mode when:**
- 🎯 Just learning the platform
- 🔒 Working with confidential data
- 📡 No internet connection
- 💰 Budget constraints
- ⚡ Need instant results

**Use AI Mode when:**
- 🎯 Serious career planning
- 📊 Need accurate proficiency levels
- 🗺️ Want career ladder visualization
- 📈 Gap analysis and roadmaps
- 🎓 Development plan creation

## Quick Start

**Fastest way to try (Local Mode):**
```
1. Open index-standalone.html
2. Click "Load Sample JD" 
3. Click "Run pipeline"
4. Done!
```

**Full experience (AI Mode):**
```
1. Get API key from console.anthropic.com
2. Open index-standalone.html
3. Enter API key at top
4. Analyze multiple JDs
5. Generate career maps
6. Run gap analysis
```

---

**Still deciding?** Start in Local Mode, then upgrade to AI Mode when you need the advanced features. Your library carries over!
