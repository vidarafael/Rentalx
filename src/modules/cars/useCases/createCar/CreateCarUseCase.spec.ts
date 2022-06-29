import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUserCase } from "./CreateCarUseCase";


let createCarUseCase: CreateCarUserCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUserCase(carsRepositoryInMemory)
  })

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category"
    })

    expect(car).toHaveProperty("id")
  })

  it("should not be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car1",
        description: "Description car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "Category"
      })

      await createCarUseCase.execute({
        name: "Car2",
        description: "Description car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "Category"
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car2",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category"
    })
    console.log(car)
    expect(car.available).toBe(true)
  })
})