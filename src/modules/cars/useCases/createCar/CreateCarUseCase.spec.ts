import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUserCase } from "./CreateCarUseCase";


let createCarUseCase: CreateCarUserCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUserCase(carsRepositoryInMemory)
  })

  it("should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Name car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category"
    })
  })
})