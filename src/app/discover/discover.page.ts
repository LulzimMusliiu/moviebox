import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, AlertController,IonContent, ToastController  } from '@ionic/angular';
import { MovieService } from '../services/movie.service';
import { delay, map } from 'rxjs/operators';
import { formatDate } from "@angular/common";
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  color = '#fff';
  year:string = "2019";
  noimage = "../../assets/images/no-image.jpg";
  page = 1;
  genreId="";
  genreName="";
  openToast: any;
  movie_years = [
    "2019","2018","2017","2016","2015","2014","2013","2012","2011","2010","2009","2008","2007","2006","2005","2004","2003",
    "2002","2001","2000",
  ]

   items = [];
   movie_genres = [
    {id: "28", name: "Action", icon: '🎬', class: 'genre-active'},
    {id: "12", name: "Adventure", icon: '🌇'},
    {id: "16", name: "Animation", icon: '😊'},
    {id: "35", name: "Comedy", icon: '😂'},
    {id: "80", name: "Crime", icon: '🔫'},
    {id: "99", name: "Documentary", icon: '🎬'},
    {id: "18", name: "Drama", icon: '🌆'},
    {id: "10751", name: "Family", icon: '👨‍👩‍👧‍👦'},
    {id: "14", name: "Fantasy", icon: '🔮'},
    {id: "36", name: "History", icon: '📔'},
    {id: "27", name: "Horror", icon: '👻'},
    {id: "10402", name: "Music", icon: '🎤'},
    {id: "9648", name: "Mystery", icon: '🕵️‍'},
    {id: "10749", name: "Romance", icon: '💖'},
    {id: "878", name: "Sci-Fi", icon: '👩‍🚀'},
    {id: "53", name: "Thriller", icon: '🔪'},
    {id: "10752", name: "War", icon: '⚔️'},
    {id: "37", name: "Western", icon: '🤠'},
  ];
   tv_genres = [
    { id: 10759,   name: "Action & Adventure", icon: "🎞️"},
    { id: 16, name: "Animation", icon: "😊"},
    { id: 35, name: "Comedy", icon: "🤣"},
    { id: 80, name: "Crime", icon: "🔫"},
    { id: 99, name: "Documentary", icon: "🎬"},
    { id: 18, name: "Drama", icon: "🌆"},
    { id: 10751, name: "Family", icon: "👨‍👩‍👧‍👦"},
    { id: 10762, name: "Kids", icon: "👼"},
    { id: 9648, name: "Mystery", icon: "🕵️"},
    { id: 10763, name: "News", icon: "📰"},
    { id: 10764, name: "Reality", icon: "📺"},
    { id: 10765, name: "Sci-Fi & Fantasy", icon: "🚀"},
    { id: 10766, name: "Soap", icon: "🔳"},
    { id: 10767, name: "Talk", icon: "🗣️"},
    { id: 10768, name: "War & Politics", icon: "⚔️"},
    { id: 37, name: "Western", icon: "🤠"}
  ]

  snapshot:any;
  constructor(private router: Router,private activated: ActivatedRoute, private toastController:ToastController,private alertController: AlertController,private platform: Platform, private movie_service: MovieService) {
    // this.openModal();
    this.snapshot = activated.snapshot.paramMap.get('type').toLowerCase();
    // this.content.scrollToTop();
  }

  async openModal() {
    if(this.platform.is('desktop')) {
      console.log('Mobile web');
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Subtitle',
        message: 'N`desktop o qikjo',
        buttons: ['OK']
      });
      await alert.present();
    } else if (this.platform.is('ios') || this.platform.is('android')) {
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Subtitle',
        message: 'N`telefon o qikjo',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  ngOnInit(){
    this.fetchMovies();
  }

  //fetch movies when we enter the page
  fetchMovies(){
    this.items = []; // clear array, we needed this when we changed the year
    switch(this.snapshot){
      case 'tv':
      this.movie_service.getDiscoverTV(this.page,this.genreId,this.year).pipe(delay(2000)).subscribe((data)=>{
        this.items = data['results'];
        // this.shuffleArray(this.items);
      });
      break;

      case 'movie':
      this.movie_service.getDiscoverMovies(this.year,this.page,this.genreId).pipe(delay(2000)).subscribe((data)=>{
        this.items = data['results'];
        // this.shuffleArray(this.items);
      });
      break;
      default:
        this.router.navigateByUrl('home');
      break;
    }
  }

  setGenreId(e,n){
    this.genreId=e;
    this.genreName=n;
    this.fetchMovies();
    this.content.scrollToTop();
    this.verifiedToast(event,n);
  }

  clearFilter(){
    this.genreName = '';
    this.fetchMovies();
  }

  //shuffle an array
  // shuffleArray(array){
  //   array.sort(()=> { return 0.5 - Math.random() });
  // }

  loadMore(event){
    this.page++; //increasing page for the request on api
    switch(this.snapshot){
      case 'movie':
      this.movie_service.getDiscoverMovies(this.year,this.page,this.genreId).pipe(delay(1500)).subscribe((data)=>{
        this.movie_service.shuffleArray(data['results']);//shuffle array before coming in for loop
        for(const article of data['results']){
          this.items.push(article); //push every item coming to the existing array, items[]
        }
        event.target.complete(); //completing the ion-infinite-scroll
      });
      break;
      case 'tv':
      this.movie_service.getDiscoverTV(this.page,this.genreId,this.year).pipe(delay(1500)).subscribe((data)=>{
        this.movie_service.shuffleArray(data['results']);//shuffle array before coming in for loop
        for(const article of data['results']){
          this.items.push(article); //push every item coming to the existing array, items[]
        }
        event.target.complete(); //completing the ion-infinite-scroll
      });
      break;
    }
  }

  async verifiedToast($event, genre) {
    try{
      this.openToast.dismiss();
    }catch(e){}
    this.openToast = await this.toastController.create({
      message: `Now showing "${this.year} - ${genre}" movies`,
      duration: 2000,
      mode: "ios",
      color: 'dark',
      position: "bottom",
      cssClass: "live-notification",
    });
    this.openToast.present();
  }

  dateFormat(myDate){
    // const format = "mediumDate";
    const format = "LLLL dd, y";
    const locale = 'en-US';
    const formattedDate = formatDate(myDate, format, locale);
    return formattedDate;
  }

  truncateString(str, num) {
    return str.length > num ? str.slice(0, num >= 3 ? num - 3 : num) + '...' : str;
  }

}
