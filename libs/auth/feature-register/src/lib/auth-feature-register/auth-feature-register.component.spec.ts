import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFeatureRegisterComponent } from './auth-feature-register.component';

describe('AuthFeatureRegisterComponent', () => {
  let component: AuthFeatureRegisterComponent;
  let fixture: ComponentFixture<AuthFeatureRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeatureRegisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFeatureRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
