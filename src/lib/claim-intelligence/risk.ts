/**
 * Risk — exposure semantics and helpers.
 * Risk (exposure) and Status (evidence state) are distinct axes, but for a
 * typical claim they move together. riskToStatus gives the default mapping.
 */

import type { Risk, Status } from './types';

export const RISK_LABEL: Record<Risk, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export const RISK_ORDER: Record<Risk, number> = { high: 0, medium: 1, low: 2 };

export const RISK_TO_STATUS: Record<Risk, Status> = {
  high: 'unsupported',
  medium: 'weak',
  low: 'supported',
};

export function riskToStatus(risk: Risk): Status {
  return RISK_TO_STATUS[risk];
}

/** Recommended action label derived from a claim's status. */
export function actionForStatus(status: Status): string {
  switch (status) {
    case 'unsupported':
      return 'Rewrite needed';
    case 'weak':
      return 'Needs source';
    case 'supported':
      return 'Good';
  }
}
