const { Sequelize } = require("sequelize");

const sequelize = require("../db/db");

const Post = sequelize.define("post", {
  post_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  policy_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  public_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  // created_at: {
  //   type: Sequelize.DATE,
  //   allowNull: false,
  // },
});

module.exports = Post;
