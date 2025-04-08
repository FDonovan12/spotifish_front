import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeButtonComponent } from './like-button.component';
import { UserLikeableItemService } from '../../services/user-likeable-item/user-likeable-item.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LikeableItemOutputBase } from '../../entities/likeable-item';
import { signal } from '@angular/core';

describe('LikeButtonComponent', () => {
    let component: LikeButtonComponent;
    let fixture: ComponentFixture<LikeButtonComponent>;
    let mockService: jasmine.SpyObj<UserLikeableItemService>;

    beforeEach(() => {
        mockService = jasmine.createSpyObj<UserLikeableItemService>('UserLikeableItemService', ['like', 'dislike']);

        TestBed.configureTestingModule({
            imports: [FontAwesomeModule], // nécessaire si tu utilises les icônes dans le template
            declarations: [],
            providers: [{ provide: UserLikeableItemService, useValue: mockService }],
        }).compileComponents();

        fixture = TestBed.createComponent(LikeButtonComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('likeableItem', {
            slug: 'example-slug',
            isLiked: { liked: false },
        } as LikeableItemOutputBase);

        component.ngOnInit();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should like an unlikeItem', async () => {
        mockService.like.and.resolveTo(true);

        await component.interact('example-slug');

        expect(mockService.like).toHaveBeenCalledWith('example-slug');
        expect(component.isLiked()).toBeTrue();
    });

    it('should dislike an likeItem', async () => {
        component.isLiked.set(true);
        mockService.dislike.and.resolveTo(true);

        await component.interact('example-slug');

        expect(mockService.dislike).toHaveBeenCalledWith('example-slug');
        expect(component.isLiked()).toBeFalse();
    });

    it('should stay unlike if request fail', async () => {
        mockService.like.and.resolveTo(false);

        await component.interact('example-slug');

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
