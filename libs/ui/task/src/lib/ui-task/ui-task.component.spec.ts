import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTaskComponent } from './ui-task.component';

describe('UiTaskComponent', () => {
  let component: UiTaskComponent;
  let fixture: ComponentFixture<UiTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiTaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
