import { executeSql } from './sqlite';

const init = () => {
  executeSql('DROP TABLE IF EXISTS settings;');
  executeSql(`
    CREATE TABLE settings (
      last_check_date TEXT NOT NULL,
      init_date TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
    );
  `);

  executeSql('DROP TABLE IF EXISTS tasks;');
  executeSql(`
    CREATE TABLE tasks (
      task_id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      is_important INTEGER,
      is_checked INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
      is_deleted INTEGER NOT NULL DEFAULT 0
    );
  `);

  executeSql('DROP TABLE IF EXISTS schedules;');
  executeSql(`
    CREATE TABLE schedules (
      sche_id INTEGER PRIMARY KEY AUTOINCREMENT,
      sche_date TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
      is_deleted INTEGER NOT NULL DEFAULT 0
    );
  `);
};

export default init;
