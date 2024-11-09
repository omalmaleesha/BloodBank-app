import { Component, OnInit } from '@angular/core';
import Aos from 'aos';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent implements OnInit {
  ngOnInit(): void {
    Aos.init();
  }

}
