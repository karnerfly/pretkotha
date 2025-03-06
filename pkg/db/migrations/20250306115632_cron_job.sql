-- migrate:up
CREATE OR REPLACE FUNCTION cleanup_unverified_users() RETURNS VOID AS $$
BEGIN
    DELETE FROM users
    WHERE verified = FALSE
    AND created_at <= NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql;

-- create extension for cron job (scheduling)
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA public;

-- create schedule for cleanup function
SELECT cron.schedule(
    'cleanup_job',  -- Unique job name
    '0 */48 * * *', -- Runs every 48 hours
    'SELECT cleanup_unverified_users();'
);

-- migrate:down
DROP EXTENSION IF EXISTS pg_cron;
DROP FUNCTION IF EXISTS cleanup_unverified_users;
