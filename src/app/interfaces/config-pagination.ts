export interface Sort {
  field: string;
  order: string;
}

export interface Search {
  firstName: string;
  lastName: string;
  group: string;
}

export interface ConfigPagination {
  pageIndex: number;
  limit: number;
  search: Search;
  sort: Sort;
}
