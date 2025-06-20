-- Table Definition
CREATE TABLE IF NOT EXISTS uc_executions (
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
CREATE INDEX IF NOT EXISTS uc_executions_aggregate_id_index ON uc_executions (aggregateId);
CREATE INDEX IF NOT EXISTS uc_executions_name_index ON uc_executions (name);
CREATE INDEX IF NOT EXISTS uc_executions_organization_id_index ON uc_executions (organizationId);
CREATE INDEX IF NOT EXISTS uc_executions_user_id_index ON uc_executions (userId);