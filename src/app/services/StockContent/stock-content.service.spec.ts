import { TestBed } from '@angular/core/testing';

import { StockContentService } from './stock-content.service';

describe('StockContentService', () => {
  let service: StockContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
