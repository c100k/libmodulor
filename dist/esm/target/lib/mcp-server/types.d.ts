import type { RegisteredTool } from '@modelcontextprotocol/sdk/server/mcp.js';
export type RegisterToolConfig = Pick<RegisteredTool, 'description' | 'inputSchema' | 'outputSchema' | 'title' | 'annotations' | '_meta'>;
