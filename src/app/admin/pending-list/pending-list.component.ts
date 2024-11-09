import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import Aos from 'aos';

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
  public canceledAppointmentList:any ;
  public bloodRequestList:any = [];
  public completedBloodRequest:any;
  public feedBackList:any;

  constructor(private route: ActivatedRoute, private http: HttpClient ,private router: Router) {}
  


  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    Aos.init();
    console.log(this.appointments);
    this.loadApprovedAppointments();
    this.loadRequests();
    this.loadCanceledAppointment();
    this.approvedBloodRequestList();
    this.loadFeedBackTable();
  }

  loadFeedBackTable(){
    this.http.get("http://localhost:8080/FeedBack/all").subscribe(
      data => {
        console.log("Data loaded:", data);
        this.feedBackList = data;
      },
      error => {
        console.error("Error loading donor details:", error);
      }
    );
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


  cancel(Appointment:any){
    const status = "CANCELED";

    this.http.patch(`http://localhost:8080/Appointment/update/${Appointment.appointmentID}/${status}`, {}, { responseType: 'text' })
      .subscribe(
        data => {
          console.log("Appointment updated successfully:", data);
          Appointment.status = status;
        },
        error => {
          console.error("Error updating appointment status:", error);
        }
      );
  }

  loadCanceledAppointment(){
    this.http.get("http://localhost:8080/Appointment/canceled").subscribe(
      data => {
        console.log("Data loaded:", data);
        this.canceledAppointmentList = data;
      },
      error => {
        console.error("Error loading donor details:", error);
      }
    );
  }





  approveBlood(requests:any){
    const status = "COMPLETED";

    this.http.patch(`http://localhost:8080/BloodRequest/update/${requests.requestID}/${status}`, {}, { responseType: 'text' })
      .subscribe(
        data => {
          console.log("Appointment updated successfully:", data);
          requests.status = status;
          this.approvedBloodRequestList();
          this.loadRequests();
        },
        error => {
          console.error("Error updating appointment status:", error);
        }
      );
  }

  cancelBloodRequest(requests:any){
    const status = "CANCELED";

    this.http.patch(`http://localhost:8080/BloodRequest/update/${requests.requestID}/${status}`, {}, { responseType: 'text' })
      .subscribe(
        data => {
          console.log("Appointment updated successfully:", data);
          requests.status = status;
          this.approvedBloodRequestList();
          this.loadRequests();
        },
        error => {
          console.error("Error updating appointment status:", error);
        }
      );
  }

  approvedBloodRequestList(){
    this.http.get("http://localhost:8080/BloodRequest/completed").subscribe(
      data => {
        console.log("Data loaded:", data);
        this.completedBloodRequest = data;
      },
      error => {
        console.error("Error loading donor details:", error);
      }
    );
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
