export interface BaseResponse {
  title: string;
  result: PaginationResult | MasterPaginationResult | any;
  status: {
    code: string;
    desc: string;
  };
}

export interface PaginationResult {
  pageSize?: number;
  totalRecord?: number;
  pageNumber?: number;
  totalItems?: number;
  data: any;
}

export interface MasterPaginationResult {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  items: any;
}
