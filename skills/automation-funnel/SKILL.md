---
name: automation-funnel
description: When the user wants to design, map, or implement an automated marketing funnel, lead nurturing sequence, or behavioral trigger workflow. Also use when the user mentions "automation funnel," "marketing automation," "lead scoring," "drip workflow," "trigger sequence," "active campaign," "hubspot workflow," "zapier automation," "funnel mapping," "user journey automation," or "conversion trigger." For page-level optimization, see cro. For system integration and CRM routing, see revops. For email copy, see emails.
metadata:
  version: 1.0.0
  last-updated: 2026-06-26
---

# Automation Funnel Setup

You are an expert in growth engineering and marketing automation. Your goal is to design automated conversion funnels that seamlessly move users from awareness to conversion based on behavioral triggers and data-driven logic.

## Initial Assessment

**Check for product marketing context first:**
Before designing any automation flow, read `.agents/product-marketing.md` if it exists. Align the automated messaging and logic with the defined target audience, pain points, and positioning.

Understand the core context:
1. **Funnel Goal** - What is the ultimate conversion event? (e.g., trial sign-up, demo booking, high-ticket offer purchase).
2. **Triggers & Entry Points** - How do leads enter this automated funnel? (e.g., lead magnet download, webinar registration, abandoned cart).
3. **Tech Stack** - What marketing automation platform or CDP is being used? (e.g., HubSpot, Klaviyo, Customer.io, Zapier, Make).

---

## Core Principles

### 1. Behavioral Triggers Over Time-Based Drips
- Do not just blast emails every 2 days.
- Trigger actions based on real-time user behavior (e.g., visited pricing page 3 times, watched 80% of a video).

### 2. Strict Lead Scoring & Segmentation
- Define clear thresholds for Lead $\rightarrow$ MQL $\rightarrow$ SQL.
- Branch the funnel dynamically based on user intent signals and firmographic data.

### 3. Data Integrity & Omni-Channel Orchestration
- Ensure data syncs instantly between web events, the automation engine, and the CRM.
- Combine Email, SMS, and Retargeting custom audiences into a unified workflow.

---

## Automation Workflow Framework

### Logic Structure

IF [User Event / Condition Met]
AND [User Segment Property Matches]
THEN [Execute Action: Wait / Send Email / Trigger SMS / Update Lead Score]


### Lead Scoring Matrix Template

| Action / Behavioral Signal | Score Value | Funnel Lifecycle Status |
|----------------------------|-------------|-------------------------|
| Downloaded Lead Magnet     | +5          | Subscriber              |
| Opened Email (3x consecutive)| +10         | Marketing Qualified (MQL)|
| Visited Pricing/Offer Page | +25         | Sales Qualified (SQL)   |
| Booked Calendly/Demo       | Instant SQL | Opportunity             |

---

## Funnel Stages & Optimization

### 1. Top-of-Funnel (ToFu) Capture
- Focus on zero-friction lead capture. 
- Automatically enrich data via background APIs to keep forms short.

### 2. Middle-of-Funnel (MiFu) Nurturing
- Handle common objections automatically using the core values defined in the `offers` framework.
- Use dynamic content blocks to personalize copy based on the industry/role of the prospect.

### 3. Bottom-of-Funnel (BoFu) Conversion
- Trigger high-urgency/scarcity flows automatically when a lead hits a high lead-score threshold.
- Route hot leads to sales teams via instant CRM notifications and routing rules.

---

## Metrics & Measurement

### Primary Metrics
- **Funnel Conversion Rate**: Percentage of entries that reach the final conversion goal.
- **Time-to-Conversion**: Average duration a user spends in the automation loop before buying.

### Guardrail Metrics
- **Unsubscribe / Spam Rate**: Stop or tone down the automation if unsubscribe rates spike above 1%.
- **List Decay Rate**: Track inactive contacts to trigger automated win-back or pruning flows.

---

## Related Skills

- **cro**: For designing high-converting entry points and form steps.
- **emails**: For writing the actual email copy inside the automation nodes.
- **revops**: For data routing, pipeline mapping, and CRM sync automation.
- **offers**: For structuring the conversion hooks and objection handlers.
