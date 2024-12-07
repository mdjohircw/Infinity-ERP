import { Component, OnInit ,ElementRef,ViewChild,ViewEncapsulation } from '@angular/core';
import { LeaveService } from '../../../core/services/leave.service';
import { DataServiceService } from '../../../core/services/data-service.service';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { text } from 'stream/consumers';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ILeaveData } from '../../../core/models/interfaces/ILeave-data';
import { PaginatedResponse } from '../../../core/services/paginated-response';


export interface UserData {
  id: number;
  name: string;
  email: string;
}
@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrl: './leave-application.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class LeaveApplicationComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  LeaveApplication: FormGroup;
  constructor(private leaveService: LeaveService , private dataservices: DataServiceService ) {
    this.LeaveApplication = new FormGroup({
      ddlCompany: new FormControl('', Validators.required),
      ddlEmployee: new FormControl('', Validators.required),
      ddlLeaveType: new FormControl('', Validators.required),
      txtApplyDate: new FormControl('', Validators.required),
      txtStartDate: new FormControl('', Validators.required),
      txtEndDate: new FormControl('', Validators.required),
      txtTotalDays: new FormControl({ value: '', disabled: true }),
      txtPregnentDate: new FormControl(),
      txtExpectedDelivarydate: new FormControl(),
      ddlChargeHandeOverEmp: new FormControl(),
      txtLeaveAddress: new FormControl(),
      txtPurposeOfLeave: new FormControl(),
      txtEmergencyContact: new FormControl(),
      attachments: new FormControl(null)
    });
 
  }

  displayedColumns: string[] = [ 'empName', 'leaveName', 'applyDate', 'leaveStartDate', 'leaveEndDate','approvalStatus','actions'];
  dataSource: ILeaveData[] = [];
  totalData = 0;
  pageSize = 10;
  pageIndex = 0;
  filter = '';
  sortColumn = '';
  sortDirection = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loadData(): void {
    this.leaveService.getData(this.pageIndex, this.pageSize, this.filter, this.sortColumn, this.sortDirection)
      .subscribe((response: PaginatedResponse<ILeaveData>) => {
        this.dataSource = response.content;
        this.totalData = response.totalElements;
      });
  }


  applyFilter(event: Event): void {
    this.filter = (event.target as HTMLInputElement).value.trim();
    this.loadData();
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  sortData(event: any): void {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    this.loadData();
  }

  // Example functions for actions
  viewElement(element: any) {
    console.log('View element:', element);
  }

  editElement(element: any) {
    console.log('Edit element:', element);
  }

 /*  deleteElement(element: any) {
    console.log('Delete element:', element);
  } */


    deleteElement(element: any) {
      const leaveId = element.id; // Assuming the leave ID is a property of the element
    
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to delete this leave?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.leaveService.deleteLeave(leaveId).subscribe({
            next: (response: any) => {
              // Handle different status codes in the response
              if (response.statusCode === 200) {
                Swal.fire({
                  title: 'Success!',
                  text: 'Leave deleted successfully.',
                  icon: 'success',
                  confirmButtonText: 'OK',
                }).then(() => {
                  this.loadData(); // Replace with your function to refresh the leave list
                });
              } else if (response.statusCode === 401) {
                Swal.fire({
                  title: 'Error!',
                  text: 'The leave is already being processed, so it cannot be deleted.',
                  icon: 'error',
                  confirmButtonText: 'OK',
                }).then(() => {
                  this.loadData(); // Refresh the list if needed
                });
              } else if (response.statusCode === 402) {
                Swal.fire({
                  title: 'Error!',
                  text: 'The leave is already approved, so it cannot be deleted.',
                  icon: 'error',
                  confirmButtonText: 'OK',
                }).then(() => {
                  this.loadData();
                });
              } else if (response.statusCode === 403) {
                Swal.fire({
                  title: 'Error!',
                  text: 'The leave is already rejected, so it cannot be deleted.',
                  icon: 'error',
                  confirmButtonText: 'OK',
                }).then(() => {
                  this.loadData();
                });
              }
            },
            error: (error) => {
              // Handle unexpected errors or bad request errors
              if (error.status === 400) {
                Swal.fire({
                  title: 'Error!',
                  text: error.error.message || 'Bad request while deleting the leave.',
                  icon: 'error',
                  confirmButtonText: 'OK',
                });
              } else {
                Swal.fire({
                  title: 'Error!',
                  text: 'An unexpected error occurred while deleting the leave.',
                  icon: 'error',
                  confirmButtonText: 'OK',
                });
              }
            },
          });
        }
      });
    }
    
  calculateTotalDays(): void {
    const startDate = this.LeaveApplication.get('txtStartDate')?.value;
    const endDate = this.LeaveApplication.get('txtEndDate')?.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const diffTime = end.getTime() - start.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24) + 1; // Include the start day
      this.LeaveApplication.get('txtTotalDays')?.setValue(diffDays > 0 ? diffDays : 0, { emitEvent: false });
    } else {
      this.LeaveApplication.get('txtTotalDays')?.setValue('', { emitEvent: false });
    }
  }


  async onSubmit(): Promise<void> {
    if (this.LeaveApplication.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill out all required fields before submitting.',
      });
      return;
    }
  
    try {
      // Wait for files to be converted to Base64
      const base64Files = await this.handleFileUpload();
  
      // Prepare the form data object
      const formData = {
        applicationId: '',
        leaveTypeId: this.LeaveApplication.get('ddlLeaveType')?.value,
        isHalfDayLeave: false,
        applyDate: this.LeaveApplication.get('txtApplyDate')?.value,
        leaveStartDate: this.LeaveApplication.get('txtStartDate')?.value,
        leaveEndDate: this.LeaveApplication.get('txtEndDate')?.value,
        totalLeaveDays: this.LeaveApplication.get('txtTotalDays')?.value || 0,
        pregnantDate: this.LeaveApplication.get('txtPregnentDate')?.value || null,
        expectedDeliveryDate: this.LeaveApplication.get('txtExpectedDelivarydate')?.value || null,
        remarks: this.LeaveApplication.get('txtPurposeOfLeave')?.value,
        handedOverEmpId: this.LeaveApplication.get('ddlChargeHandeOverEmp')?.value || '',
        lvAddress: this.LeaveApplication.get('txtLeaveAddress')?.value,
        lvContact: this.LeaveApplication.get('txtEmergencyContact')?.value,
        companyId: this.LeaveApplication.get('ddlCompany')?.value,
        empTypeId: 0,
        sftId: 0,
        dptId: '',
        dsgId: '',
        gId: 0,
        empId: this.LeaveApplication.get('ddlEmployee')?.value,
        documentsBase64: base64Files, // Include the Base64-encoded files
        documment: '' // Handle additional document fields if necessary
      };
  
      // Submit the form data
      this.leaveService.saveLeaveApplication(formData).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Your leave application has been submitted successfully!',
          });
          this.loadData();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error submitting your leave application. Please try again.',
          });
        }
      );
    } catch (error) {
      console.error('Error handling file upload:', error);
      Swal.fire({
        icon: 'error',
        title: 'File Processing Error',
        text: 'There was an issue processing your files. Please try again.',
      });
    }
  }
     



  leaveTypes: { leaveId: number, leaveName: string }[] = [];
  employees: { empId: string, fullName: string }[] = [];
  company: { cmpId: string, cmpName: string }[] = []
  selectedCompanyId: string | null = null; 
  selectedLeaveIds:number | null = null;

  isCardboxVisible: boolean = false;
  buttonText: string = 'Add New';

  toggleCardbox() {
    this.isCardboxVisible = !this.isCardboxVisible;
    
    this.buttonText = this.isCardboxVisible ? 'Close' : 'Add New';
  }
  ngOnInit(): void {
    this.leaveService.getLeaveTypes().subscribe(response => {
      if (response.statusCode === 200) {
        this.leaveTypes = response.data;
      } else {
        console.error('Failed to fetch leave types:', response.message);
      }
    });
    this.leaveService.getEmployeesApiCall().subscribe(response => {
    
        this.employees = response;

 
    });

    this.company = [
      { cmpId: '0001', cmpName: 'INFINITY ERP' }

    ];
    this.selectedCompanyId = this.company[0].cmpId;

    this.LeaveApplication.valueChanges.subscribe(() => {
      this.calculateTotalDays();
    });

    this.loadData();

  }
  isPregnantDateVisible(): boolean {
    return this.selectedLeaveIds===3032;
  }
 
  
  allFiles: File[] = [];
  allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'gif'];
  maxFileSize = 2 * 1024 * 1024; // 2 MB

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
    this.LeaveApplication.get('attachments')?.setValue(this.allFiles); // Bind files to the form control
    input.value = ''; // Reset input value to allow re-selection of the same file
  }

  // Remove a selected file from the list
  removeFile(index: number): void {
    this.allFiles.splice(index, 1);
    this.LeaveApplication.get('attachments')?.setValue(this.allFiles); // Update form control
  }

  // Submit form


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
      reader.onerror = (error) => reject(error);
    });
  }


}
