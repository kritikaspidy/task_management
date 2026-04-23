const { User, Task } = require('../models');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.status(200).json({
      message: 'Users fetched successfully',
      users,
    });
  } catch (err) {
    return next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User fetched successfully',
      user,
    });
  } catch (err) {
    return next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await User.destroy(req.params.id);

    res.status(200).json({
      message: 'User deleted successfully',
      user,
    });
  } catch (err) {
    return next(err);
  }
};

const createAdminTask = async (req, res, next) => {
  const { title, description, status, priority, due_date, assigned_to } = req.body;

  try {
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    if (assigned_to) {
      const userCheck = await User.findById(assigned_to);
      if (!userCheck) {
        return res.status(404).json({ error: 'Assigned user not found' });
      }
    }

    const task = await Task.create({
      title,
      description: description || null,
      status: status || 'pending',
      priority: priority || 'medium',
      due_date: due_date || null,
      created_by: req.user.id,
      assigned_to: assigned_to || null,
    });

    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (err) {
    return next(err);
  }
};

const getAllTasksAdmin = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({ orderBy: 'created_at', order: 'DESC' });

    res.status(200).json({
      message: 'All tasks fetched successfully',
      tasks,
    });
  } catch (err) {
    return next(err);
  }
};

const getTaskByIdAdmin = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({
      message: 'Task fetched successfully',
      task,
    });
  } catch (err) {
    return next(err);
  }
};

const updateTaskAdmin = async (req, res, next) => {
  const { title, description, status, priority, due_date, assigned_to } = req.body;

  try {
    const existingTask = await Task.findById(req.params.id);

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (assigned_to) {
      const userCheck = await User.findById(assigned_to);
      if (!userCheck) {
        return res.status(404).json({ error: 'Assigned user not found' });
      }
    }

    const updatedTask = await Task.update(req.params.id, {
      title: title ?? existingTask.title,
      description: description ?? existingTask.description,
      status: status ?? existingTask.status,
      priority: priority ?? existingTask.priority,
      due_date: due_date ?? existingTask.due_date,
      assigned_to: assigned_to ?? existingTask.assigned_to,
    });

    res.status(200).json({
      message: 'Task updated successfully',
      task: updatedTask,
    });
  } catch (err) {
    return next(err);
  }
};

const deleteTaskAdmin = async (req, res, next) => {
  try {
    const rowCount = await Task.destroy(req.params.id);

    if (!rowCount) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (err) {
    return next(err);
  }
};

const assignTaskToUser = async (req, res, next) => {
  const { assigned_to } = req.body;

  try {
    if (!assigned_to) {
      return res.status(400).json({ error: 'assigned_to is required' });
    }

    const existingTask = await Task.findById(req.params.id);
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const userCheck = await User.findById(assigned_to);
    if (!userCheck) {
      return res.status(404).json({ error: 'Assigned user not found' });
    }

    const updatedTask = await Task.update(req.params.id, {
      title: existingTask.title,
      description: existingTask.description,
      status: existingTask.status,
      priority: existingTask.priority,
      due_date: existingTask.due_date,
      assigned_to,
    });

    res.status(200).json({
      message: 'Task assigned successfully',
      task: updatedTask,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  createAdminTask,
  getAllTasksAdmin,
  getTaskByIdAdmin,
  updateTaskAdmin,
  deleteTaskAdmin,
  assignTaskToUser,
};