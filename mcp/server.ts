// mcp/server.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { generateUtmLink } from "../cli/utm-generator.js";
import { cleanAndCalculateMetrics } from "../cli/data-cleaner.js";
import { EDUCATION_KPI } from "../shared/constants.js";
import { CampaignMetrics } from "../shared/types.js";

const server = new Server(
  { name: "performance-marketing-brain", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "generate_utm",
      description: "Tạo link tracking UTM chuẩn hóa.",
      inputSchema: {
        type: "object",
        properties: {
          baseUrl: { type: "string" },
          source: { type: "string", enum: ["facebook", "google", "tiktok", "email"] },
          medium: { type: "string", enum: ["cpc", "cpm", "organic", "newsletter"] },
          campaign: { type: "string" },
        },
        required: ["baseUrl", "source", "medium", "campaign"],
      },
    },
    {
      name: "analyze_roas_cpa",
      description: "Phân tích hiệu quả chiến dịch dựa trên KPI ngành giáo dục.",
      inputSchema: {
        type: "object",
        properties: {
          rawData: {
            type: "array",
            items: {
              type: "object",
              properties: {
                campaign_name: { type: "string" },
                spend: { type: "string" },
                leads: { type: "string" },
                purchases: { type: "string" },
                revenue: { type: "string" },
              }
            }
          }
        },
        required: ["rawData"],
      },
    }
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "generate_utm") {
    return { content: [{ type: "text", text: `Link UTM: ${generateUtmLink(args as any)}` }] };
  }

  if (name === "analyze_roas_cpa") {
    const metrics: CampaignMetrics[] = cleanAndCalculateMetrics((args as any).rawData);
    
    // Tự động đánh giá sức khỏe chiến dịch
    const analyzed = metrics.map(m => ({
      ...m,
      isHealthy: m.cpa <= EDUCATION_KPI.TARGET_CPA_THRESHOLD && m.roas >= EDUCATION_KPI.ROAS_MIN_LIMIT,
      note: m.cpa > EDUCATION_KPI.TARGET_CPA_THRESHOLD ? "CPA cao" : "Hiệu quả tốt"
    }));

    return { content: [{ type: "text", text: JSON.stringify(analyzed, null, 2) }] };
  }

  throw new Error("Tool không tồn tại");
});

const transport = new StdioServerTransport();
await server.connect(transport);
