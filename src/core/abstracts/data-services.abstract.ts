// import { Author, Book, Genre } from '../entities';
import { Concert } from '../entities';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  // abstract authors: IGenericRepository<Author>;

  // abstract books: IGenericRepository<Book>;

  // abstract genres: IGenericRepository<Genre>;


  abstract concerts: IGenericRepository<Concert>;
}
