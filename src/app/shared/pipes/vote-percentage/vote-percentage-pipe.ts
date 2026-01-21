import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'votePercentage',
})
export class VotePercentagePipe implements PipeTransform {
  transform(voteAverage: number | null | undefined): string {
    if (voteAverage === null || voteAverage === undefined) {
      return '0%';
    }

    const percentage = Math.round(voteAverage * 10);
    return `${percentage}%`;
  }
}
