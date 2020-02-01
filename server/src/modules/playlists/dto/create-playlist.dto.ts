import {
  IsNotEmpty,
} from 'class-validator';

export class CreatePlaylistDto {
  @IsNotEmpty()
  readonly playlistId: number;

  @IsNotEmpty()
  readonly name: string;
}
