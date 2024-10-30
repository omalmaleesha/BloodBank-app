import { Component, OnInit } from '@angular/core';
import { CaroselComponent } from './carosel/carosel.component';
import { CardsComponent } from './cards/cards.component';
import AOS from 'aos';
import { FeedbackComponent } from './feedback/feedback.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CaroselComponent,CardsComponent,FeedbackComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  ngOnInit(): void {
    AOS.init();
  }

}
