import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  backgroundImageUrl: string = 'assets/river.avif'; // Initial image path
  imageIndex: number = 1; // Initial image index
  imagePaths: string[] = [
    'assets/river.avif',
    'assets/mountain.avif',
    'assets/nature.jpg'
    // Add more image paths as needed
  ];

  ngOnInit() {
    interval(5000) // Emit value every 5 seconds
      .subscribe(() => {
        this.changeBackgroundImage();
      });
  }

  changeBackgroundImage() {
    this.imageIndex = (this.imageIndex + 1) % this.imagePaths.length; // Cycle through image paths
    this.backgroundImageUrl = this.imagePaths[this.imageIndex];
  }
}
