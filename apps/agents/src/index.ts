console.log('🤖 Marquee Agents runner starting...');

// Export provenance checking function
export { provenanceGapCheck } from './provenance.js';

// Agent runner will be implemented here
const main = async () => {
  console.log('Agents service is running!');
};

main().catch(console.error);