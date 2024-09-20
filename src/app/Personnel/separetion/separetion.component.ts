import { Component } from '@angular/core';

@Component({
  selector: 'app-separetion',
  templateUrl: './separetion.component.html',
  styleUrl: './separetion.component.css'
})
export class SeparetionComponent {
  isModalVisible = false;  // Used for modal visibility

  // Function to show the modal
  showModal(): void {
    this.isModalVisible = true;
  }

  // Function to hide the modal
  closeModal(): void {
    this.isModalVisible = false;
  }
  
}
