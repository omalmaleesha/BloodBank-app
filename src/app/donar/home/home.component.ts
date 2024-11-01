import { Component } from '@angular/core';
import { AppointmentCardsComponent } from '../appointment-cards/appointment-cards.component';
import { DonarHistoryComponent } from '../donar-history/donar-history.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppointmentCardsComponent,DonarHistoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
