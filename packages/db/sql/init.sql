CREATE TABLE IF NOT EXISTS file (
  file_id           uuid NOT NULL PRIMARY KEY,
  file_name         text NOT NULL,
  file_path         text NOT NULL,
  file_is_new       boolean NOT NULL,
  file_is_existent  boolean NOT NULL
);
