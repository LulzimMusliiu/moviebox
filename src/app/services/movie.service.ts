import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, TvShow } from '../interfaces/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private api_key: string = "877e38f0d93df5aa27b997fbccd34ffc";
  private _url: string = "https://api.themoviedb.org/3/";

  year: string = "2019";

  constructor(private http: HttpClient) { }


  getDiscoverMovies(year, page, genre): Observable<Movie[]> {
    // return this.http.get<Movie[]>(this._url+'discover/movie?api_key='+this.api_key+'&primary_release_year=2019');
    return this.http.get<Movie[]>(`${this._url}discover/movie?api_key=${this.api_key}&sort_by=popularity.desc&primary_release_year=${year}&page=${page}&with_genres=${genre}`);
  }

  getDiscoverTV(page, genre, year): Observable<TvShow[]> {
    return this.http.get<TvShow[]>(`${this._url}discover/tv?api_key=${this.api_key}&sort_by=popularity.desc&&page=${page}&with_genres=${genre}&air_date.gte=${year}`);
  }

  //get the popular tv shows
  getPopularTV(): Observable<TvShow[]> {
    return this.http.get<TvShow[]>(`${this._url}tv/popular?api_key=${this.api_key}&language=en-US&page=1`);
  }

  getPopularMovie(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this._url}movie/popular?api_key=${this.api_key}&language=en-US&page=1`);
  }

  shuffleArray(array) {
    array.sort(() => { return 0.5 - Math.random() });
  }
}
