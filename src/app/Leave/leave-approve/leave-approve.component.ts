import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LeaveService } from '../../leave.service';
import { LeaveData } from '../leave-data';
import { PaginatedResponse } from '../paginated-response';
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
  onActionClick(element: any, actionValue: number): void {
    console.log(actionValue)
  }
  
  
  displayedColumns: string[] = [ 'empName', 'leaveName', 'applyDate', 'leaveStartDate', 'leaveEndDate','actions'];
  dataSource: LeaveData[] = [];
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
      .subscribe((response: PaginatedResponse<LeaveData>) => {
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


}
