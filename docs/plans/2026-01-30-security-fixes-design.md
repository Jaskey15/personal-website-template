# Security Fixes Design

**Date:** 2026-01-30
**Status:** Approved
**Priority:** Critical

## Overview

Fix critical security vulnerabilities in the personal website template before public release. The design emphasizes simplicity, security, and template-friendliness with minimal dependencies.

## Security Issues Addressed

### Critical (Must Fix)
1. Unauthenticated DELETE endpoint for comments
2. XSS vulnerability in contact form emails
3. Outdated Next.js version with known CVEs (16.1.3 → 16.1.6)
4. Stored XSS in comment display
5. No rate limiting on API routes

### Moderate (Document/Improve)
6. Personal references in template content
7. CORS protection guidance
8. Security best practices documentation

## Design Decisions

### 1. DELETE Endpoint → Remove Entirely
**Decision:** Delete `app/api/comments/[id]/route.ts` completely
**Rationale:** Safest for template. Users can add their own admin system later if needed.
**Implementation:** Remove file and `deleteComment` function from `lib/db.ts`

### 2. Contact Form XSS → Plain Text Emails
**Decision:** Use plain text emails instead of HTML
**Rationale:** Most secure, no dependencies, professional appearance
**Implementation:** Replace `html` with `text` in Resend email sending

### 3. Comment Content → Verify React Escaping
**Decision:** Rely on React's built-in XSS protection
**Rationale:** React already escapes text content by default
**Implementation:** Verify no `dangerouslySetInnerHTML` in comment components

### 4. Rate Limiting → Document as TODO
**Decision:** Add comprehensive documentation comments, no implementation
**Rationale:** Different deployments need different solutions (Vercel Edge, Upstash, custom)
**Implementation:** Add security notes to all API routes

### 5. CORS → Document Only
**Decision:** Add comments explaining CORS considerations
**Rationale:** Next.js handles same-origin by default; users have different requirements
**Implementation:** Add CORS notes to API routes

### 6. Personal References → Simple Cleanup
**Decision:** Remove "Jacob Askey" from content/about.md only
**Rationale:** Git history is normal for open source
**Implementation:** Update line 25 in content/about.md

## Implementation Plan

### Phase 1: Dependency Updates
```bash
npm update next @next/mdx eslint-config-next
npm update
npm audit fix
```

**Files Changed:**
- `package.json`
- `package-lock.json`

### Phase 2: Remove DELETE Endpoint
**Files Deleted:**
- `app/api/comments/[id]/route.ts`

**Files Modified:**
- `lib/db.ts` (remove `deleteComment` function, lines 70-78)

### Phase 3: Fix Contact Form XSS
**Files Modified:**
- `app/api/contact/route.ts` (line 32-44)

**Change:**
```typescript
// Before (HTML with XSS vulnerability)
html: `
  <h2>New Contact Form Submission</h2>
  <p><strong>From:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Message:</strong></p>
  <p>${message.replace(/\n/g, '<br>')}</p>
`

// After (Plain text, XSS-proof)
text: `New Contact Form Submission\n\nFrom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
```

### Phase 4: Verify Comment Escaping
**Files to Check:**
- `components/comment-item.tsx` (verify line 45-46 uses `{comment.content}`)
- `components/comment-list.tsx` (check for dangerouslySetInnerHTML)
- `components/comment-form.tsx` (check for dangerouslySetInnerHTML)
- `components/comments-section.tsx` (check for dangerouslySetInnerHTML)

**Expected:** No changes needed; React already escapes properly

### Phase 5: Add Security Documentation

**File:** `app/api/contact/route.ts` (top of file, after imports)
```typescript
// SECURITY NOTE: Rate Limiting
// This endpoint has no rate limiting in the template for development simplicity.
// Before deploying to production, consider adding rate limiting to prevent spam:
// - Use Vercel's Edge Middleware rate limiting (if deploying to Vercel)
// - Use @upstash/ratelimit with Redis for custom solutions
// - Implement IP-based request counting
// Recommended: 5 requests per hour per IP address

// SECURITY NOTE: CORS
// Next.js API routes use same-origin policy by default in most deployments.
// If you need to call these APIs from different domains, configure CORS headers.
```

**File:** `app/api/comments/route.ts` (top of file, after imports)
```typescript
// SECURITY NOTE: Rate Limiting
// This endpoint has no rate limiting in the template for development simplicity.
// Before deploying to production, consider adding rate limiting to prevent spam:
// - Use Vercel's Edge Middleware rate limiting (if deploying to Vercel)
// - Use @upstash/ratelimit with Redis for custom solutions
// - Implement IP-based request counting
// Recommended: 10 comments per hour per IP address

// SECURITY NOTE: CORS
// Next.js API routes use same-origin policy by default in most deployments.
// If you need to call these APIs from different domains, configure CORS headers.
```

**File:** `.env.example` (add at bottom)
```bash
# ==============================================================================
# Security Considerations
# ==============================================================================
# Before deploying to production:
# 1. Add rate limiting to API routes (see comments in API files)
# 2. Configure CORS if needed for your deployment
# 3. Review all environment variables are properly set
# 4. Run `npm audit` to check for vulnerabilities
```

### Phase 6: Content Cleanup
**File:** `content/about.md` (line 25)

**Before:**
```markdown
3. **Update the alt text**: In `app/about/page.tsx`, change the `alt` prop (line 40) from "Jacob Askey" to your name
```

**After:**
```markdown
3. **Update the alt text**: In `app/about/page.tsx`, update the `alt` prop (line 40) with your name
```

## Validation Checklist

After implementation, verify:

- [ ] `npm audit` shows no high/critical vulnerabilities
- [ ] `npm run build` completes successfully
- [ ] File `app/api/comments/[id]/route.ts` does not exist
- [ ] Contact form sends plain text emails (test locally)
- [ ] Comments display correctly without XSS (test with `<script>alert('test')</script>`)
- [ ] All API routes have security documentation comments
- [ ] `.env.example` includes security section
- [ ] No "Jacob Askey" references in content files
- [ ] Search for `dangerouslySetInnerHTML` in comment components returns none

## Testing Plan

1. **Dependency Update Test:**
   - Run `npm audit`
   - Check for high/critical vulnerabilities
   - Verify Next.js version is 16.1.6 or higher

2. **DELETE Endpoint Test:**
   - Try accessing `DELETE /api/comments/1`
   - Should return 404

3. **Contact Form Test:**
   - Submit contact form with HTML/script tags in message
   - Verify email received is plain text
   - Verify no script execution

4. **Comment XSS Test:**
   - Post comment with `<script>alert('XSS')</script>`
   - Post comment with `<img src=x onerror=alert('XSS')>`
   - Verify both display as plain text, no script execution

5. **Build Test:**
   - Run `npm run build`
   - Check for TypeScript errors
   - Check for build warnings

## Files Changed Summary

**Deleted:**
- `app/api/comments/[id]/route.ts`

**Modified:**
- `package.json` (dependency updates)
- `package-lock.json` (dependency updates)
- `lib/db.ts` (remove deleteComment function)
- `app/api/contact/route.ts` (plain text email, security docs)
- `app/api/comments/route.ts` (security docs)
- `.env.example` (security section)
- `content/about.md` (remove personal reference)

**Verified (likely no changes):**
- `components/comment-item.tsx`
- `components/comment-list.tsx`
- `components/comment-form.tsx`
- `components/comments-section.tsx`

## Risk Assessment

**Low Risk:**
- Dependency updates (standard maintenance)
- Plain text emails (simpler than HTML)
- Content cleanup (template text)

**Medium Risk:**
- Removing DELETE endpoint (might break existing users, but unlikely as template is new)

**Mitigation:**
- Test all functionality after implementation
- Run full build before committing
- Update README if needed

## Post-Implementation

After all fixes are implemented and validated:
1. Update README.md security section
2. Commit all changes with message: "Security fixes: Update Next.js, remove unauthenticated DELETE, fix XSS vulnerabilities"
3. Create GitHub release with security notes
4. Update documentation to mention security improvements

## Notes

- No new runtime dependencies added (keeps template lightweight)
- All fixes maintain backward compatibility except DELETE endpoint removal
- Documentation-first approach for rate limiting and CORS gives users flexibility
- Design prioritizes template usability while improving security posture
