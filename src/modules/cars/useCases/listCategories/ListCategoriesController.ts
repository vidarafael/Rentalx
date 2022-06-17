import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)

    const lists = await listCategoriesUseCase.execute()

    return res.json(lists)
  }
}

export { ListCategoriesController }