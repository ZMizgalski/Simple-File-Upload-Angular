import { Component, Input, OnInit } from '@angular/core';
import { ImageViewerModel } from './models/image-viewer.model';
import { EndpointService } from './../servieces/EndpointService';
import { Router } from '@angular/router';
import { FileModel } from './models/file.model';

@Component({
  selector: 'web-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: [
    './image-viewer.fonts.scss',
    './image-viewer.theme.scss',
    './image-viewer.roller.scss',
  ],
})
export class ImageViewerComponent implements OnInit {
  public imageViewerModel: ImageViewerModel;
  @Input() data?: ImageViewerModel;
  public endpointUrl: string;

  constructor(public endpointService: EndpointService, private router: Router) {}

  ngOnInit(): void {
    this.imageViewerModel = this.data;
    this.imageViewerModel.files = this.mapImageViewerModelWithState(this.imageViewerModel);
    this.imageViewerModel = this.refractorViewerModelWithState(this.imageViewerModel);
    this.endpointUrl = this.endpointService.url;
  }

  private mapImageViewerModelWithState(imageViewerModel: ImageViewerModel): FileModel[] {
    return imageViewerModel.files.map(item => {
      item.state = false;
      return item;
    });
  }

  private refractorViewerModelWithState(imageViewerModel: ImageViewerModel): ImageViewerModel {
    return (imageViewerModel = {
      id: imageViewerModel.id,
      name: imageViewerModel.name,
      description: imageViewerModel.description,
      files: imageViewerModel.files,
    });
  }
}
