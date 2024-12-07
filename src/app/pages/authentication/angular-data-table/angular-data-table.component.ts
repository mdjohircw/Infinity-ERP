import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { DataServiceService } from '../../../core/services/data-service.service';
export interface UserData {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-angular-data-table',
  templateUrl: './angular-data-table.component.html',
  styleUrl: './angular-data-table.component.css'
})

export class AngularDataTableComponent  implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'email','actions'];
  dataSource = new MatTableDataSource<UserData>([]);
  totalData = 0;
  pageSize = 10;
  currentPage = 0;
  filterValue = '';
  sortColumn = '';
  sortDirection = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataservices: DataServiceService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataservices.getData(
      this.currentPage, 
      this.pageSize, 
      this.filterValue, 
      this.sortColumn, 
      this.sortDirection
    ).subscribe(response => {
      this.dataSource.data = response.content;
      this.totalData = response.totalElements;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterValue = filterValue.toString();
    this.currentPage = 0;  // Reset to the first page when a filter is applied
    this.loadData();
  }
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
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
  
}
