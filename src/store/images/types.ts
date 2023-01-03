import type { CommonState, Image360, PaginationMetadata } from '../types';

export interface State extends CommonState {
  data:
    | {
        page: string[];
        items: {
          [id: string]: Image360;
        };
        metadata: PaginationMetadata;
      }
    | Record<string, never>;
  uploadProgress?: { [id: string]: number };
}
