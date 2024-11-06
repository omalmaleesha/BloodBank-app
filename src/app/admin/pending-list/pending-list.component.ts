import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-pending-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pending-list.component.html',
  styleUrl: './pending-list.component.css'
})
export class PendingListComponent implements OnInit,AfterViewInit  {
  @Input() public appointments: any = [];
  public appointmentsApproved:any = [];
  public appprovedAppointment:any;

  public bloodRequestList:any = [];

  constructor(private route: ActivatedRoute, private http: HttpClient ,private router: Router) {}
  


  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    console.log(this.appointments);
    this.loadApprovedAppointments();
    this.loadRequests();
  }

  loadApprovedAppointments(){
    this.http.get("http://localhost:8080/Appointment/approved").subscribe(
      data => {
        console.log("Data loaded:", data);
        this.appointmentsApproved = data;
      },
      error => {
        console.error("Error loading donor details:", error);
      }
    );
  }

  navigate(){
    this.router.navigate(['/add-Hospital']);
  }

  approve(Appointment:any){
    const status = "APPROVED";  

    this.http.patch(`http://localhost:8080/Appointment/update/${Appointment.appointmentID}/${status}`, {}, { responseType: 'text' })
      .subscribe(
        data => {
          console.log("Appointment updated successfully:", data);
          Appointment.status = status;
          this.loadApprovedAppointments()
        },
        error => {
          console.error("Error updating appointment status:", error);
        }
      );
  }





  approveBlood(requests:any){
    console.log(requests);
  }

  loadRequests(){
    this.http.get("http://localhost:8080/BloodRequest/pending").subscribe(
      data => {
        console.log("Data loaded:", data);
        this.bloodRequestList = data;
      },
      error => {
        console.error("Error loading donor details:", error);
      }
    );
  }

}
