import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnswerComponentComponent } from './add-answer-component.component';

describe('AddAnswerComponentComponent', () => {
  let component: AddAnswerComponentComponent;
  let fixture: ComponentFixture<AddAnswerComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnswerComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnswerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
