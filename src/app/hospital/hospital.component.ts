import { Component, OnInit } from '@angular/core';
import { RequestComponent } from './request/request.component';
import { BloodRequestComponent } from './blood-request/blood-request.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { QtyComponent } from '../admin/qty/qty.component';
import Aos from 'aos';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital',
  standalone: true,
  imports: [RequestComponent,BloodRequestComponent,NgFor,QtyComponent,FormsModule,CommonModule],
  templateUrl: './hospital.component.html',
  styleUrl: './hospital.component.css'
})
export class HospitalComponent implements OnInit{
  public id: string | null = null;
  public hospital:any = {};
  public bloodRequestLists:any = [];
  public inventoryList:any = [];
  public inventoryList01:any = [];
  public inventoryList02:any = [];
  public RequestListsOfApproved:any = [];
  public RequestListsOfCompleted:any = [];

  constructor(private route: ActivatedRoute, private http: HttpClient ,private router: Router) {}

  ngOnInit() {
    Aos.init();
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log("ID from query params:", this.id);
    });
    this.findHospitalDetails();
    this.loadBloodRequestList();
    this.loadInventory();
    this.loadhospitalCompletedApproved();
    this.loadCompletedRequests();
  }


  findHospitalDetails(){
    this.http.get(`http://localhost:8080/Hospital/findById/${this.id}`).subscribe(
      data => {
        console.log("Data loaded of hospital:", data);
        this.hospital = data;
      },
      error => {
        console.error("Error loading donor details:", error);
      }
    );
  }

  loadCompletedRequests(){
    this.http.get("http://localhost:8080/BloodRequest/completed").subscribe(
      data => {
        console.log("Data loaded:", data);
        this.RequestListsOfCompleted = data;
      },
      error => {
        console.error("Error loading donor details:", error);
      }
    );
  }

  loadBloodRequestList(){
    this.http.get("http://localhost:8080/BloodRequest/pending").subscribe(
      data => {
        console.log("Data loaded:", data);
        this.bloodRequestLists = data;
      },
      error => {
        console.error("Error loading donor details:", error);
      }
    );
  }

  delete(requests:any){
    console.log(requests);
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

  makeTworows(inventoryList:any){
    for (let i = 0; i < 4 && i < inventoryList.length; i++) {
      this.inventoryList01.push(inventoryList[i]);
    }
    
    for (let i = 4; i < 8 && i < inventoryList.length; i++) {
      this.inventoryList02.push(inventoryList[i]);
    }
  }


  loadhospitalCompletedApproved(){
    this.http.get("http://localhost:8080/ApproveRequest/completed").subscribe(
      data => {
        console.log("Data loaded:", data);
        this.RequestListsOfApproved = data;
      },
      error => {
        console.error("Error loading donor details:", error);
      }
    );
  }

  public hospitalTemp:any = {}
  updateHospitalDetails(hospital:any){
    this.hospitalTemp = hospital;

  }
  


  deleteHospital(){

  }

  saveHospital(){
    this.http.put("http://localhost:8080/Hospital/update",this.hospitalTemp, { responseType: 'text' }).subscribe(data=>{
      Swal.fire({
        title: "Updated the Hospital",
        icon: "success"
      });
    })
  }

}
