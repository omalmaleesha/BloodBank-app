import { Component, OnInit } from '@angular/core';
import { PendingListComponent } from './pending-list/pending-list.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute , Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { QtyComponent } from './qty/qty.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [PendingListComponent,FormsModule,CommonModule,QtyComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  public id: string | null = null;
  public appointmentList:any;
  public admin:any;
  public inventoryList:any = [];

  constructor(private route: ActivatedRoute, private http: HttpClient ,private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log("ID from query params:", this.id);
      this.loadDeatails(this.id);
      this.loadAppointments();
      this.loadInventory();
    });
  }

  loadAppointments(){
    this.http.get("http://localhost:8080/Appointment/pendings").subscribe(
      data => {
        console.log("Data loaded:", data);
        this.appointmentList = data;
      },
      error => {
        console.error("Error loading donor details:", error);
      }
    );
  }

  loadDeatails(id:any){
    this.http.get(`http://localhost:8080/Admin/findById/${id}`).subscribe(
      data => {
        console.log("Data loaded:", data);
        this.admin = data;
      },
      error => {
        console.error("Error loading donor details:", error);
      }
    );
  }


  deleteAdmin(adminID:any){

  }


  public temp:any = {};
  updateAdminDetails(admin:any){
    this.temp=admin;

  }
  saveAdmin(){
    this.http.put("http://localhost:8080/Admin/update",this.temp, { responseType: 'text' }).subscribe(data=>{
      Swal.fire({
        title: "Updated the Admin",
        icon: "success"
      });
    })
  }


  loadInventory(){
    this.http.get("http://localhost:8080/Inventory/all").subscribe(
      data => {
        console.log("Data loaded:", data);
        this.inventoryList = data;
        this.makeTworows(this.inventoryList);
      },
      error => {
        console.error("Error loading donor details:", error);
      }
    );
  }

  public inventoryList01:any = [];
  public inventoryList02:any = [];
  makeTworows(inventoryList:any){
    for (let i = 0; i < 4 && i < inventoryList.length; i++) {
      this.inventoryList01.push(inventoryList[i]);
    }
    
    for (let i = 4; i < 8 && i < inventoryList.length; i++) {
      this.inventoryList02.push(inventoryList[i]);
    }
  }
}
