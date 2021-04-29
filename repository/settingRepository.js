import { executeSql } from './sqlite';

export const getSetting = () => {
  const result = executeSql(`
    SELECT
      *
    FROM
      settings
    ;
  `,
  []);

  return result;
};
