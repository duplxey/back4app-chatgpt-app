interface Movie extends Parse.Object {
  objectId: string;
  name: string;
  releaseYear: number;
  isWatched: boolean;
  createdAt: Date;
  updatedAt: Date;
}