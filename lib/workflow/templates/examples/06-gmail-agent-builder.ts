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

import type { WorkflowTemplate } from '../types';

export const gmailAgentBuilderTemplate: WorkflowTemplate = {
  id: 'gmail-agent-builder',
  name: 'Gmail Agent Builder',
  description: 'Authenticate with Gmail and build AI agents for email management, drafting, and automation',
  category: 'productivity',
  tags: ['gmail', 'email', 'automation', 'oauth', 'arcade'],
  difficulty: 'intermediate',
  estimatedTime: '10-15 min',
  
  previewImage: '/templates/gmail-agent.png',
  
  requiredIntegrations: ['arcade', 'openai'],
  
  nodes: [
    // Start Node
    {
      id: 'start-1',
      type: 'start',
      position: { x: 100, y: 100 },
      data: {
        label: 'Start',
        description: 'Gmail Agent workflow starts here',
      },
    },

    // Gmail Authentication via Arcade
    {
      id: 'arcade-1',
      type: 'arcade',
      position: { x: 100, y: 220 },
      data: {
        label: 'Authenticate Gmail',
        description: 'OAuth authentication with Gmail via Arcade',
        toolId: 'Google.Gmail.Authorize',
        inputs: {
          scopes: [
            'gmail.readonly',
            'gmail.send',
            'gmail.compose',
            'gmail.modify'
          ].join(' '),
        },
        outputKey: 'gmailAuth',
      },
    },

    // Agent Node - Gmail Email Manager
    {
      id: 'agent-1',
      type: 'agent',
      position: { x: 100, y: 380 },
      data: {
        label: 'Gmail AI Agent',
        description: 'AI agent with Gmail tools for email management',
        model: 'gpt-4o-mini',
        provider: 'openai',
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
        description: 'Gmail agent workflow complete',
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

  examples: [
    {
      title: 'Read Recent Emails',
      prompt: 'Show me my 5 most recent unread emails',
      description: 'Lists recent unread messages from inbox',
    },
    {
      title: 'Search Emails',
      prompt: 'Find all emails from john@example.com about the project proposal',
      description: 'Searches emails by sender and keywords',
    },
    {
      title: 'Draft Professional Email',
      prompt: 'Draft an email to sarah@company.com thanking her for the meeting and proposing a follow-up next week',
      description: 'Creates a professional draft email',
    },
    {
      title: 'Send Email',
      prompt: 'Send an email to team@company.com with subject "Weekly Update" and body "Here is our progress this week..."',
      description: 'Composes and sends an email',
    },
    {
      title: 'Summarize Thread',
      prompt: 'Read the email thread with ID abc123 and give me a brief summary',
      description: 'Reads and summarizes an email conversation',
    },
    {
      title: 'Organize Inbox',
      prompt: 'Find all emails with receipts and add the "Receipts" label to them',
      description: 'Searches and labels emails for organization',
    },
    {
      title: 'Archive Old Emails',
      prompt: 'Archive all emails older than 30 days from newsletters@site.com',
      description: 'Cleans up inbox by archiving old messages',
    },
  ],

  usageInstructions: `
# Gmail Agent Builder

This template creates an AI agent that can interact with your Gmail account.

## Setup

1. **Arcade API Key**: Add your Arcade AI API key in Settings
2. **OpenAI API Key**: Add your OpenAI API key for the AI agent
3. **Gmail OAuth**: When you run the workflow, you'll be prompted to authenticate with Gmail

## Gmail Permissions

The agent requests these Gmail scopes:
- \`gmail.readonly\` - Read emails
- \`gmail.send\` - Send emails  
- \`gmail.compose\` - Create drafts
- \`gmail.modify\` - Add labels, archive, delete

## Example Use Cases

### Email Management
- "Show me all unread emails from my boss"
- "Archive all promotional emails from the last week"
- "Find emails about the Q4 budget and label them"

### Email Drafting
- "Draft a professional out-of-office reply"
- "Write an email to decline a meeting politely"
- "Create a follow-up email thanking them for their time"

### Email Analysis
- "Summarize the conversation with client@company.com"
- "What are the action items from today's emails?"
- "Who sent me the most emails this week?"

### Automation
- "Send a reminder email to the team about tomorrow's meeting"
- "Find all emails with attachments and create a list"
- "Delete all spam emails from unknown senders"

## Tips

- Be specific about email subjects and recipients
- Always review drafts before sending
- Use Gmail search syntax (from:, to:, subject:, after:, before:)
- The agent will ask for confirmation before destructive actions

## Security

- Your Gmail credentials are handled securely by Arcade OAuth
- The agent only has access during the workflow execution
- You can revoke access anytime in your Google Account settings
  `,

  changelog: [
    {
      version: '1.0.0',
      date: '2024-01-15',
      changes: [
        'Initial Gmail Agent Builder template',
        'OAuth authentication via Arcade',
        'Read, send, draft, and organize emails',
        'Smart email summarization',
      ],
    },
  ],
};
