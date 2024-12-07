import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LeaveService } from '../../../core/services/leave.service';
import { ILeaveData } from '../../../core/models/interfaces/ILeave-data';
import { PaginatedResponse } from '../../../core/services/paginated-response';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-leave-approve',
  templateUrl: './leave-approve.component.html',
  styleUrl: './leave-approve.component.css'
})
export class LeaveApproveComponent implements OnInit{

  constructor(private leaveService: LeaveService ) {}
  ngOnInit(): void {
    this.loadDataLvApprove();

    
  }
 
  
  
  displayedColumns: string[] = [ 'empName', 'leaveName', 'applyDate', 'leaveStartDate', 'leaveEndDate','actions'];
  dataSource: ILeaveData[] = [];
  totalData = 0;
  pageSize = 10;
  pageIndex = 0;
  filter = '';
  sortColumn = '';
  sortDirection = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loadDataLvApprove(): void {
    this.leaveService.getLvApprove(this.pageIndex, this.pageSize, this.filter, this.sortColumn, this.sortDirection)
      .subscribe((response: PaginatedResponse<ILeaveData>) => {
        this.dataSource = response.content;
        this.totalData = response.totalElements;
      });
  }


  applyFilter(event: Event): void {
    this.filter = (event.target as HTMLInputElement).value.trim();
    this.loadDataLvApprove();
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadDataLvApprove();
  }

  sortData(event: any): void {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    this.loadDataLvApprove();
  }

  // Example functions for actions
  viewElement(element: any) {
    console.log('View element:', element);
  }

  editElement(element: any) {
    console.log('Edit element:', element);
  }

  
  onlvApproveClick(element: any, lvId: number, Notificationid: number): void {
    let formData = {
      id: lvId ,
      approval_status: element,
      notificationId: Notificationid
   
    };
    try {
      // Pass the formData object to the service method
      this.leaveService.approveApplication(formData).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Your leave approve has been successfully!',
          });
          // Uncomment this if loadData refreshes the data view
          this.loadDataLvApprove();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error submitting your leave Approve. Please try again.',
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
  







    
  }

