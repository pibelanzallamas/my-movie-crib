const { Model, DataTypes } = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class Users extends Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}

Users.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isAlphanumeric: true },
    },
    salt: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isAlpha: true },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isAlpha: true },
    },
    urlTitle: {
      type: DataTypes.STRING,
    },
    route: {
      type: DataTypes.VIRTUAL,
      get() {
        return `/users/${this.urlTitle}`;
      },
    },
  },
  {
    sequelize: db,
    modelName: "users",
  }
);

Users.addHook("beforeValidate", (page) => {
  page.urlTitle = page.name.replace(/\s+/g, "_").replace(/\W/g, "") || page.id;
});

Users.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;

  return user.hash(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});

module.exports = Users;
