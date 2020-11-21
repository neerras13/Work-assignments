import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongcardComponent } from './longcard.component';

describe('LongcardComponent', () => {
  let component: LongcardComponent;
  let fixture: ComponentFixture<LongcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
