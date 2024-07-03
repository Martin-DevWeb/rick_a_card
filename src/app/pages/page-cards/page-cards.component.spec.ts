import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCardsComponent } from './page-cards.component';

describe('PageCardsComponent', () => {
  let component: PageCardsComponent;
  let fixture: ComponentFixture<PageCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageCardsComponent]
    });
    fixture = TestBed.createComponent(PageCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
