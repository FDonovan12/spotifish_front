import { TestBed } from '@angular/core/testing';

import { LikeableItemService } from './likeable-item.service';

describe('LikeableItemService', () => {
    let service: LikeableItemService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LikeableItemService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
