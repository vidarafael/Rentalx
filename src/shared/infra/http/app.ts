import { Request, Response, NextFunction } from 'express'
import express from 'express';
import "express-async-errors"
import swaggerUi from 'swagger-ui-express';
import "reflect-metadata"

import "@shared/container"
import createConnection from "@shared/infra/typeorm"
import { AppError } from '@shared/errors/AppError';

import { router } from './routes';
import swaggerFile from "../../../swagger.json"

createConnection()
const app = express();

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    })
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  })
})

export { app }