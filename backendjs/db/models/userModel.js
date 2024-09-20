const sql = require('../config');

async function insertUser(firstName, lastName, email, password) {
  const query = `
    INSERT INTO Users (firstName, lastName, email, password, created_at, updated_at)
    VALUES (${firstName}, ${lastName}, ${email}, ${password}, NOW(), NOW())
    RETURNING id;
  `;
  const result = await sql(query);
  return result[0].id;
}

module.exports = {
  insertUser
};
