import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeButtonComponent } from './like-button.component';
import { UserLikeableItemService } from '../../../repositories/user-likeable-item/user-likeable-item.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { defaultIsLiked, defaultLikeableItemOutputBase } from '../../../entities/likeable-item';

describe('LikeButtonComponent', () => {
    let component: LikeButtonComponent;
    let fixture: ComponentFixture<LikeButtonComponent>;
    let mockService: jasmine.SpyObj<UserLikeableItemService>;

    beforeEach(() => {
        mockService = jasmine.createSpyObj<UserLikeableItemService>('UserLikeableItemService', ['like', 'dislike']);

        TestBed.configureTestingModule({
            imports: [FontAwesomeModule],
            declarations: [],
            providers: [{ provide: UserLikeableItemService, useValue: mockService }],
        }).compileComponents();

        fixture = TestBed.createComponent(LikeButtonComponent);
        component = fixture.componentInstance;

        const likeableItem = defaultLikeableItemOutputBase().isLiked(defaultIsLiked().liked(false).build()).build();
        fixture.componentRef.setInput('likeableItem', likeableItem);

        component.ngOnInit();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should like an unlike Item', async () => {
        mockService.like.and.resolveTo(true);

        await component.interact('slug');

        expect(mockService.like).toHaveBeenCalledWith('slug');
        expect(component.isLiked()).toBeTrue();
    });

    it('should dislike a like Item', async () => {
        component.isLiked.set(true);
        mockService.dislike.and.resolveTo(true);

        await component.interact('slug');

        expect(mockService.dislike).toHaveBeenCalledWith('slug');
        expect(component.isLiked()).toBeFalse();
    });

    it('should stay unlike if request fail', async () => {
        mockService.like.and.resolveTo(false);

        await component.interact('slug');

        expect(mockService.like).toHaveBeenCalledWith('slug');
        expect(component.isLiked()).toBeFalse();
    });

    it('should be hovering on over()', () => {
        component.over();
        expect(component.isHovering()).toBeTrue();
    });

    it('should not be hovering on leave()', () => {
        component.isHovering.set(true);
        component.leave();
        expect(component.isHovering()).toBeFalse();
    });
});
