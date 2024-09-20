import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
export interface UserData {
  id: number;
  name: string;
  email: string;
}
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  // Simulated demo data (replace this with actual data later)
  private mockData: UserData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com' },
    { id: 4, name: 'Sara Williams', email: 'sara@example.com' },
    { id: 5, name: 'David Wilson', email: 'david@example.com' },
    { id: 6, name: 'Emma Thompson', email: 'emma@example.com' },
    { id: 7, name: 'Chris Brown', email: 'chris@example.com' },
    { id: 8, name: 'Linda White', email: 'linda@example.com' },
    { id: 9, name: 'James Green', email: 'james@example.com' },
    { id: 10, name: 'Patricia Black', email: 'patricia@example.com' },
    { id: 11, name: 'Johir Raihan', email: 'johir@example.com' },
    { id: 12, name: 'Imon Hossen', email: 'imonhossen@example.com' },
    // Add more data as needed
  ];

  constructor() {}

  // Simulate backend API call with pagination, sorting, and filtering
  getData(pageIndex: number, pageSize: number, filter: string, sortColumn: string, sortDirection: string) {
    let filteredData = this.mockData;

    // Apply filtering
    if (filter) {
      filter = filter.trim().toLowerCase();
      filteredData = filteredData.filter(user => 
        user.name.toLowerCase().includes(filter) || 
        user.email.toLowerCase().includes(filter)
      );
    }

    // Apply sorting
    if (sortColumn && sortDirection) {
      filteredData = filteredData.sort((a, b) => {
        const isAsc = sortDirection === 'asc';
        switch (sortColumn) {
          case 'name': return this.compare(a.name, b.name, isAsc);
          case 'email': return this.compare(a.email, b.email, isAsc);
          default: return 0;
        }
      });
    }

    // Paginate the data
    const startIndex = pageIndex * pageSize;
    const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

    // Return an observable to simulate async API call
    return of({
      content: paginatedData,
      totalElements: filteredData.length
    }).pipe(delay(500));  // Simulate latency with delay
  }

  private compare(a: string, b: string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
