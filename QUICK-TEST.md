# Quick Test - Local Mode (No API Key)

## 30-Second Test

1. **Open** `index-standalone.html` (should be open now!)
2. **Look at top** - Should say "🔵 Local (no API needed)"
3. **Click** "⚡ Try Sample JD" button
4. **Click** "Run pipeline" button
5. **Done!** - See competencies extracted in seconds

## What You Should See

### Top Banner
```
Mode: 🔵 Local (no API needed)
[Optional API key input field]
```

### JD Analyzer Tab
```
┌─────────────────────────────────────────┐
│ 🔵 Local Mode Active                    │
│ Analyzing with keyword matching         │
│ (no API key needed). Works offline!     │
└─────────────────────────────────────────┘

[Upload file] [Paste text]  ⚡ Try Sample JD

[Text area or file upload zone]

[Run pipeline] button
```

### After Analysis
You'll see:
- Role title and level
- Competency counts (D/C/A/E breakdown)
- List of all competencies with levels
- Click any competency to see details
- Click D/C/A/E buttons to adjust levels
- "Save to library" button

## No API Key Needed!

The following work **without any API key**:
- ✅ JD Analysis (keyword-based)
- ✅ Upload TXT, MD, DOCX files
- ✅ Paste text
- ✅ Competency extraction
- ✅ Save to library
- ✅ Manual level adjustment
- ✅ Works completely offline

## To Add API Key Later (Optional)

If you want AI features:
1. Get key from https://console.anthropic.com
2. Paste in input field at top
3. Banner changes to "🟢 AI Mode"
4. Career Maps, Gap Analysis, Readiness unlock

## Troubleshooting

**Problem**: Banner still shows API key prompt
**Solution**: Refresh the page (F5). Should show "🔵 Local (no API needed)"

**Problem**: Can't click "Run pipeline"
**Solution**: 
- Make sure you clicked "⚡ Try Sample JD" or pasted text
- Or upload a file
- Button is disabled until you have content

**Problem**: Getting API key errors
**Solution**: 
- Make sure API key field at top is EMPTY
- Should say "🔵 Local (no API needed)" in blue
- If not, clear the input field and refresh

**Problem**: Nothing happens when clicking buttons
**Solution**: 
- Check browser console (F12) for errors
- Try refreshing the page
- Make sure JavaScript is enabled

## Test Workflow

### 1. Analyze Sample JD (10 seconds)
```
1. Click "⚡ Try Sample JD"
2. Click "Run pipeline"
3. Wait ~1 second
4. See results!
```

### 2. Analyze Your Own JD (30 seconds)
```
1. Click "Paste text" 
2. Copy/paste a job description
3. Click "Run pipeline"
4. Adjust levels if needed (click D/C/A/E buttons)
5. Click "Save to library"
```

### 3. Upload a File (20 seconds)
```
1. Click "Upload file"
2. Drop DOCX/TXT file or click to browse
3. File name appears
4. Click "Run pipeline"
5. Done!
```

## What's Different: Local vs AI Mode

| Feature | Local Mode | AI Mode |
|---------|------------|---------|
| Speed | Instant | 2-5 seconds |
| Accuracy | Good | Excellent |
| Confidence Scores | Fixed | Dynamic |
| Evidence | "Pattern matching" | Specific quotes |
| Cost | Free | ~$0.01/JD |

## Expected Results (Sample JD)

The sample Principal Security Consultant JD should extract:
- **Total**: ~21 competencies
- **Expert (E)**: 2-4 competencies
- **Advanced (A)**: 6-8 competencies  
- **Competent (C)**: 8-10 competencies
- **Developing (D)**: 2-4 competencies

Technical competencies: ~5-7
Behavioral competencies: ~14-16

## Next Steps

Once you've tested local mode:

1. **Try multiple JDs** - Analyze 2-3 different roles
2. **Save to library** - Click "Save to library" after each
3. **Adjust levels** - Click "Calibrate Levels" to fine-tune
4. **(Optional) Add API key** - Unlock AI features when ready

## Need Help?

- Local mode not working? Try closing and reopening the HTML file
- See MODES.md for detailed explanation
- See README.md for full documentation
- See QUICKSTART.md for complete guide

---

**TL;DR**: Click "⚡ Try Sample JD" → Click "Run pipeline" → Done! 🎉
