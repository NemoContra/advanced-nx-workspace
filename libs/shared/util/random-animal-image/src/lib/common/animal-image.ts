export interface AnimalImage {
  src: string;
  alt: string;
}

export interface CatImage {
  file: string;
}

export interface DogImage {
  message: string;
  status: 'success' | 'failure';
}
