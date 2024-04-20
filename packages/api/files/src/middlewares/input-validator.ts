import { Request, Response, NextFunction } from "express";
// Middleware for input validation
const validateInput =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body against the specified schema
      schema.parse(req.body);
      next();
    } catch (error: any) {
      // If validation fails, send a 400 Bad Request response
      res.status(400).json({ error: error.errors });
    }
  };

export default validateInput