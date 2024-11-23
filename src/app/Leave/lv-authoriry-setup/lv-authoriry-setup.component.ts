import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaginatedResponse } from '../paginated-response';
import { LeaveService } from '../../leave.service';
import { IEmployee } from '../IEmployee';
@Component({
  selector: 'app-lv-authoriry-setup',
  templateUrl: './lv-authoriry-setup.component.html',
  styleUrl: './lv-authoriry-setup.component.css'
})
export class LvAuthorirySetupComponent implements OnInit {
  constructor(private leaveService: LeaveService ) {}
  selectedDepartmentIds: any[] = [];

  onDepartmentChange(selectedItems: any[]): void {
    this.selectedDepartmentIds = selectedItems.map(item => item.dptId); // Extract dptId values
    console.log(this.selectedDepartmentIds); // For debugging
  }
  company: { cmpId: string, cmpName: string }[] = []
  department: { dptId: string, dptName: string }[] = []
  selectedCompanyId: string | null = null; 

  ngOnInit(): void {

    this.company = [
      { cmpId: '0001', cmpName: 'INFINITY ERP' }

    ];

    this.department = [
      {
        dptId:'0032',
        dptName:'Commercial',
      },
      {
        dptId:'0034',
        dptName:'Accounts',
      }
    ]
    this.selectedCompanyId = this.company[0].cmpId;

    this.loadEmployees();
  }


  
  displayedColumns: string[] = [ 'empName', 'empCardNo','empType','select','actions'];
  dataSource: IEmployee[] = [];
  totalData = 0;
  pageSize = 10;
  pageIndex = 0;
  filter = '';
  sortColumn = '';
  sortDirection = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loadEmployees(): void {
    this.leaveService.GetEmployees(this.pageIndex, this.pageSize, this.filter, this.sortColumn, this.sortDirection,this.selectedDepartmentIds)
      .subscribe((response: PaginatedResponse<IEmployee>) => {
        this.dataSource = response.content;
        this.totalData = response.totalElements;
      });

      console.log('this data from loadEmployees',this.selectedDepartmentIds);
  }


  applyFilter(event: Event): void {
    this.filter = (event.target as HTMLInputElement).value.trim();
    this.loadEmployees();
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEmployees();
  }

  sortData(event: any): void {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    this.loadEmployees();
  }

  // Example functions for actions
  viewElement(element: any) {
    console.log('View element:', element);
  }

  editElement(element: any) {
    console.log('Edit element:', element);
  }
  selectedEmpIds: Set<string> = new Set<string>();

  // Handle Select All checkbox
  toggleSelectAll(checked: boolean): void {
    if (checked) {
      this.dataSource.forEach((row) => this.selectedEmpIds.add(row.empId));
    } else {
      this.selectedEmpIds.clear();
    }
    this.logSelectedEmpIds();
  }

  // Check if all rows are selected
  isAllSelected(): boolean {
    return this.selectedEmpIds.size === this.dataSource.length;
  }

  // Check if some rows are selected
  isIndeterminate(): boolean {
    return (
      this.selectedEmpIds.size > 0 &&
      this.selectedEmpIds.size < this.dataSource.length
    );
  }

  // Handle individual checkbox changes
  onCheckboxChange(checked: boolean, empId: string): void {
    if (checked) {
      this.selectedEmpIds.add(empId);
    } else {
      this.selectedEmpIds.delete(empId);
    }
    this.logSelectedEmpIds();
  }

  // Log selected Emp IDs
  logSelectedEmpIds(): void {
    console.log('Selected Emp IDs:', Array.from(this.selectedEmpIds));
  }
  
  currentSection: string = 'employee'; // Default section

  loadAuthority(): void {
    this.currentSection = this.currentSection === 'employee' ? 'authority' : 'employee';
  }
  
}
