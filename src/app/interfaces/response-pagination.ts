import { Employee } from './employee';

export interface ResponsePagination {
  length: number;
  pageIndex: number;
  limit: number;
  data: Employee[];
}
