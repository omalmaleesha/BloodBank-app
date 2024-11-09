import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-qty',
  standalone: true,
  imports: [],
  templateUrl: './qty.component.html',
  styleUrl: './qty.component.css'
})
export class QtyComponent implements OnInit{
  @Input() public inventory:any;
  public roundedAmount: number = 0; 

  constructor(private route: ActivatedRoute, private http: HttpClient ,private router: Router) {}

  ngOnInit(): void {
    this.roundedAmount = Math.round(this.inventory.amount); 
    console.log(this.inventory);
  }

}
