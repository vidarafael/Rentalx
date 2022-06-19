import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    throw new AppError("Token missing", 401)
  }

  const [, token] = authHeaders.split(" ")

  try {
    const { sub: user_id } = verify(
      token,
      'cfe275a5908b5650488e0b0342c2d6cc'
    ) as IPayload

    const usersRepository = new UsersRepository()

    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new AppError("User does not exists!", 401)
    }

    next()
  } catch {
    throw new AppError("invalid token!", 401)
  }
}