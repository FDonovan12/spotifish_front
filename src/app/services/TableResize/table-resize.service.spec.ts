import { TestBed } from '@angular/core/testing';

import { TableResizeService } from './table-resize.service';

describe('TableResizeService', () => {
  let service: TableResizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableResizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
