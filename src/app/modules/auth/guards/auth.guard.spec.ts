import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { UserService } from '../../services/user.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['isAuthenticated']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    authGuard = TestBed.inject(AuthGuard); 
  });

  it('should allow access if user is authenticated', () => {
    userServiceSpy.isAuthenticated.and.returnValue(true);

    const result = authGuard.canActivate();

    expect(result).toBeTrue();
  });

  it('should block access if user is not authenticated and redirect to login', () => {
    userServiceSpy.isAuthenticated.and.returnValue(false);
    const urlTreeMock = {} as any; 
    routerSpy.createUrlTree.and.returnValue(urlTreeMock);

    const result = authGuard.canActivate();

    expect(result).toBe(urlTreeMock);
    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/login']);
  });
});
