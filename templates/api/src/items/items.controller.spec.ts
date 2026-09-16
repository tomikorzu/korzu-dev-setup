import { Test } from "@nestjs/testing";
import { ItemsController } from "./items.controller";
import { ItemsService } from "./items.service";

describe("ItemsController", () => {
  let controller: ItemsController;

  const serviceMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const moduleRef = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [{ provide: ItemsService, useValue: serviceMock }],
    }).compile();
    controller = moduleRef.get(ItemsController);
  });

  it("delegates findAll to the service", async () => {
    serviceMock.findAll.mockResolvedValue([]);
    await expect(controller.findAll()).resolves.toEqual([]);
    expect(serviceMock.findAll).toHaveBeenCalled();
  });

  it("delegates create to the service", async () => {
    serviceMock.create.mockResolvedValue({ id: "1", title: "New" });
    await expect(controller.create({ title: "New" })).resolves.toEqual({
      id: "1",
      title: "New",
    });
    expect(serviceMock.create).toHaveBeenCalledWith({ title: "New" });
  });
});
