import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blood-request',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './blood-request.component.html',
  styleUrl: './blood-request.component.css'
})
export class BloodRequestComponent implements OnInit{
  @Input() public id:any;
  public hospital:any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient ,private router: Router) {}

  ngOnInit(): void {
    console.log(this.id);
    this.loadhospitaldata(this.id);
  }


  loadhospitaldata(id:any){
    this.http.get(`http://localhost:8080/Hospital/findById/${id}`).subscribe(
      data => {
        console.log("Data loaded:", data);
        this.hospital = data;
      },
      error => {
        console.error("Error loading donor details:", error);
      }
    );
  }
  


  public temp:any = {};
  addNewRequest(){
    this.temp.hospitalID = this.hospital.hospitalID;
    this.temp.name = this.hospital.name;
    this.temp.contactNumber = this.hospital.contactNumber;
    this.temp.type = this.hospital.type;
    this.temp.status = 'PENDING';

    console.log(this.temp);
    this.http.post('http://localhost:8080/BloodRequest/add', this.temp, { responseType: 'text' })
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
