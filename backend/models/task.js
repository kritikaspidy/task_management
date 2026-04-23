const pool = require('../db');

const Task = {
  async findAll({ orderBy = 'created_at', order = 'DESC' } = {}) {
    const { rows } = await pool.query(
      `SELECT id, title, description, status, priority, due_date,
              created_by, assigned_to, created_at, updated_at
       FROM tasks
       ORDER BY ${orderBy} ${order}`
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(
      `SELECT id, title, description, status, priority, due_date,
              created_by, assigned_to, created_at, updated_at
       FROM tasks WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  },

  async findByUser(userId) {
    const { rows } = await pool.query(
      `SELECT id, title, description, status, priority, due_date,
              created_by, assigned_to, created_at, updated_at
       FROM tasks
       WHERE created_by = $1 OR assigned_to = $1
       ORDER BY created_at DESC`,
      [userId]
    );
    return rows;
  },

  async findOneByIdAndCreator(id, createdBy) {
    const { rows } = await pool.query(
      `SELECT id, title, description, status, priority, due_date,
              created_by, assigned_to, created_at, updated_at
       FROM tasks WHERE id = $1 AND created_by = $2`,
      [id, createdBy]
    );
    return rows[0] || null;
  },

  async findOneByIdAndUser(id, userId) {
    const { rows } = await pool.query(
      `SELECT id, title, description, status, priority, due_date,
              created_by, assigned_to, created_at, updated_at
       FROM tasks
       WHERE id = $1 AND (created_by = $2 OR assigned_to = $2)`,
      [id, userId]
    );
    return rows[0] || null;
  },

  async create({ title, description, status, priority, due_date, created_by, assigned_to }) {
    const { rows } = await pool.query(
      `INSERT INTO tasks (title, description, status, priority, due_date, created_by, assigned_to, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
       RETURNING id, title, description, status, priority, due_date, created_by, assigned_to, created_at, updated_at`,
      [title, description || null, status || 'pending', priority || 'medium', due_date || null, created_by, assigned_to || null]
    );
    return rows[0];
  },

  async update(id, { title, description, status, priority, due_date, assigned_to }) {
    const { rows } = await pool.query(
      `UPDATE tasks
       SET title = $1, description = $2, status = $3, priority = $4,
           due_date = $5, assigned_to = $6, updated_at = NOW()
       WHERE id = $7
       RETURNING id, title, description, status, priority, due_date, created_by, assigned_to, created_at, updated_at`,
      [title, description, status, priority, due_date, assigned_to, id]
    );
    return rows[0] || null;
  },

  async destroy(id, createdBy = null) {
    let query, params;
    if (createdBy !== null) {
      query = 'DELETE FROM tasks WHERE id = $1 AND created_by = $2';
      params = [id, createdBy];
    } else {
      query = 'DELETE FROM tasks WHERE id = $1';
      params = [id];
    }
    const { rowCount } = await pool.query(query, params);
    return rowCount;
  },
};

module.exports = Task;