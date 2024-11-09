import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-hospital',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-hospital.component.html',
  styleUrl: './add-hospital.component.css'
})
export class AddHospitalComponent {
  public hospital:any = {}

  constructor(private route: ActivatedRoute, private http: HttpClient ,private router: Router) {}

  saveHospital(){
    this.http.post("http://localhost:8080/Hospital/add",this.hospital,{ responseType: 'text' }).subscribe(
      data => {
        console.log("hospital Addded");
        Swal.fire({
          title: "Succsess",
          text: "Hospital Added Done!",
          icon: "success"
        });
        
      },
      error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
        console.error("Error loading donor details:", error);
      }
    );
  }

}
