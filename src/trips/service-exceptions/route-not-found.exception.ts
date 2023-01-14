export class RouteNotFoundException extends Error {
  constructor(message?: string) {
    super(message);
  }
}
