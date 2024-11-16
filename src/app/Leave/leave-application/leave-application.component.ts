import { Component, OnInit ,ElementRef,ViewChild,ViewEncapsulation } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { LeaveService } from '../../leave.service';
import { DataServiceService } from '../../data-service.service';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { text } from 'stream/consumers';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LeaveData } from '../leave-data';
import { PaginatedResponse } from '../paginated-response';


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

  displayedColumns: string[] = ['id', 'empName', 'leaveName', 'applyDate', 'leaveStartDate', 'leaveEndDate','actions'];
  dataSource: LeaveData[] = [];
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
      .subscribe((response: PaginatedResponse<LeaveData>) => {
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

  deleteElement(element: any) {
    console.log('Delete element:', element);
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
        approvalStatus: 0,
        leaveProcessingOrder: null,
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
  employees: { empId: number, fullName: string }[] = [];
  company: { cmpId: string, cmpName: string }[] = []
  selectedCompanyId: string | null = null; 
  selectedLeaveIds:number | null = null;


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
