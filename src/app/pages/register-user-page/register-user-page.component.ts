import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-register-user-page',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register-user-page.component.html',
  styleUrl: './register-user-page.component.css'
})
export class RegisterUserPageComponent implements OnInit{
  public donar:any = {
      name: "",
      address: "",
      city: "",
      email: "",
      password: "",
      contactNumber: "",
      bloodGroup: "",
      dob: "",
      gender: "",
      age: ""
  }

  constructor(private route: ActivatedRoute, private http: HttpClient ,private router: Router) {
    
  }
  
  ngOnInit(): void {
    
  }


  addNewDonar() {
    console.log(this.donar);
    this.checkValidations(this.donar);
    this.checkIsExist(this.donar).subscribe(isExist => {
      if (!isExist) {
        this.http.post('http://localhost:8080/Donar/add', this.donar, { responseType: 'text' })
          .subscribe(
            response => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Donar Added Sucessfully",
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/login']);
              console.log(response);
            },
            error => {
              console.error("Error updating Request:", error);
              Swal.fire({
                icon: "error",
                title: "Something went wrong!",
                text: "Try Again",
              });
            }
          );
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "The Email Is Exist",
        });
      }
    });
  }

  // Method to check validations
  checkValidations(donar: any): boolean {
    const emailValidation: string = this.donar.email;
    const DOB: string = this.donar.dob;
    const ageValidation: string = this.donar.age;
    if (this.validEmail(emailValidation) && this.validDate(DOB, ageValidation)) {
      console.log("Validations are done");
      return true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Reenter email and Age or DOB",
      });
      return false;
    }
  }

  // Method to validate email
  validEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailPattern.test(email);
  }

  // Method to validate DOB and age
  validDate(DOB: string, ageValidation: string): boolean {
    const currentDate = new Date();
    const birthDate = new Date(DOB);

    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }

    return age === parseInt(ageValidation, 10);
  }

  // Method to check if a donor exists by email
  checkIsExist(donar: any): Observable<boolean> {
    const email: string = donar.email;
    console.log(email);

    return this.http.get(`http://localhost:8080/Donar/findBy/${email}`).pipe(
      map((data: any) => {
        console.log("Data loaded:", data);
        return !!data; // Return true if the donor exists, false otherwise
      }),
      catchError((error) => {
        console.error("Error loading donor details:", error);
        return of(false); // Return false in case of error (donor doesn't exist)
      })
    );
  }

}
