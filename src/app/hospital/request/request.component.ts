import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent implements OnInit {
  @Input() public id:any;
  public approve:any = {
    donarID:"",
    appointmentID:"",
    amount:""
  };

  constructor(private route: ActivatedRoute, private http: HttpClient ,private router: Router) {}

  ngOnInit(): void {
    console.log(this.id);
  }

  saveApproveRequest(){
    const currentDate = new Date().toISOString().split('T')[0]; 

    const request = {
      donarID: this.approve.donarID,
      hospitalID: this.id,        
      appointmentID: this.approve.appointmentID,
      amount: this.approve.amount,
      date: currentDate,
      status: "COMPLETED"
    };
    console.log(request);
    this.http.post('http://localhost:8080/ApproveRequest/add', request, { responseType: 'text' })
    .subscribe(
      response => {
        alert("Request Updated!!!!!");
        console.log(response);
      },
      error => {
        console.error("Error updating Request:", error);
        alert("Failed to update Request.");
      }
  );

  }



}
