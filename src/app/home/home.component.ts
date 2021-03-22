import { Component, OnInit } from '@angular/core';
import { ImageViewerModel } from './../image-viewer/models/image-viewer.model';
import { EndpointService } from './../servieces/EndpointService';

@Component({
  selector: 'web-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public items: ImageViewerModel[];
  constructor(public endpointService: EndpointService) {}

  ngOnInit(): void {
    this.endpointService.getAllItems().subscribe(data => {
      this.items = data;
    });
  }
}
