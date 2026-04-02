# Quick Start Guide

## 🚀 Fastest Way to Use

1. **Open `index-standalone.html`** in any web browser
2. **Enter your Anthropic API key** in the top banner
3. **Start analyzing!**

## 🔑 Get Your API Key

1. Go to https://console.anthropic.com
2. Sign in or create account
3. Navigate to API Keys
4. Create a new key
5. Copy and paste into the app

## 📋 Typical Workflow

### First Time Setup
1. Open the standalone HTML file
2. Enter API key (saved automatically)
3. Analyze 2-3 job descriptions
4. Save them to your library

### Analyzing a JD
1. **JD Analyzer** tab
2. Upload/paste job description
3. Click **"Run pipeline"**
4. Review competencies (click rows to expand)
5. Adjust levels if needed (click D/C/A/E buttons)
6. **"+ Save to library"**

### Generate Career Ladder
1. **Career Map** tab
2. Type role family (e.g., "Security Engineer")
3. **"Generate career map"**
4. Toggle between IC/Management tracks
5. Click levels to see requirements

### Gap Analysis
1. **Gap Analysis** tab
2. Select current role
3. Select target role
4. **"Analyze gap"**
5. Review priorities and action plan

### Self-Assessment
1. **Readiness** tab
2. Select target role
3. Rate yourself on each competency
4. **"Assess my readiness"**
5. Get your score + development plan

## 💡 Tips

### For Best Results
- Use complete job descriptions (not just bullet points)
- Include experience requirements and responsibilities
- The AI is calibrated to avoid over-assigning "Expert" level
- Manual adjustment is available for all competencies

### Understanding Levels
- **D (Developing)** = Learning, needs guidance
- **C (Competent)** = Independent execution
- **A (Advanced)** = Coaching others, strategic
- **E (Expert)** = Creates standards, org-wide authority

### File Formats
- **PDF** = Best for official JDs
- **DOCX** = Works great, faster processing
- **TXT/MD** = Fastest, manual formatting preserved

### Competency Types
- **T (Technical)** = Hard skills, tools, methodologies
- **B (Behavioral)** = Leadership, communication, business

## 🔧 Troubleshooting

### API Key Issues
- **"Not configured"** = Enter your key in top banner
- **403 Forbidden** = Check key is valid and active
- **Rate limit** = Wait a moment and retry

### File Upload Issues
- **PDF not reading** = Try saving as DOCX or TXT
- **DOCX empty** = File may be protected, try PDF
- **Large files** = Keep under 5MB for best performance

### Analysis Issues
- **No Expert competencies** = This is normal! Expert is rare
- **Too many Expert** = Use manual adjustment
- **Missing competencies** = Add manually via calibration

## 📱 Browser Compatibility

Works on:
- ✅ Chrome/Edge (best)
- ✅ Firefox
- ✅ Safari
- ⚠️ Older browsers may have issues

## 🎯 Common Use Cases

### 1. Job Search
- Analyze target role
- Compare to current skills
- Build development plan
- Track progress over time

### 2. Performance Reviews
- Self-rate before review
- Identify growth areas
- Create action plan
- Show to manager

### 3. Career Planning
- Map out career ladder
- See requirements for each level
- Plan 2-3 year trajectory
- Identify skill gaps

### 4. Team Development
- Analyze team roles
- Identify collective gaps
- Plan training initiatives
- Track competency growth

## 🔒 Privacy

- All processing is client-side
- Your data is sent only to Anthropic API
- API key stored locally (localStorage)
- No data is saved to servers
- Library resets on page refresh

## 📚 Next Steps

1. **Analyze your current role** (or resume)
2. **Analyze 2-3 target roles** you're interested in
3. **Run gap analysis** between them
4. **Self-assess readiness** for closest target
5. **Create development plan** from insights

---

**Need help?** Check the full README.md for technical details.

**Want to develop?** Run `npm install` then `npm run dev` for local development server.
