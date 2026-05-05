import reasonsMap from './disputeReasonsMap.json';

type ReasonEntry = {
  title: string;
  description: string;
};

export const getReasonDisplay = (codeOrLabel: string): ReasonEntry => {
  // Backend might return codes (e.g. OWNER_ALIVE) or human labels.
  const asCode = String(codeOrLabel).toUpperCase();
  if ((reasonsMap as any)[asCode]) {
    return (reasonsMap as any)[asCode] as ReasonEntry;
  }

  // fallback: treat incoming string as label and fabricate simple description
  return {
    title: codeOrLabel,
    description: '',
  };
};

export default getReasonDisplay;
