console.log('🤖 Marquee Agents runner starting...');

// Re-export from core
export { provenanceGapCheck } from '@marquee/core';

// Agent runner will be implemented here
const main = async () => {
  console.log('Agents service is running!');
};

main().catch(console.error);