import { Injectable, inject } from "@angular/core";
import { PlantItem } from "./plantItem";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PlantService {
  private http = inject(HttpClient);
  private baseUrl = "http://localhost:8080/plant";
  constructor() {}

  getAllPlantItems(): Observable<PlantItem[]> {
    return this.http.get<PlantItem[]>(this.baseUrl);
  }

  getPlantItemById(id: Number): Observable<PlantItem> | undefined {
    return this.http.get<PlantItem>(this.baseUrl+"/"+id);
  }

  editPlant(patchedPlant: any): Observable<PlantItem> {
    return this.http.patch<PlantItem>(this.baseUrl, patchedPlant);
  }
}
