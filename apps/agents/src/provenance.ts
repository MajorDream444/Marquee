import type { Asset, ProvenanceRecord, ProvenanceGapCheck } from '@marquee/core';

export function provenanceGapCheck(
  asset: Asset,
  provenance: ProvenanceRecord[]
): ProvenanceGapCheck {
  const flags: string[] = [];
  let confidence = 100;
  let missingDateRanges = false;

  // Check for missing date ranges in provenance
  if (provenance.length === 0) {
    flags.push('No provenance records found');
    confidence -= 50;
    missingDateRanges = true;
  } else {
    // Check for gaps in date ranges
    const sortedProvenance = [...provenance].sort((a, b) => {
      const dateA = a.dateFrom?.getTime() || 0;
      const dateB = b.dateFrom?.getTime() || 0;
      return dateA - dateB;
    });

    for (let i = 0; i < sortedProvenance.length; i++) {
      const record = sortedProvenance[i];
      
      // Check if date range is missing
      if (!record.dateFrom || !record.dateTo) {
        flags.push(`Provenance record ${i + 1} missing date range`);
        confidence -= 10;
        missingDateRanges = true;
      }

      // Check for gaps between records
      if (i > 0) {
        const prevRecord = sortedProvenance[i - 1];
        if (prevRecord.dateTo && record.dateFrom) {
          const gap = record.dateFrom.getTime() - prevRecord.dateTo.getTime();
          if (gap > 0) {
            flags.push(`Gap detected between provenance records ${i} and ${i + 1}`);
            confidence -= 15;
            missingDateRanges = true;
          }
        }
      }
    }
  }

  // Check if asset creation year is before first provenance record
  if (asset.year && provenance.length > 0) {
    const firstRecord = provenance
      .filter(p => p.dateFrom)
      .sort((a, b) => (a.dateFrom?.getTime() || 0) - (b.dateFrom?.getTime() || 0))[0];
    
    if (firstRecord?.dateFrom) {
      const assetYear = new Date(asset.year, 0, 1).getTime();
      if (assetYear < firstRecord.dateFrom.getTime()) {
        flags.push('Asset creation year is before first provenance record');
        confidence -= 20;
      }
    }
  }

  // Ensure confidence is between 0 and 100
  confidence = Math.max(0, Math.min(100, confidence));

  return {
    confidence,
    flags,
    missingDateRanges,
  };
}
