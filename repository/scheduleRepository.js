import { executeSql } from './sqlite';

export const addSchedule = (data) => {
  executeSql(`
    INSERT INTO schedules (
      sche_date,
      content
    ) values (
      ?,
      ?
    );
  `,
  [
    data.date,
    data.content,
  ]);
};

export const updateScheduleDataById = (data) => {
  executeSql(`
    UPDATE
      schedules
    SET
      content = ?
    WHERE
      sche_id = ?
  `,
  [
    data.content,
    data.scheId,
  ]);
};

export const deleteScheduleCompletely = (data) => {
  executeSql(`
    DELETE FROM schedules
    WHERE
      sche_id = ?
    ;
  `,
  [
    data.scheId,
  ]);
};

export const deleteScheduleDataById = (data) => {
  executeSql(`
    UPDATE
      schedules
    SET
      is_deleted = 1
    WHERE
      sche_id = ?
  `,
  [
    data.scheId,
  ]);
};

export const restoreScheduleData = (data) => {
  executeSql(`
    UPDATE
      schedules
    SET
      is_deleted = 0
    WHERE
      sche_id = ?
  `,
  [
    data.scheId,
  ]);
};

export const getScheduleDataById = (data) => {
  const result = executeSql(`
    SELECT
      *
    FROM
      schedules
    WHERE
      sche_id = ?
    ;
  `,
  [
    data.scheId,
  ]);

  return result;
};

export const getMonthScheduleData = (data) => {
  const result = executeSql(`
    SELECT
      *
    FROM
      schedules
    WHERE
      sche_date >= ? AND
      sche_date <= ? AND
      is_deleted = 0
    ;
  `,
  [
    data.fromDate,
    data.toDate,
  ]);

  return result;
};

export const getDateData = (data) => {
  const result = executeSql(`
    SELECT
      *
    FROM
      schedules
    WHERE
      sche_date = ? AND
      is_deleted = 0
    ORDER BY
      sche_id DESC
    ;
  `,
  [
    data.date,
  ]);

  return result;
};

export const getScheduleForHome = (data) => {
  const result = executeSql(`
    SELECT
      sche_id,
      sche_date,
      content,
      created_at
    FROM
      schedules
    WHERE
      sche_date >= ? AND
      is_deleted = 0
    ORDER BY
      sche_date ASC
    LIMIT 10
    ;
  `,
  [
    data.date,
  ]);

  return result;
};

export const getDeletedScheduleData = () => {
  const result = executeSql(`
    SELECT
      *
    FROM
      schedules
    WHERE
      is_deleted = 1
    ORDER BY
      sche_date ASC
    ;
  `,
  []);

  return result;
};
