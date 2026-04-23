const pool = require('../db');

const User = {
  async findAll() {
    const { rows } = await pool.query(
      'SELECT id, username, role FROM users ORDER BY id DESC'
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(
      'SELECT id, username, role FROM users WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  },

  async findByIdWithPassword(id) {
    const { rows } = await pool.query(
      'SELECT id, username, password, role FROM users WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  },

  async findOne({ username }) {
    const { rows } = await pool.query(
      'SELECT id, username, password, role FROM users WHERE username = $1',
      [username]
    );
    return rows[0] || null;
  },

  async create({ username, password, role = 'user' }) {
    const { rows } = await pool.query(
      `INSERT INTO users (username, password, role, created_at, updated_at)
       VALUES ($1, $2, $3, NOW(), NOW())
       RETURNING id, username, role`,
      [username, password, role]
    );
    return rows[0];
  },

  async destroy(id) {
    const { rowCount } = await pool.query(
      'DELETE FROM users WHERE id = $1',
      [id]
    );
    return rowCount;
  },
};

module.exports = User;