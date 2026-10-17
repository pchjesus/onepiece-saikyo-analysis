/**
 * App delivery version, whole-dataset version, individual Evaluation revisions,
 * calculation model version and frozen baseline version are separate concepts.
 * Historical evaluation.evaluationDataVersion values MUST NOT be overwritten.
 */
export const versionManifest = {
  appVersion: '0.4.24',
  coreDataVersion: 'core-v0.4.21',
  evaluationSetVersion: 'evaluation-set-v0.4.21',
  calculationModelId: 'balanced',
  calculationModelVersion: '1.2',
  baselineSnapshotVersion: 'v0.3.3',
  baselineSourceCommit: 'f544458364eeb69e31dbdbb4f97184eef5a98564',
} as const
