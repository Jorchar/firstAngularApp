import { Injectable } from "@angular/core";
import { PlantItem } from "./plantItem";

@Injectable({
  providedIn: "root",
})
export class PlantService {
  protected plantItemList: PlantItem[] = [
    {
      id: 1,
      name: "Yuka",
      location: "Salon",
      photo: "/assets/plant.svg",
      waterred: true,
      waterredDate: "2024-01-16",
    },
    {
      id: 2,
      name: "Orchidea",
      location: "Kuchnia",
      photo: "/assets/plant.svg",
      waterred: false,
      waterredDate: "2024-04-11",
    },
    {
      id: 3,
      name: "Cactus",
      location: "Salon",
      photo: "/assets/plant.svg",
      waterred: true,
      waterredDate: "2024-03-27",
    },
    {
      id: 4,
      name: "Monstera",
      location: "Salon",
      photo: "/assets/plant.svg",
      waterred: true,
      waterredDate: "2024-02-26",
    },
    {
      id: 5,
      name: "Sukulent",
      location: "Kuchnia",
      photo: "/assets/plant.svg",
      waterred: false,
      waterredDate: "2024-04-22",
    },
  ];
  constructor() {}

  getAllPlantItems(): PlantItem[] {
    return this.plantItemList;
  }

  getPlantItemsById(id: Number): PlantItem | undefined {
    return this.plantItemList.find((plantItem) => plantItem.id === id);
  }

  editPlant(
    id: number,
    name: string,
    location: string,
    waterred: boolean,
    waterredDate: string
  ) {
    /* this.plantItemList[id].name = name;
    this.plantItemList[id].location = location;
    this.plantItemList[id].waterred = waterred;
    this.plantItemList[id].waterredDate = waterredDate; */
  }
}
