import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ description: 'Title of the blog', default: 'My Blog Title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the blog',
    default:
      'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Data/content of the blog',
    default: '<h1>Hello World</h1><br><p>This is the content of my blog.</p>',
  })
  @IsNotEmpty()
  @IsString()
  data: string;

  @ApiProperty({
    description: 'URL of the blog image',
    default: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiProperty({
    description: 'Array of tags associated with the blog',
    default: ['reactjs', 'nextjs'],
  })
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    description: 'True to publish',
    default: false,
  })
  @IsBoolean()
  publish: boolean;

  @ApiProperty({
    description: 'Date to publish Blog',
    default: null,
  })
  @IsDate()
  schedular: Date;
}
