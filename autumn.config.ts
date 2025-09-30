import { feature, product, priceItem, featureItem, pricedFeatureItem } from "atmn";

export const apiCalls = feature({
  id: "api_calls",
  name: "API Calls",
  type: "single_use",
});

export const projects = feature({
  id: "projects",
  name: "Projects",
  type: "continuous_use",
});

export const teamMembers = feature({
  id: "team_members",
  name: "Team Members",
  type: "continuous_use",
});

export const support = feature({
  id: "support",
  name: "Support Level",
  type: "boolean",
});

export const advancedAnalytics = feature({
  id: "advanced_analytics",
  name: "Advanced Analytics",
  type: "boolean",
});

export const customWorkflows = feature({
  id: "custom_workflows",
  name: "Custom Workflows",
  type: "boolean",
});

export const sso = feature({
  id: "sso",
  name: "Single Sign-On",
  type: "boolean",
});

export const auditLogs = feature({
  id: "audit_logs",
  name: "Audit Logs",
  type: "boolean",
});

export const customIntegration = feature({
  id: "custom_integration",
  name: "Custom Integration",
  type: "boolean",
});

export const free = product({
  id: "free",
  name: "Free",
  is_default: true,
  items: [
    featureItem({
      feature_id: apiCalls.id,
      included_usage: 1000,
      interval: "month",
    }),
    featureItem({
      feature_id: projects.id,
      included_usage: 1,
    }),
    featureItem({
      feature_id: teamMembers.id,
      included_usage: 1,
    }),
  ],
});

export const proMonthly = product({
  id: "pro_monthly",
  name: "Pro Monthly",
  items: [
    priceItem({
      price: 49,
      interval: "month",
    }),
    featureItem({
      feature_id: apiCalls.id,
      included_usage: 50000,
      interval: "month",
    }),
    featureItem({
      feature_id: projects.id,
      included_usage: 10,
    }),
    featureItem({
      feature_id: teamMembers.id,
      included_usage: 5,
    }),
    featureItem({
      feature_id: advancedAnalytics.id,
    }),
    featureItem({
      feature_id: customWorkflows.id,
    }),
  ],
});

export const proAnnual = product({
  id: "pro_annual",
  name: "Pro Annual",
  items: [
    priceItem({
      price: 490,
      interval: "year",
    }),
    featureItem({
      feature_id: apiCalls.id,
      included_usage: 50000,
      interval: "month",
    }),
    featureItem({
      feature_id: projects.id,
      included_usage: 10,
    }),
    featureItem({
      feature_id: teamMembers.id,
      included_usage: 5,
    }),
    featureItem({
      feature_id: advancedAnalytics.id,
    }),
    featureItem({
      feature_id: customWorkflows.id,
    }),
  ],
});

export const enterpriseMonthly = product({
  id: "enterprise_monthly",
  name: "Enterprise Monthly",
  items: [
    priceItem({
      price: 199,
      interval: "month",
    }),
    featureItem({
      feature_id: apiCalls.id,
      included_usage: -1,
    }),
    featureItem({
      feature_id: projects.id,
      included_usage: -1,
    }),
    featureItem({
      feature_id: teamMembers.id,
      included_usage: -1,
    }),
    featureItem({
      feature_id: advancedAnalytics.id,
    }),
    featureItem({
      feature_id: customWorkflows.id,
    }),
    featureItem({
      feature_id: sso.id,
    }),
    featureItem({
      feature_id: auditLogs.id,
    }),
    featureItem({
      feature_id: customIntegration.id,
    }),
  ],
});

export const enterpriseAnnual = product({
  id: "enterprise_annual",
  name: "Enterprise Annual",
  items: [
    priceItem({
      price: 1990,
      interval: "year",
    }),
    featureItem({
      feature_id: apiCalls.id,
      included_usage: -1,
    }),
    featureItem({
      feature_id: projects.id,
      included_usage: -1,
    }),
    featureItem({
      feature_id: teamMembers.id,
      included_usage: -1,
    }),
    featureItem({
      feature_id: advancedAnalytics.id,
    }),
    featureItem({
      feature_id: customWorkflows.id,
    }),
    featureItem({
      feature_id: sso.id,
    }),
    featureItem({
      feature_id: auditLogs.id,
    }),
    featureItem({
      feature_id: customIntegration.id,
    }),
  ],
});