// middleware/validate.js
export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      req.body = await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (err) {
      const errorMessages = err.details.map(detail => detail.message);
      res.status(400).json({ errors: errorMessages });
    }
  };
};
