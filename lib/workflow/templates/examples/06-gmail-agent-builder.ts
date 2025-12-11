/**
 * Gmail Agent Builder Template
 * 
 * Authenticate with Gmail and build AI agents that can:
 * - Read and search emails
 * - Draft and send emails
 * - Organize inbox (labels, archive, delete)
 * - Generate smart replies
 * - Summarize email threads
 * 
 * Uses Arcade AI for Gmail OAuth authentication
 */

import { Workflow } from '../../types';

export const gmailAgentBuilderTemplate: Workflow = {
  id: 'gmail-agent-builder',
  name: 'Gmail Agent Builder',
  description: 'Authenticate with Gmail and build AI agents for email management, drafting, and automation',
  category: 'productivity',
  tags: ['gmail', 'email', 'automation', 'oauth', 'arcade'],
  difficulty: 'intermediate',
  estimatedTime: '10-15 min',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  
  nodes: [
    // Start Node
    {
      id: 'start-1',
      type: 'start',
      position: { x: 100, y: 100 },
      data: {
        label: 'Start',
        nodeType: 'start',
        nodeName: 'Start',
        inputVariables: [
          {
            name: 'gmail_task',
            type: 'string',
            required: true,
            description: 'What would you like to do with Gmail? (e.g., list emails, search, send)',
            defaultValue: 'List my recent emails',
          },
        ],
      },
    },

    // Arcade Node - List Gmail Emails
    {
      id: 'arcade-1',
      type: 'arcade',
      position: { x: 100, y: 250 },
      data: {
        label: 'List Gmail Emails',
        nodeType: 'arcade',
        arcadeTool: 'Google.Gmail.ListEmails',
        arcadeInput: {
          maxResults: '10',
        },
        arcadeUserId: 'gmail-user',
      },
    },

    // Agent Node - Process Results
    {
      id: 'agent-1',
      type: 'agent',
      position: { x: 100, y: 400 },
      data: {
        label: 'Process Gmail Results',
        nodeType: 'agent',
        model: 'gpt-4o-mini',
        systemPrompt: `You are analyzing Gmail email data. 

The previous step retrieved emails from Gmail using Arcade. Your job is to:
1. Parse and summarize the email list
2. Present the information in a clear, readable format
3. Highlight important emails or patterns
4. Answer any questions about the emails

Format your response as a clean summary with:
- Number of emails found
- Brief overview of key emails
- Any notable patterns or urgent items`,
      },
    },

    // End Node
    {
      id: 'end-1',
      type: 'end',
      position: { x: 100, y: 550 },
      data: {
        label: 'Complete',
        nodeType: 'end',
      },
    },
  ],

  edges: [
    {
      id: 'edge-start-arcade',
      source: 'start-1',
      target: 'arcade-1',
      type: 'default',
    },
    {
      id: 'edge-arcade-agent',
      source: 'arcade-1',
      target: 'agent-1',
      type: 'default',
    },
    {
      id: 'edge-agent-end',
      source: 'agent-1',
      target: 'end-1',
      type: 'default',
    },
  ],
};
