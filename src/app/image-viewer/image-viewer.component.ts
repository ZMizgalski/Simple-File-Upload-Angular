import { Component, Input, OnInit } from '@angular/core';
import { ImageViewerModel } from './models/image-viewer.model';
import { EndpointService } from './../servieces/EndpointService';
import { FileModel } from './models/file.model';

@Component({
  selector: 'web-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: [
    './image-viewer.fonts.scss',
    './image-viewer.theme.scss',
    './image-viewer.loader.scss',
  ],
})
export class ImageViewerComponent implements OnInit {
  @Input() data?: ImageViewerModel;
  public imageViewerModel: ImageViewerModel;
  public fileList: any[];
  public imageIndex = 0;
  public endpointUrl: string;

  constructor(public endpointService: EndpointService) {}

  ngOnInit(): void {
    this.imageViewerModel = this.data;
    this.endpointUrl = this.endpointService.url;
    this.imageViewerModel = this.refractorViewerModelWithState(this.imageViewerModel);
    this.fileList = this.imageViewerModel.files;
  }

  private refractorViewerModelWithState(imageViewerModel: ImageViewerModel): ImageViewerModel {
    return (imageViewerModel = {
      id: imageViewerModel.id,
      name: imageViewerModel.name,
      description: imageViewerModel.description,
      galleryOpened: false,
      files: this.returnImagesUrls(imageViewerModel.files),
    });
  }

  private returnImagesUrls(files: FileModel[]): FileModel[] {
    return files.map(file => {
      file.state = false;
      return file;
    });
  }

  public openGallery(galleryOpened: boolean): void {
    this.imageViewerModel.galleryOpened = !galleryOpened;
  }

  public next(): void {
    this.imageIndex = Math.min(this.imageIndex + 1, this.fileList.length - 1);
    this.fileList[this.imageIndex].state = false;
  }

  public prevoius(): void {
    this.imageIndex = Math.max(this.imageIndex - 1, 0);
    this.fileList[this.imageIndex].state = false;
  }

  public changeImageOnClick(i: number): void {
    if (i !== this.imageIndex) {
      this.imageIndex = i;
      this.fileList[this.imageIndex].state = false;
    }
  }
}
