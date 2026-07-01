# Scrutexity Claim Receipt Extension

Pre-publish claim audit tool for agencies and CMS workflows. Verify regulatory risk, competitive positioning, and guarantee gaps before your team pushes to production.

## How It Works

1. **Click the extension icon** on any webpage you're about to publish
2. **Hit "Generate Receipt"** to open the claim audit form with the current URL prefilled
3. **Submit your info** and get an instant receipt showing detected risk factors
4. **Share with your client** or keep on file before go-live

## Development

### Build and Install

```bash
# The extension files are already in /chrome-extension/
# To load in Chrome:
# 1. Open chrome://extensions/
# 2. Enable "Developer mode" (top right)
# 3. Click "Load unpacked"
# 4. Select the /chrome-extension/ directory
```

### Configuration

**Production (default):**
The extension points to `https://scrutexity.com` by default.

**Local development:**
To test against `localhost:3000`:

```javascript
// In popup.js or browser console:
localStorage.setItem('scrutexity_dev_mode', 'true');
```

Then reload the extension.

### Flow

Extension → Current Page URL → `/claim-receipt?url=<encoded-url>` → Form prefilled with URL → Submission → Receipt generated

## Files

- `manifest.json` — Extension configuration
- `popup.html` — UI shown when extension is clicked
- `popup.js` — Logic for capturing page URL and routing to audit form
- `README.md` — This file

## Positioning

**For agencies**: Use this in your pre-flight QA workflow before client handoff.

**For CMS plugins**: Embed the receipt form into your publish flow as a pre-publish gate.

**For in-house teams**: Audit your claims before your marketing pushes live.

## Next Steps

1. Add extension icons (16x16, 48x48, 128x128 PNG) to `chrome-extension/images/`
2. Update `popup.js` to handle more advanced audit workflows (e.g., batch URLs, result caching)
3. Integrate with Scrutexity's claim analysis API for richer risk scoring
