import { TestBed } from '@angular/core/testing';

import { LikedItemService } from './likeable-item.service';

describe('LikedItemService', () => {
    let service: LikedItemService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LikedItemService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
