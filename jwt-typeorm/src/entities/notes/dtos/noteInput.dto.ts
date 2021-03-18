import {
  IsString,
  Length,
  IsOptional,
  MaxLength,
  IsUUID,
} from 'class-validator';
import { NoteInput, NoteUpdateInput } from '../interfaces';

export class NoteInputDto implements NoteInput {
  @IsString()
  @Length(1, 20, {
    message: 'Title\'s can be 1-20 characters long',
  })
  public title: string;

  @IsOptional()
  @IsString()
  @MaxLength(20, {
    message: 'Folder name cannot be longer than 20 characters',
  })
  public folder: string;

  @IsString()
  public content: string;

  @IsUUID('all')
  public creatorId: string;
}

export class NoteUpdateInputDto extends NoteInputDto implements NoteUpdateInput {
  @IsUUID('all')
  public id: string;
}
