export const ROAD_DISTANCE_SERVICE = 'ROAD_DISTANCE_SERVICE';

export interface RoadDistanceServiceInterface {
  getDistance(origin: string, destination: string): Promise<number>;
}
