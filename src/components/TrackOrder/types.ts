
export interface ProgressStep {
  id: number;
  status: string;
  time: string;
  completed: boolean;
  icon: string;
}

export interface DriverInfo {
  name: string;
  vehicle: string;
  image: string;
  phone: string;
}

export interface OrderDetails {
  id: string;
  status: string;
  eta: string;
  distance: string;
  progress: ProgressStep[];
  driver: DriverInfo;
  instructions: string;
  contactless: boolean;
  mapImage: string;
}
