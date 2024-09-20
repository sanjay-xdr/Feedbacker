const sql = require('../config');

async function insertUserPage(formName, formLink, userId) {
  const query = `
    INSERT INTO UserPages (formName, formLink, userId, created_at, updated_at)
    VALUES (${formName}, ${formLink}, ${userId}, NOW(), NOW())
    RETURNING id;
  `;
  const result = await sql(query);
  return result[0].id;
}

module.exports = {
  insertUserPage
};
