import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [NgFor,FormsModule,CommonModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {
  @Input() public donar: any; 
  public id: string | null = null;
  public appoitmentsList: any = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    console.log('Received Donar:', this.donar);
    this.id = this.donar?.donorID;
    if (this.id) {
      this.loadDataToTable(this.id); 
    } else {
      console.error('No ID found in query parameters.');
    }
  }

  loadDataToTable(id: string) {
    this.http.get(`http://localhost:8080/Appointment/findByDonarId/${id}`).subscribe(
      (data: any) => {
        this.appoitmentsList = data;
      },
      error => {
        console.error("Error loading donor details:", error);
      }
    );
  }

  addAppointment(): void {
    const appointmentData = {
      donarID: this.donarID,
      name: this.name,
      email: this.email,
      contactNumber: this.contactNumber,
      address: this.address,
      bloodType: this.bloodGroup,
      preferDate: this.preferDate,
      remarks: this.remarks,
      status: 'PENDING' 
    };

    this.http.post('http://localhost:8080/Appointment/add', appointmentData).subscribe(
      response => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Appointment has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        console.log(appointmentData);
        console.log('Appointment saved successfully:', response);
      },
      error => {
        console.error('Error saving appointment:', error);
      }
    );
  }


  public donarID: string = '';
  public name: string = '';
  public email: string = '';
  public contactNumber: string = '';
  public address: string = '';
  public bloodGroup: string = '';
  public preferDate: string = '';
  public remarks: string = '';

  addedAppointment(): void {
    this.donarID = this.donar?.donorID || ''; 
    this.name = this.donar?.name || '';
    this.email = this.donar?.email || '';
    this.contactNumber = this.donar?.contactNumber || '';
    this.address = this.donar?.address || '';
    this.bloodGroup = this.donar?.bloodGroup || '';
    this.preferDate = '';
    this.remarks = this.donar?.remarks || '';
  }

  public AptTemp:any = {};
  updateAppointment(Appointment:any){
    this.AptTemp = Appointment;
    console.log(Appointment);


  }

  deleteAppointmentById(id:any){
    console.log(id);
    this.http.delete(`http://localhost:8080/Appointment/delete/${id}`).subscribe(
      response => {
        Swal.fire("Appointment Deleted!");
        console.log('Appointment saved successfully:', response);
      },
      error => {
        console.error('Error saving appointment:', error);
      }
    );
  }


  

}
