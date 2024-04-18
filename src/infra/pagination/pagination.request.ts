import { Max, Min } from "class-validator";

export class PaginationRequest {
  constructor(pageNumber: number, pageSize: number) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }

  @Min(1)
  pageNumber: number;

  @Min(1)
  @Max(25)
  pageSize: number;
}
