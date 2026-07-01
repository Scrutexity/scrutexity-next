import Database from 'better-sqlite3';
import path from 'path';

// Define the database path (we'll store it in the project root for this example)
const dbPath = path.join(process.cwd(), 'telemetry.db');
const db = new Database(dbPath);

// Initialize the database schema and insert some seed data if it's empty
db.exec(`
  CREATE TABLE IF NOT EXISTS telemetry (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    claimHealthScore INTEGER NOT NULL,
    unsupportedLanguageCount INTEGER NOT NULL,
    proofArtifactsCount INTEGER NOT NULL,
    aiAnswerSurfacesCount INTEGER NOT NULL,
    recoveryWorkflowsCount INTEGER NOT NULL,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const stmt = db.prepare('SELECT COUNT(*) as count FROM telemetry');
const row = stmt.get() as { count: number };

if (row.count === 0) {
  const insert = db.prepare(`
    INSERT INTO telemetry (
      claimHealthScore, 
      unsupportedLanguageCount, 
      proofArtifactsCount, 
      aiAnswerSurfacesCount, 
      recoveryWorkflowsCount
    ) VALUES (?, ?, ?, ?, ?)
  `);
  insert.run(84, 2, 6, 5, 3);
}

export function getTelemetryData() {
  const query = db.prepare('SELECT * FROM telemetry ORDER BY updatedAt DESC LIMIT 1');
  return query.get() as {
    claimHealthScore: number;
    unsupportedLanguageCount: number;
    proofArtifactsCount: number;
    aiAnswerSurfacesCount: number;
    recoveryWorkflowsCount: number;
    updatedAt: string;
  };
}
