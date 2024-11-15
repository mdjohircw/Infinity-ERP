import { Component, OnInit ,ElementRef,ViewChild,ViewEncapsulation } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { LeaveService } from '../../leave.service';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrl: './leave-application.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class LeaveApplicationComponent implements OnInit {


      startDate!: string; 
      endDate!: string; 
      totalDays: number = 0; 
      calculateTotalDays(): void {
        if (this.startDate && this.endDate) {
          // Parse start and end dates only (YYYY-MM-DD format)
          const start = new Date(this.startDate);
          const end = new Date(this.endDate);
    
          // Calculate the difference in milliseconds and convert to days
          const diffTime = end.getTime() - start.getTime();
          this.totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Add 1 to include the start day
        } else {
          this.totalDays = 0; // Reset if dates are not set
        }
      }
 
  leaveTypes: { leaveId: number, leaveName: string }[] = [];
  employees: { empId: number, fullName: string }[] = [];
  company: { cmpId: string, cmpName: string }[] = []
  selectedCompanyId: string | null = null; 
  selectedLeaveIds:number | null = null;
  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
    this.leaveService.getLeaveTypes().subscribe(response => {
      if (response.statusCode === 200) {
        this.leaveTypes = response.data;
      } else {
        console.error('Failed to fetch leave types:', response.message);
      }
    });
    this.leaveService.getEmployees().subscribe(response => {
      if (response.statusCode === 200) {
        this.employees = response.data;
      } else {
        console.error('Failed to fetch leave types:', response.message);
      }
    });

    this.company = [
      { cmpId: '0001', cmpName: 'INFINITY ERP' }

    ];
    this.selectedCompanyId = this.company[0].cmpId;

    

  }
  isPregnantDateVisible(): boolean {
    return this.selectedLeaveIds===3032;
  }








  
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  allFiles: File[] = [];
  allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'gif'];
  maxFileSize = 2 * 1024 * 1024; // 2 MB

  // Handle file selection and validation
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files || []);
    const validFiles: File[] = [];

    files.forEach(file => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
      if (file.size <= this.maxFileSize && this.allowedExtensions.includes(fileExtension)) {
        validFiles.push(file);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File',
          text: `File "${file.name}" is not allowed. Please ensure it is under 2MB and has a valid file type. Allowed types: ${this.allowedExtensions.join(', ')}`,
          confirmButtonText: 'OK'
        });
      }
    });

    this.allFiles = [...this.allFiles, ...validFiles];
    input.value = ''; // Reset input value to allow re-selection of the same file
  }

  // Remove a selected file from the list
  removeFile(index: number): void {
    this.allFiles.splice(index, 1);
  }

  // Convert files to base64 format
  async handleFileUpload(): Promise<string[]> {
    const base64Files: string[] = [];
    for (const file of this.allFiles) {
      const base64File = await this.getBase64(file);
      base64Files.push(base64File);
    }
    return base64Files;
  }

  private getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }



}
