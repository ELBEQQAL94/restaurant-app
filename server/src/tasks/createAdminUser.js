const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function createAdminUser() {
  // find user who have role === "admin"
  const user = await User.findOne({ role: 'admin' });

  if (!user) {
    const data = {
      email: process.env.DEFAULT_ADMIN_EMAIL,
      username: process.env.DEFAULT_ADMIN_USERNAME,
      password: await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 12),
      active: true,
      role: 'admin',
    };


    User.create(data);
  }
}

createAdminUser();
