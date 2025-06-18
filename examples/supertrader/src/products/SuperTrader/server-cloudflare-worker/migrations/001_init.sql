-- Table Definition
CREATE TABLE IF NOT EXISTS use_cases (
    "aggregateId" uuid NOT NULL,
    "appName" varchar(255) NOT NULL,
    "createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" jsonb,
    "executionMode" varchar(255) NOT NULL,
    "id" uuid NOT NULL,
    "input" jsonb,
    "name" varchar(255) NOT NULL,
    "organizationId" uuid,
    "userId" uuid,
    PRIMARY KEY ("id")
);

-- Indices
CREATE INDEX IF NOT EXISTS use_cases_aggregate_id_index ON use_cases (aggregateId);
CREATE INDEX IF NOT EXISTS use_cases_name_index ON use_cases (name);
CREATE INDEX IF NOT EXISTS use_cases_organization_id_index ON use_cases (organizationId);
CREATE INDEX IF NOT EXISTS use_cases_user_id_index ON use_cases (userId);
