import { FileModel } from './file.model';

export interface ImageViewerModel {
  id?: string;
  name?: string;
  description?: string;
  galleryOpened?: boolean;
  files?: FileModel[];
}
