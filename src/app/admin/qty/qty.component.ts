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

  constructor(private route: ActivatedRoute, private http: HttpClient ,private router: Router) {}

  ngOnInit(): void {
    console.log(this.inventory);
  }

}
