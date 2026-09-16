import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

interface CreateItemData {
  title: string;
}

interface UpdateItemData {
  title?: string;
  done?: boolean;
}

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.item.findMany();
  }

  findOne(id: string) {
    return this.prisma.item.findUniqueOrThrow({ where: { id } });
  }

  create(data: CreateItemData) {
    return this.prisma.item.create({ data });
  }

  update(id: string, data: UpdateItemData) {
    return this.prisma.item.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.item.delete({ where: { id } });
  }
}
