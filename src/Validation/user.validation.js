const AJV = require("ajv");
const ajv = new AJV();

class userValidation {
  static async check(schema, data) {
    return new Promise((resolve, reject) => {
      try {
        const validate = ajv.validate(schema, data);
        if (!validate) return reject(ajv.errorsText());
        resolve(null);
      } catch (err) {
        reject(err);
      }
    });
  }

  static async signup(req, res, next) {
    const schema = {
      type: "object",
      properties: {
        fullname: {
          type: "string",
          minLength: 3,
          maxLength: 50,
        },
        username: {
          type: "string",
          minLength: 5,
          maxLength: 15,
          pattern: "^[a-zA-Z0-9_]*$",
        },
        password: {
          type: "string",
          minLength: 5,
          maxLength: 15,
          pattern: "^[a-zA-Z0-9_]*$",
        },
      },
      required: ["fullname", "username", "password"],
      additionalProperties: false,
    };

    try {
      const data = await req.body;
      await userValidation.check(schema, data);
      next();
    } catch (err) {
      res.status(400).json({
        message: err,
        variant: "error",
      });
    }
  }

  static async signin(req, res, next) {
    const schema = {
      type: "object",
      properties: {
        username: {
          type: "string",
          minLength: 5,
          maxLength: 15,
          pattern: "^[a-zA-Z0-9_]*$",
        },
        password: {
          type: "string",
          minLength: 5,
          maxLength: 15,
          pattern: "^[a-zA-Z0-9_]*$",
        },
      },
      required: ["username", "password"],
      additionalProperties: false,
    };

    try {
      const data = await req.body;
      await userValidation.check(schema, data);
      next();
    } catch (err) {
      res.status(400).json({
        message: err,
        variant: "error",
      });
    }
  }
}

module.exports = userValidation;
