"use client";

import { makeAutoObservable } from "mobx";

export interface ItemRecord {
  id: string;
  title: string;
  done: boolean;
}

// Example domain store — holds normalized records and derived view state, fed by your
// GraphQL client's query results (e.g. call setItems() after a query resolves). MobX doesn't
// fetch data itself; it just makes the resulting domain state observable and computed.
class ItemsStore {
  items: ItemRecord[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setItems(items: ItemRecord[]) {
    this.items = items;
  }

  toggleDone(id: string) {
    const item = this.items.find((i) => i.id === id);
    if (item) item.done = !item.done;
  }

  get pendingCount() {
    return this.items.filter((item) => !item.done).length;
  }
}

export const itemsStore = new ItemsStore();
