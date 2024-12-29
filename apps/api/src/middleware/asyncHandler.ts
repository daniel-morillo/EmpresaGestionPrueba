import { Request, Response, NextFunction } from "express";

// This function is a middleware that wraps an async function so that we can handle errors in a single place.

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

