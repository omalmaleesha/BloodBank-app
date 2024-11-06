import { Component, OnInit } from '@angular/core';
import { DonarHistoryComponent } from '../donar-history/donar-history.component';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DonarHistoryComponent,AppointmentsComponent,FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public id: string | null = null;
  public donar: any;

  constructor(private route: ActivatedRoute, private http: HttpClient ,private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log("ID from query params:", this.id);
      if (this.id) {
        this.loadDetails(this.id);
      } else {
        console.error('No ID found in query parameters.');
      }
    });
  }

  loadDetails(id: String) {
    this.http.get(`http://localhost:8080/Donar/findById/${id}`).subscribe(
      data => {
        console.log("Data loaded:", data);
        this.donar = data;
      },
      error => {
        console.error("Error loading donor details:", error);
      }
    );
  }

  public updateDonar: any = {};

updateDonarDetails(donar: any) {
  console.log("Donor details:", donar);
  this.updateDonar = { ...donar }; 
}

saveDonar() {
  const donorToUpdate = { ...this.updateDonar };
  delete donorToUpdate.password;

  this.http.patch('http://localhost:8080/Donar/update', donorToUpdate, { responseType: 'text' })
    .subscribe(
      response => {
        Swal.fire({
          title: "Donar Updated Sucessfully",
          icon: "success"
        });
        this.loadDetails(this.donar.id);
        console.log(response);
      },
      error => {
        console.error("Error updating donor:", error);
        alert("Failed to update donor.");
      }
  );
}

deleteDonar() {
  if (confirm("Are you sure you want to delete this donor?")) {
    this.http.delete(`http://localhost:8080/Donar/delete/${this.id}`)
      .subscribe(
        response => {
          Swal.fire({
            title: "Donar Deleted Sucessfully",
            icon: "success"
          });
          this.router.navigate(['']);
        },
        error => {
          console.error("Error deleting donor:", error);
          const errorMessage = error.error ? error.error : "Failed to delete donor.";
          alert(errorMessage);
        }
    );
  }
}


  
}
