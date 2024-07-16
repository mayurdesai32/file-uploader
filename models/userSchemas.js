const { Sequelize } = require("sequelize");
const sequelize = require("../db/db");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "user",
  {
    user_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password1: {
      type: Sequelize.STRING,
      // allowNull: false,
    },
    role: {
      type: Sequelize.ENUM("USER", "ADMIN"),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user, options) => {
        if (user.password1) {
          try {
            console.log("Original Password:", user.password1);
            let hashedPassword = await bcrypt.hash(
              user.password1.toString(),
              12
            );
            user.password1 = hashedPassword;
            console.log("Hashed Password:", user.password1);
          } catch (error) {
            console.error("Error hashing password:", error);
            throw new Error("Error hashing password");
          }
        } else {
          throw new Error("Password is required");
        }
      },
    },
  }
);

module.exports = User;
