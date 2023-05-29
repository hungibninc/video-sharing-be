import { Expose, Transform } from 'class-transformer';

export class VideoDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  desc: string;

  @Expose()
  url: string;

  /**
   * this entire line right here says take the original video entity then Look at its user property and look at that users ID, so take that value and assign it to this brand new property that we are adding in userId variable
  */
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
