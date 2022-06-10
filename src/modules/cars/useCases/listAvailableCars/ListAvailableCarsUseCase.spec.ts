import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("Should be able to list all availables cars", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Audi A3",
      "description": "Carro bonito",
      "daily_rate": 140.00,
      "license_plate": "ATK-1234",
      "fine_amount": 100,
      "brand": "Audi",
      "category_id": "2dbbf4d8-3e94-48be-b2eb-4fd0fd1b5c9e"
    });
    
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all availables cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Audi A3",
      "description": "Carro bonito",
      "daily_rate": 140.00,
      "license_plate": "ATK-1234",
      "fine_amount": 100,
      "brand": "Audi_Test",
      "category_id": "2dbbf4d8-3e94-48be-b2eb-4fd0fd1b5c9e"
    });
    
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Audi_Test"
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all availables cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Audi A3",
      "description": "Carro bonito",
      "daily_rate": 140.00,
      "license_plate": "ATK-1234",
      "fine_amount": 100,
      "brand": "Audi_Test",
      "category_id": "12345"
    });
    
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345"
    });

    expect(cars).toEqual([car]);
  });
});