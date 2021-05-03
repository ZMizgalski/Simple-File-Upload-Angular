import { Component, Input, OnInit } from '@angular/core';
import { ImageViewerModel } from './models/image-viewer.model';
import { EndpointService } from './../servieces/EndpointService';
import { FileModel } from './models/file.model';
import { HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

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
  public imageViewerModel: ImageViewerModel;
  public fileList: any[];
  public imageIndex = 0;
  @Input() data?: ImageViewerModel;
  public endpointUrl: string;

  constructor(public endpointService: EndpointService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.imageViewerModel = this.data;
    this.imageViewerModel.files = this.mapImageViewerModelWithState(this.imageViewerModel);
    this.imageViewerModel = this.refractorViewerModelWithState(this.imageViewerModel);
    this.fileList = this.mapImageViewerModelWithState(this.imageViewerModel);
    this.endpointUrl = this.endpointService.url;
    this.santizeFileList();
  }

  private santizeFileList(): void {
    this.fileList.map(file => {
      this.endpointService.getFile(file.id).subscribe((resp: HttpResponse<Blob>) => {
        const blob = URL.createObjectURL(resp.body);
        file.file = this.sanitizer.bypassSecurityTrustUrl(blob);
        return file;
      });
    });
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
      galleryOpened: false,
      files: imageViewerModel.files,
    });
  }

  public openGallery(galleryOpened: boolean): void {
    this.imageViewerModel.galleryOpened = !galleryOpened;
    if (!this.imageViewerModel.galleryOpened) {
      this.imageViewerModel.files = this.mapImageViewerModelWithState(this.imageViewerModel);
    }
  }

  public next(): void {
    this.imageIndex = Math.min(this.imageIndex + 1, this.fileList.length - 1);
    this.fileList[this.imageIndex].state = false;
  }

  public prevoius(): void {
    this.imageIndex = Math.max(this.imageIndex - 1, 0);
    this.fileList[this.imageIndex].state = false;
  }

  public log(i: number): void {
    if (i !== this.imageIndex) {
      this.imageIndex = i;
      this.fileList[this.imageIndex].state = false;
    }
  }
}
