import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  getBlogPosts() {
    return [
      {
        title: 'BlogPost1',
        description: 'dfghjkl;',
        author: 'Johir ggggg'
      },
      {
        title: 'BlogPost2',
        description: 'Some description here',
        author: 'Johir raihan'
      }
    ];

  


  }


}
