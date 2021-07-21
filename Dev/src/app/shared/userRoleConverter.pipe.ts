import { PipeTransform, Pipe } from '@angular/core';
import { roleEnum } from '../component_providers/shared/Enums/role.enum';

@Pipe({ name: 'userRoleConverter' })
export class UserRoleConverterPipe implements PipeTransform {
  transform(value: number | any): string {
    if (value === roleEnum.wearer) {
      return 'Wearer (' + value + ')';
    } else if (value === roleEnum.manufacturer) {
      return 'Manufacturer (' + value + ')';
    } else if (value === roleEnum.scientist) {
      return 'Scientist (' + value + ')';
    } else if (value === roleEnum.analyst) {
      return 'Analyst (' + value + ')';
    } else if (value === roleEnum.manager) {
      return 'Manager (' + value + ')';
    } else if (value === roleEnum.administrator) {
      return 'Administrator (' + value + ')';
    } else if (value === roleEnum.auditor) {
      return 'Auditor (' + value + ')';
    } else if (value === roleEnum.developer) {
      return 'Developer (' + value + ')';
    } else {
      return '';
    }
  }
}
