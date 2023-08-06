CREATE TABLE IF NOT EXISTS file (
  file_id           uuid NOT NULL PRIMARY KEY,
  file_name         text NOT NULL,
  file_path         text NOT NULL,
  file_is_existent  boolean NOT NULL,
  file_created_at   timestamptz NOT NULL,
  file_size         bigint
);

CREATE TABLE IF NOT EXISTS screenshot (
  screenshot_id           uuid NOT NULL PRIMARY KEY,
  file_id                 uuid NOT NULL REFERENCES file ON DELETE CASCADE,
  screenshot_name         text NOT NULL,
  screenshot_path         text NOT NULL,
  screenshot_resolution   text,
  CONSTRAINT unique_screenshot_name UNIQUE (file_id, screenshot_name)
);
