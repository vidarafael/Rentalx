import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DevolutionRentalUseCase } from './DevolutionRentalUseCase'

class DevolutionRentalController {
  async handle(req: Request, res: Response): Promise<void> {
    const { } = req.body

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)
  }
}

export { DevolutionRentalController }