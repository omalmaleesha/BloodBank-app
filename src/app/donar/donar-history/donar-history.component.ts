import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-donar-history',
  standalone: true,
  imports: [NgFor],
  templateUrl: './donar-history.component.html',
  styleUrl: './donar-history.component.css'
})
export class DonarHistoryComponent implements OnInit{
  @Input() id:any;
  public historyList:any = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

 ngOnInit(): void {
  console.log(this.id);
  this.loadHistoryList();
}

  loadHistoryList(){
    this.http.get(`http://localhost:8080/BloodRecords/donarId/${this.id}`).subscribe(
        data => {
          console.log("Data history:", data);
          this.historyList = data;
        },
        error => {
          console.error("Error loading donor details:", error);
        }
      );
  }

}
