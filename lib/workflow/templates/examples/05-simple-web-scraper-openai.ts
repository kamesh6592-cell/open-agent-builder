import { Workflow } from '../../types';

/**
 * Simple Web Scraper with OpenAI
 * 
 * A basic web scraping workflow that uses HTTP nodes and OpenAI for analysis.
 * No MCP required - works with any AI provider!
 * 
 * Flow: Start -> HTTP (Fetch) -> Agent (Analyze) -> End
 */
export const simpleWebScraperOpenAI: Workflow = {
  id: 'simple-web-scraper-openai',
  name: 'Simple Web Scraper (OpenAI)',
  description: 'Scrape and analyze web content using HTTP + OpenAI',
  category: 'templates',
  tags: ['scraping', 'openai', 'http', 'beginner'],
  estimatedTime: '1-2 minutes',
  difficulty: 'beginner',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  nodes: [
    {
      id: 'start',
      type: 'start',
      position: { x: 100, y: 200 },
      data: {
        label: 'Start',
        nodeType: 'start',
        nodeName: 'Start',
        inputVariables: [
          {
            name: 'url',
            type: 'string',
            required: true,
            description: 'Enter the URL to scrape',
            defaultValue: 'https://example.com',
          },
        ],
      },
    },
    {
      id: 'fetch-content',
      type: 'http',
      position: { x: 350, y: 200 },
      data: {
        label: 'Fetch Web Content',
        nodeType: 'http',
        nodeName: 'Fetch Content',
        url: '{{input.url}}',
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      },
    },
    {
      id: 'analyze-content',
      type: 'agent',
      position: { x: 600, y: 200 },
      data: {
        label: 'Analyze Content',
        nodeType: 'agent',
        nodeName: 'Content Analyzer',
        instructions: `Analyze the web page content and provide a summary.

Content:
{{lastOutput}}

Please provide:
1. Main topic/theme
2. Key points (3-5 bullet points)
3. Brief summary (2-3 sentences)`,
        model: 'openai/gpt-4',
        outputFormat: 'Text',
      },
    },
    {
      id: 'end',
      type: 'end',
      position: { x: 850, y: 200 },
      data: {
        label: 'End',
        nodeType: 'end',
        nodeName: 'End',
      },
    },
  ],
  edges: [
    { id: 'e1', source: 'start', target: 'fetch-content' },
    { id: 'e2', source: 'fetch-content', target: 'analyze-content' },
    { id: 'e3', source: 'analyze-content', target: 'end' },
  ],
};
