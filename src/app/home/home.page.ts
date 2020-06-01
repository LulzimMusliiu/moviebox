import { Component, ViewChild } from '@angular/core';
import { Platform} from '@ionic/angular';
 // AlertController, IonContent, ToastController
import { MovieService } from '../services/movie.service';
import { delay, map } from 'rxjs/operators';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  color = '#fff';
  year: string = "2019";
  noimage = "../../assets/images/no-image.jpg";
  page = 1;
  genreId = "";
  genreName = "";
  movie_years = [
    "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003",
    "2002", "2001", "2000",
  ];
  numbers = [1,2,3,4];

  items = [];
  tv_popular = [];
  movie_popular = [];
  genres = [
    { id: "28", name: "Action", icon: '🎬', class: 'genre-active' },
    { id: "12", name: "Adventure", icon: '🌇' },
    { id: "16", name: "Animation", icon: '😊' },
    { id: "35", name: "Comedy", icon: '😂' },
    { id: "80", name: "Crime", icon: '🔫' },
    { id: "99", name: "Documentary", icon: '🎬' },
    { id: "18", name: "Drama", icon: '🌆' },
    { id: "10751", name: "Family", icon: '👨‍👩‍👧‍👦' },
    { id: "14", name: "Fantasy", icon: '🔮' },
    { id: "36", name: "History", icon: '📔' },
    { id: "27", name: "Horror", icon: '👻' },
    { id: "10402", name: "Music", icon: '🎤' },
    { id: "9648", name: "Mystery", icon: '🕵️‍' },
    { id: "10749", name: "Romance", icon: '💖' },
    { id: "878", name: "SciFi", icon: '👩‍🚀' },
    { id: "53", name: "Thriller", icon: '🔪' },
    { id: "10752", name: "War", icon: '⚔️' },
    { id: "37", name: "Western", icon: '🤠' },
  ];
  constructor(private movie_service: MovieService) {
    // this.openModal();


    this.fetchPopularTV();
    this.fetchPopularMovies();
  }

  ngOnInit(){
    this.movie_service.shuffleArray(this.numbers);

  }

  fetchPopularTV(){
    this.movie_service.getPopularTV().pipe(delay(1500)).subscribe((data)=>{
      let shuffledArray = data['results'];
      this.movie_service.shuffleArray(shuffledArray);
      this.tv_popular = shuffledArray.splice(0,6);
      console.log('AA', this.tv_popular);
    });
  }

  fetchPopularMovies(){
    this.movie_service.getPopularMovie().pipe(delay(1500)).subscribe((data)=>{
      let shuffledArray = data['results'];
      this.movie_service.shuffleArray(shuffledArray);
      this.movie_popular = shuffledArray.splice(0,6);
    });
  }




  truncateString(str, num) {
    return str.length > num ? str.slice(0, num >= 3 ? num - 3 : num) + '...' : str;
  }



}
