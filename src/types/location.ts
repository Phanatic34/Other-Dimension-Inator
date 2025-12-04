// Restaurant location for map preview
export interface RestaurantLocation {
  id?: string;        // some stable identifier if available, otherwise name+address
  name: string;
  address?: string;
  lat: number;
  lng: number;
}

