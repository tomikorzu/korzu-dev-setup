import { Test } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { ItemsService } from "./items.service";

describe("ItemsService", () => {
  let service: ItemsService;

  const prismaMock = {
    item: {
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const moduleRef = await Test.createTestingModule({
      providers: [
        ItemsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();
    service = moduleRef.get(ItemsService);
  });

  it("lists items via prisma", async () => {
    prismaMock.item.findMany.mockResolvedValue([{ id: "1", title: "Test" }]);
    await expect(service.findAll()).resolves.toEqual([
      { id: "1", title: "Test" },
    ]);
    expect(prismaMock.item.findMany).toHaveBeenCalled();
  });

  it("creates an item via prisma", async () => {
    prismaMock.item.create.mockResolvedValue({ id: "1", title: "New" });
    await expect(service.create({ title: "New" })).resolves.toEqual({
      id: "1",
      title: "New",
    });
    expect(prismaMock.item.create).toHaveBeenCalledWith({
      data: { title: "New" },
    });
  });
});
