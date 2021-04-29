import { executeSql } from './sqlite';

export const addTask = (data) => {
  executeSql(`
    INSERT INTO tasks (
      title,
      content,
      is_important
    ) values (
      ?,
      ?,
      ?
    );
  `,
  [
    data.title.length === 0 ? data.content.substr(0, 20) : data.title,
    data.content,
    data.isImportant,
  ]);
};

export const updateTaskContent = (data) => {
  executeSql(`
    UPDATE
      tasks
    SET
      title = ?,
      content = ?
    WHERE
      task_id = ?  
    ;
  `,
  [
    data.title === '' ? data.content.substr(0, 20) : data.title,
    data.content,
    data.taskId,
  ]);
};

export const changeCheckState = (data) => {
  executeSql(`
    UPDATE
      tasks
    SET
      is_checked = ?
    WHERE
      task_id = ?  
    ;
  `,
  [
    data.toCheckState,
    data.taskId,
  ]);
};

export const changeImportantState = (data) => {
  executeSql(`
    UPDATE
      tasks
    SET
      is_important = ?
    WHERE
      task_id = ?  
    ;
  `,
  [
    data.toImportantState,
    data.taskId,
  ]);
};

export const changeTaskTitle = (data) => {
  executeSql(`
    UPDATE
      tasks
    SET
      title = ?
    WHERE
      task_id = ?  
    ;
  `,
  [
    data.title,
    data.taskId,
  ]);
};

export const changeTaskContent = (data) => {
  executeSql(`
    UPDATE
      tasks
    SET
      content = ?
    WHERE
      task_id = ?  
    ;
  `,
  [
    data.content,
    data.taskId,
  ]);
};

export const deleteTask = (data) => {
  executeSql(`
    UPDATE
      tasks
    SET
      is_deleted = 1
    WHERE
      task_id = ?
    ;
  `,
  [
    data.taskId,
  ]);
};

export const restoreTaskData = (data) => {
  executeSql(`
    UPDATE
      tasks
    SET
      is_deleted = 0
    WHERE
      task_id = ?
    ;
  `,
  [
    data.taskId,
  ]);
};

export const deleteTaskCompletely = (data) => {
  executeSql(`
    DELETE FROM tasks
    WHERE
      task_id = ?
    ;
  `,
  [
    data.taskId,
  ]);
};

export const addTaskList = (data) => {
  const result = executeSql(`
    SELECT
      *
    FROM
      tasks
    WHERE
      ${data.taskTypeCondition}
      ${data.taskStateCondition}
      task_id < ? AND
      is_deleted = 0
    ORDER BY
      task_id DESC
    LIMIT ?
    ;
  `,
  [
    data.lastTaskId,
    data.limitCount,
  ]);

  return result;
};

export const getTaskList = (data) => {
  const result = executeSql(`
    SELECT
      *
    FROM
      tasks
    WHERE
      ${data.taskTypeCondition}
      ${data.taskStateCondition}
      is_deleted = 0
    ORDER BY
      task_id DESC
    LIMIT ?
    ;
  `,
  [
    data.limitCount,
  ]);

  return result;
};

export const getTaskById = (data) => {
  const result = executeSql(`
    SELECT
      *
    FROM
      tasks
    WHERE
      task_id = ?
    ;
  `,
  [
    data.taskId,
  ]);

  return result;
};

export const searchTasks = (data) => {
  const result = executeSql(`
    SELECT
      *
    FROM
      tasks
    WHERE
      ${data.taskTypeCondition}
      ${data.taskStateCondition}
      (title LIKE '%${data.word}%' OR content LIKE '%${data.word}%') AND
      is_deleted = 0
    ORDER BY
      task_id DESC
    LIMIT ?
    ;
  `,
  [
    data.limitCount,
  ]);

  return result;
};

export const getTaskForHome = () => {
  const result = executeSql(`
    SELECT
      *
    FROM
      tasks
    WHERE
      is_important = 1 AND
      is_checked = 0 AND
      is_deleted = 0
    ORDER BY
      task_id DESC
    LIMIT 10
    ;
  `,
  []);

  return result;
};

export const getDeletedTaskData = () => {
  const result = executeSql(`
    SELECT
      *
    FROM
      tasks
    WHERE
      is_deleted = 1
    ORDER BY
      task_id DESC
    ;
  `,
  []);

  return result;
};
