import { Document, Page, View, Text, StyleSheet, Font } from '@react-pdf/renderer';
import type { ClaimRisk } from '@/lib/db';

// ── Font Registration ──
Font.register({
  family: 'Instrument Serif',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/instrumentserif/v4/neITzCcpNQPZ2J2OqCjR2Hl4v0Gq0Q.ttf',
      fontWeight: 400,
    },
  ],
});

// ── Color Tokens ──
const COLORS = {
  page: '#F8F3EA',
  card: '#FFFBF3',
  text: '#1C1814',
  muted: '#6B6259',
  sage: '#5E7A5A',
  clay: '#B7896B',
  sand: '#D9CCB0',
  border: '#E6DCC6',
};

// ── Dynamic Style Helpers (not inside StyleSheet) ──

function severityBadgeStyle(score: number) {
  const bgColors: Record<number, string> = {
    5: '#1C181420',
    4: '#B7896B20',
    3: '#5E7A5A18',
    2: '#D9CCB040',
    1: '#D9CCB020',
  };
  const textColors: Record<number, string> = {
    5: '#1C1814',
    4: '#B7896B',
    3: '#5E7A5A',
    2: '#6B6259',
    1: '#6B625970',
  };
  return {
    fontSize: 7,
    fontFamily: 'Helvetica' as const,
    fontWeight: 'bold' as const,
    color: textColors[score] || textColors[3],
    backgroundColor: bgColors[score] || bgColors[3],
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  };
}

function citationMarkerStyle(present: boolean) {
  return {
    fontSize: 7,
    fontFamily: 'Helvetica' as const,
    color: present ? COLORS.sage : COLORS.muted,
    backgroundColor: present ? '#5E7A5A12' : '#6B625912',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  };
}

// ── Static Styles ──
const styles = StyleSheet.create({
  page: {
    padding: 48,
    backgroundColor: COLORS.page,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: COLORS.text,
    lineHeight: 1.5,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  brandMark: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: COLORS.text,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandMarkText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  brandName: {
    fontSize: 11,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    letterSpacing: 3,
    color: COLORS.text,
    textTransform: 'uppercase',
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.sand,
    marginVertical: 16,
  },
  reportTitle: {
    fontSize: 22,
    fontFamily: 'Instrument Serif',
    color: COLORS.text,
    marginBottom: 12,
  },
  metaGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 8,
  },
  metaItem: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: COLORS.muted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  metaValue: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: COLORS.text,
    marginTop: 2,
  },
  sectionLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: COLORS.sage,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  claimCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  claimText: {
    fontSize: 11,
    fontFamily: 'Helvetica',
    fontStyle: 'italic',
    color: COLORS.text,
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  tag: {
    fontSize: 7,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: COLORS.clay,
    backgroundColor: '#B7896B15',
    borderWidth: 1,
    borderColor: '#B7896B30',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  driftTag: {
    fontSize: 7,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: COLORS.text,
    backgroundColor: '#1C181408',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  driftContext: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    fontStyle: 'italic',
    color: COLORS.muted,
    marginBottom: 6,
  },
  remediationBlock: {
    backgroundColor: '#5E7A5A0A',
    borderWidth: 1,
    borderColor: '#5E7A5A25',
    borderRadius: 6,
    padding: 10,
  },
  remediationLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: COLORS.sage,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  remediationText: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    fontStyle: 'italic',
    color: COLORS.text,
  },
  footer: {
    position: 'absolute',
    bottom: 32,
    left: 48,
    right: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.sand,
    paddingTop: 10,
  },
  footerText: {
    fontSize: 6,
    fontFamily: 'Helvetica',
    color: COLORS.muted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

// ── Document Component ──

interface PdfReportProps {
  scannedUrl: string;
  scanId: string;
  scannedAt: string;
  risks: ClaimRisk[];
}

export function AuditPdfReport({ scannedUrl, scanId, scannedAt, risks }: PdfReportProps) {
  return (
    <Document title={`Claim-Risk Audit — ${scannedUrl}`} author="Scrutexity">
      <Page size="A4" style={styles.page}>
        {/* Brand Header */}
        <View style={styles.brandRow}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>S</Text>
          </View>
          <Text style={styles.brandName}>SCRUTEXITY</Text>
        </View>

        <View style={styles.separator} />

        {/* Title & Meta */}
        <Text style={styles.reportTitle}>Verified Claim-Risk Audit</Text>

        <View style={styles.metaGroup}>
          <View>
            <Text style={styles.metaItem}>Target URL</Text>
            <Text style={styles.metaValue}>{scannedUrl}</Text>
          </View>
          <View>
            <Text style={styles.metaItem}>Scan ID</Text>
            <Text style={styles.metaValue}>{scanId.slice(0, 8)}...</Text>
          </View>
          <View>
            <Text style={styles.metaItem}>Timestamp</Text>
            <Text style={styles.metaValue}>{new Date(scannedAt).toLocaleString()}</Text>
          </View>
          <View>
            <Text style={styles.metaItem}>Claims Found</Text>
            <Text style={styles.metaValue}>{risks.length}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        {/* Risk Landscape */}
        <Text style={styles.sectionLabel}>Risk Landscape</Text>

        {risks.map((risk, idx) => (
          <View key={idx} style={styles.claimCard} wrap={false}>
            <Text style={styles.claimText}>"{risk.claim_text}"</Text>

            <View style={styles.tagRow}>
              <Text style={severityBadgeStyle(risk.severity_score)}>
                Severity: {risk.severity_score}/5
              </Text>
              {risk.regulatory_triggers.map((t) => (
                <Text key={t} style={styles.tag}>{t}</Text>
              ))}
              <Text style={citationMarkerStyle(risk.visible_citation)}>
                {risk.visible_citation ? 'Cited' : 'No citation'}
              </Text>
              {risk.drift_detected && (
                <Text style={styles.driftTag}>Drift detected</Text>
              )}
            </View>

            {risk.drift_context && (
              <Text style={styles.driftContext}>{risk.drift_context}</Text>
            )}

            {risk.safer_wording && (
              <View style={styles.remediationBlock}>
                <Text style={styles.remediationLabel}>Safer Wording</Text>
                <Text style={styles.remediationText}>"{risk.safer_wording}"</Text>
              </View>
            )}
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>SCRUTEXITY — Claim Intelligence for Public Trust</Text>
          <Text style={styles.footerText}>Page 1 of 1</Text>
        </View>
      </Page>
    </Document>
  );
}
