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
            name: 'task',
            type: 'string',
            required: true,
            description: 'What would you like to do with your Gmail?',
            defaultValue: 'Show me my 5 most recent unread emails',
          },
        ],
      },
    },

    // Gmail Authentication via Arcade
    {
      id: 'arcade-1',
      type: 'arcade',
      position: { x: 100, y: 220 },
      data: {
        label: 'Authenticate Gmail',
        nodeType: 'arcade',
        arcadeTool: 'Google.Gmail.Authorize',
        arcadeParams: {
          scopes: 'gmail.readonly gmail.send gmail.compose gmail.modify',
        },
        arcadeUserId: 'workflow-user',
      },
    },

    // Agent Node - Gmail Email Manager
    {
      id: 'agent-1',
      type: 'agent',
      position: { x: 100, y: 380 },
      data: {
        label: 'Gmail AI Agent',
        nodeType: 'agent',
        model: 'gpt-4o-mini',
        systemPrompt: `You are a helpful Gmail assistant with access to email management tools.

Your capabilities include:
- Reading and searching emails
- Drafting and sending professional emails
- Organizing emails with labels
- Archiving and deleting emails
- Summarizing long email threads
- Generating context-aware replies

Always:
1. Confirm before sending emails
2. Use professional and clear language
3. Respect user privacy and data
4. Ask for clarification when needed
5. Provide summaries of actions taken

When drafting emails:
- Use appropriate greetings and signatures
- Keep tone professional yet friendly
- Proofread for grammar and clarity
- Format content for readability`,
        tools: [
          {
            type: 'arcade',
            toolId: 'Google.Gmail.ReadEmail',
            name: 'read_email',
            description: 'Read a specific email by ID',
          },
          {
            type: 'arcade',
            toolId: 'Google.Gmail.SearchEmails',
            name: 'search_emails',
            description: 'Search emails using Gmail query syntax (from:, to:, subject:, etc.)',
          },
          {
            type: 'arcade',
            toolId: 'Google.Gmail.SendEmail',
            name: 'send_email',
            description: 'Send an email with subject and body',
          },
          {
            type: 'arcade',
            toolId: 'Google.Gmail.CreateDraft',
            name: 'create_draft',
            description: 'Create an email draft without sending',
          },
          {
            type: 'arcade',
            toolId: 'Google.Gmail.ListEmails',
            name: 'list_emails',
            description: 'List recent emails from inbox',
          },
          {
            type: 'arcade',
            toolId: 'Google.Gmail.AddLabel',
            name: 'add_label',
            description: 'Add a label to an email',
          },
          {
            type: 'arcade',
            toolId: 'Google.Gmail.ArchiveEmail',
            name: 'archive_email',
            description: 'Archive an email (remove from inbox)',
          },
          {
            type: 'arcade',
            toolId: 'Google.Gmail.DeleteEmail',
            name: 'delete_email',
            description: 'Move an email to trash',
          },
        ],
        maxIterations: 15,
        temperature: 0.7,
      },
    },

    // End Node
    {
      id: 'end-1',
      type: 'end',
      position: { x: 100, y: 560 },
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
