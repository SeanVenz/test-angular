import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsLessonComponent } from './subjects-lesson.component';

describe('SubjectsLessonComponent', () => {
  let component: SubjectsLessonComponent;
  let fixture: ComponentFixture<SubjectsLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectsLessonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectsLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
