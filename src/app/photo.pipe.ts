import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'photo'
})
export class PhotoPipe implements PipeTransform {
  transform(photos: any[], criteria: string): any[] {
    criteria = criteria ? criteria.trim() : '';
    if (!criteria) return photos;

    return photos.filter(photo => {
      return photo.tags && hasCriteria(photo.tags, criteria);
    });
  }

  isPhotoActive(photo: any, criteria: string) {
    if (!criteria) return true;
    return hasCriteria(photo.tags, criteria);
  }
}

function hasCriteria(tags: string[], criteria: string) {
  return tags.some(tag => {
    return tag.toLowerCase().indexOf(criteria) >= 0;
  });
}
