import { Component, OnInit } from '@angular/core';
import { CaroselComponent } from './carosel/carosel.component';
import { CardsComponent } from './cards/cards.component';
import AOS from 'aos';
import { FeedbackComponent } from './feedback/feedback.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CaroselComponent,CardsComponent,FeedbackComponent,NgFor],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  public cardsList:any = [];
  ngOnInit(): void {
    this.loadCardsDetails();
    AOS.init();
  }

  loadCardsDetails(){
    const card1 = {
      scr: '/card1.jpg',
      head: 'Learn About Blood ',
      describe: 'Know the fine details about blood, like what’s in it, who needs it, and where it goes after you give it'
    };
  
    const card2 = {
      scr: '/card2.jpg',
      head: 'Find A Donate Center',
      describe: 'There are donor centres all across the country. Find one thats closest to you'
    };
  
    const card3 = {
      scr: '/card3.jpg',
      head: 'Learn Blood Donate',
      describe: 'American Red Cross,someone in the U.S. needs blood every 2 seconds If you’ve ever donated blood'
    };
  
    this.cardsList.push(card1, card2, card3);

  }

}
