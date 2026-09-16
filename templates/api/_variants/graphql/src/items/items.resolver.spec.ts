import { Test } from "@nestjs/testing";
import { ItemsResolver } from "./items.resolver";
import { ItemsService } from "./items.service";

describe("ItemsResolver", () => {
  let resolver: ItemsResolver;

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
      providers: [
        ItemsResolver,
        { provide: ItemsService, useValue: serviceMock },
      ],
    }).compile();
    resolver = moduleRef.get(ItemsResolver);
  });

  it("delegates the items query to the service", async () => {
    serviceMock.findAll.mockResolvedValue([]);
    await expect(resolver.items()).resolves.toEqual([]);
    expect(serviceMock.findAll).toHaveBeenCalled();
  });

  it("delegates createItem to the service", async () => {
    serviceMock.create.mockResolvedValue({ id: "1", title: "New" });
    await expect(resolver.createItem({ title: "New" })).resolves.toEqual({
      id: "1",
      title: "New",
    });
    expect(serviceMock.create).toHaveBeenCalledWith({ title: "New" });
  });
});
