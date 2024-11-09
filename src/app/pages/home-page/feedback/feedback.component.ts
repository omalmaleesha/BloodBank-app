import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']  // Fix typo from `styleUrl` to `styleUrls`
})
export class FeedbackComponent implements OnInit {
  public text: any;

  constructor(private http: HttpClient) {}  // Inject HttpClient

  ngOnInit(): void {}

  submitTheFeedBack() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];  // YYYY-MM-DD format
    const formattedTime = currentDate.toTimeString().split(' ')[0];

    const feedback = {
      text: this.text,
      date: formattedDate,
      time: formattedTime
    };

    console.log(feedback);  
    this.http.post('http://localhost:8080/FeedBack/add', feedback, { responseType: 'text' })
      .subscribe(
        response => {
          Swal.fire({
            title: "Done",
            text: "Feedback submitted successfully!",
            icon: "success"
          });
          alert("Feedback submitted successfully!");
          console.log(response);
          this.text = "";
        },
        error => {
          console.error("Error submitting feedback:", error);
          alert("Failed to submit feedback.");
        }
      );
  }
}
