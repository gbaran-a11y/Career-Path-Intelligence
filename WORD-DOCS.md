# How to Use Word Documents with the JD Analyzer

## The Issue
Your network blocks external libraries (CDNs), so Word documents can't be read directly by the browser.

## Easy Solutions

### ⭐ Option 1: Copy/Paste (Recommended - 10 seconds)
1. **Open** your Word document
2. **Select all** text (`Ctrl+A`)
3. **Copy** (`Ctrl+C`)
4. **Paste** into the text box on the page (`Ctrl+V`)
5. Click **"🔍 Analyze Job Description"**

**This is the fastest way!**

---

### Option 2: Save as Text File (30 seconds)
1. **Open** your Word document in Microsoft Word
2. Click **File** → **Save As**
3. Choose location (Desktop is easiest)
4. In **"Save as type"** dropdown, select **"Plain Text (*.txt)"**
5. Click **Save**
6. On the analyzer page, click **"📄 Upload TXT/MD"**
7. Select the .txt file you just saved

---

### Option 3: Google Docs (if you have internet)
1. **Upload** Word doc to Google Drive
2. **Open** in Google Docs
3. **Select all** and **copy**
4. **Paste** into the analyzer

---

### Option 4: Online Converter
1. Go to **https://www.zamzar.com/convert/docx-to-txt/**
2. Upload your .docx file
3. Convert and download the .txt file
4. Upload the .txt file to the analyzer

---

## Button on the Page

When you click **"📝 Have a Word Doc?"** button, you'll see these instructions as a popup.

## Why This Happens

The Word document format (.docx) is actually a compressed ZIP file containing XML. To read it directly in the browser requires:
- JSZip library (for unzipping)
- XML parsing (for extracting text)

These libraries normally load from CDNs (Content Delivery Networks), but your network/firewall blocks them for security.

## Workarounds Summary

| Method | Time | Best For |
|--------|------|----------|
| Copy/Paste | 10 sec | ⭐ Quick single docs |
| Save as TXT | 30 sec | Multiple docs |
| Google Docs | 1 min | If you use Google |
| Online Converter | 2 min | One-time use |

## Pro Tips

✅ **Keep a "JDs" folder** with text versions of all job descriptions you analyze

✅ **Save email JDs directly as .txt** when you receive them

✅ **For multiple docs**, batch convert them all to .txt at once

✅ **Paste is fastest** - it's literally 10 seconds

## Test It Now

1. Open any Word document
2. Press `Ctrl+A` (select all)
3. Press `Ctrl+C` (copy)
4. Go to the analyzer page
5. Click in the text box
6. Press `Ctrl+V` (paste)
7. Click "Analyze"

**Done!** You just analyzed a Word doc in 10 seconds without converting anything.

---

## Common Questions

**Q: Can you add built-in Word support?**
A: Not while your network blocks CDNs. The libraries can't load.

**Q: Will this work offline?**
A: Copy/paste works 100% offline. The analyzer itself works offline.

**Q: What about PDF files?**
A: Same issue - PDFs need external libraries. Copy text from PDF and paste.

**Q: Is my data secure?**
A: Yes! Everything runs locally in your browser. Nothing is sent to servers.

**Q: Does formatting matter?**
A: No. The analyzer only looks at text/keywords, not formatting.

---

**Bottom line:** Just use copy/paste. It's easier than any conversion!
