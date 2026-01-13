export interface Asset {
  id: string;
  title: string;
  creator?: string | null;
  year?: number | null;
  medium?: string | null;
  dimensions?: string | null;
  location?: string | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProvenanceRecord {
  id: string;
  assetId: string;
  owner?: string | null;
  dateFrom?: Date | null;
  dateTo?: Date | null;
  location?: string | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAssetInput {
  title: string;
  creator?: string;
  year?: number;
  medium?: string;
  dimensions?: string;
  location?: string;
  notes?: string;
}

export interface ProvenanceGapCheck {
  confidence: number; // 0-100
  flags: string[];
  missingDateRanges: boolean;
}
