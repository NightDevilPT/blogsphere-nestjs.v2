import { Injectable } from '@nestjs/common';
import { Blog } from 'src/blogs/entities/blog.entity';
import { Profile } from 'src/profiles/entities/profile.entity';

@Injectable()
export class PaginationService {
  paginateArray(
    data: dataType[],
    currentPage: number,
    limit: number,
  ): PaginationResult {
    const totalPages = Math.ceil(data.length / limit);
    const lastPage = totalPages || 1;
    const validPage =
      currentPage > lastPage ? Number(lastPage) : Number(currentPage);
    const paginatedData = data.slice(
      (validPage - 1) * limit,
      validPage * limit,
    );

    const nextPage = validPage < lastPage ? validPage + 1 : null;
    const previousPage = validPage > 1 ? validPage - 1 : null;

    return {
      currentPage: validPage,
      results: paginatedData,
      totalPages,
      next: nextPage,
      previous: previousPage,
    };
  }
}

// Define the interface for the pagination result
interface PaginationResult {
  currentPage: number; // Current page number
  results: dataType[]; // Paginated data for the current page
  totalPages: number; // Total number of pages
  next: number | null; // Next page number, or null if it doesn't exist
  previous: number | null; // Previous page number, or null if it doesn't exist
}

type dataType = Profile | Blog;
