import { Workflow } from '../../types';

/**
 * Simple Question Answering with OpenAI
 * 
 * A basic workflow that uses OpenAI to answer questions.
 * Perfect for testing OpenAI/Groq API keys!
 * 
 * Flow: Start -> Agent (OpenAI) -> End
 */
export const simpleWebScraperOpenAI: Workflow = {
  id: 'simple-web-scraper-openai',
  name: 'Simple Q&A (OpenAI/Groq)',
  description: 'Ask any question and get an answer from OpenAI or Groq',
  category: 'templates',
  tags: ['openai', 'groq', 'beginner', 'question-answering'],
  estimatedTime: '30 seconds',
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
            name: 'question',
            type: 'string',
            required: true,
            description: 'Ask any question',
            defaultValue: 'What are the benefits of using AI agents?',
          },
        ],
      },
    },
    {
      id: 'answer-agent',
      type: 'agent',
      position: { x: 400, y: 200 },
      data: {
        label: 'Answer Question',
        nodeType: 'agent',
        nodeName: 'AI Assistant',
        instructions: `You are a helpful AI assistant. Answer the following question clearly and concisely:

Question: {{input.question}}

Provide a well-structured answer with relevant details.`,
        model: 'openai/gpt-4',
        outputFormat: 'Text',
      },
    },
    {
      id: 'end',
      type: 'end',
      position: { x: 700, y: 200 },
      data: {
        label: 'End',
        nodeType: 'end',
        nodeName: 'End',
      },
    },
  ],
  edges: [
    { id: 'e1', source: 'start', target: 'answer-agent' },
    { id: 'e2', source: 'answer-agent', target: 'end' },
  ],
};
