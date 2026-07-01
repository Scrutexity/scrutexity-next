#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────
# Scrutexity Jargon Discipline Audit
# Run against operator-facing pages to catch terms that
# make the product sound like a platform/system instead of
# a decision trigger artifact.
#
# Usage: bash scripts/audit-jargon.sh
# ──────────────────────────────────────────────────────────

set -e
cd "$(dirname "$0")/.."

echo "═══ Scrutexity Jargon Audit ═══"
echo "Checking operator-facing pages for banned language..."
echo ""

# Pages to check (operator-facing only)
PAGES=(
  "src/app/page.tsx"
  "src/app/pricing/page.tsx"
  "src/app/pilot/page.tsx"
  "src/app/flagship-pilot/page.tsx"
  "src/app/roi/page.tsx"
  "src/app/snapshot/page.tsx"
  "src/app/sample-snapshot/page.tsx"
  "src/app/lite/page.tsx"
)

# Banned terms with context-checking patterns
# Each entry: "term|reason"
BANNED=(
  "system of record|Makes Snapshot sound like a platform"
  "ongoing tracking|Implies longitudinal system usage"
  "ongoing monitoring|Same — adds system weight"
  "performance dashboard|Dashboard language bleeds into operator pages"
  "live dashboard|Same"
  "compliance notes|Compliance as product feature on operator page"
  "compliance guarantee|Same"
  "compliance shield|Same"
  "verifiable audit trail|Audit language better on /for-pe"
  "audit trail|Same — keep on enterprise pages"
  "portfolio audit|Same"
  "history of snapshot|Implies report management system"
  "report history|Same"
)

EXIT_CODE=0

for page in "${PAGES[@]}"; do
  if [ ! -f "$page" ]; then
    echo "  SKIP: $page (not found)"
    continue
  fi

  HITS=0
  for banned in "${BANNED[@]}"; do
    term="${banned%%|*}"
    reason="${banned##*|}"
    if grep -n -i "$term" "$page" > /dev/null 2>&1; then
      if [ "$HITS" -eq 0 ]; then
        echo "  ⚠  $page"
        HITS=1
      fi
      grep -n -i "$term" "$page" | while read -r line; do
        echo "       $line  ($reason)"
      done
      EXIT_CODE=1
    fi
  done
  if [ "$HITS" -eq 0 ]; then
    echo "  ✓  $page"
  fi
done

echo ""
if [ "$EXIT_CODE" -eq 0 ]; then
  echo "═══ CLEAN — no banned jargon found ═══"
else
  echo "═══ FLAGS FOUND — review above ═══"
fi

exit "$EXIT_CODE"
