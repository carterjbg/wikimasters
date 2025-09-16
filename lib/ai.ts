// AI stub - in production replace with Vercel AI SDK
// TODO: Replace with real AI service (OpenAI, Anthropic, etc.)

export async function summarizePage(content: string): Promise<string> {
  console.log('🤖 [AI STUB] Summarizing page content...');

  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return the first 200 characters as a "summary"
  const summary = content
    .replace(/[#*`]/g, '') // Remove markdown symbols
    .substring(0, 200)
    .trim();

  return `${summary}...`;
}

export async function generateTitle(content: string): Promise<string> {
  console.log('🤖 [AI STUB] Generating title from content...');

  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Extract first line or return generic title
  const firstLine = content.split('\n')[0];
  if (firstLine && firstLine.length > 0) {
    return firstLine.replace(/[#*`]/g, '').substring(0, 50).trim();
  }

  return 'Generated Title';
}

export async function improveWriting(content: string): Promise<string> {
  console.log('🤖 [AI STUB] Improving writing style...');

  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 700));

  // Just return the original content
  // In production, this would use AI to improve grammar, clarity, etc.
  return content;
}

export async function generateOutline(topic: string): Promise<string> {
  console.log(`🤖 [AI STUB] Generating outline for topic: ${topic}`);

  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Return a simple outline template
  return `# ${topic}

## Introduction
Brief overview of ${topic}

## Key Concepts
- Concept 1
- Concept 2
- Concept 3

## Details
Detailed explanation goes here

## Examples
Practical examples

## Conclusion
Summary of key points`;
}

export async function suggestRelatedTopics(content: string): Promise<string[]> {
  console.log('🤖 [AI STUB] Suggesting related topics...');

  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Return some generic related topics
  return ['Related Topic 1', 'Related Topic 2', 'Related Topic 3'];
}

export async function checkGrammar(
  content: string,
): Promise<{ issues: number; suggestions: string[] }> {
  console.log('🤖 [AI STUB] Checking grammar...');

  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return no issues found
  return {
    issues: 0,
    suggestions: [],
  };
}
