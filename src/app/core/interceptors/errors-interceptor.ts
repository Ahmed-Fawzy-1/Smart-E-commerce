import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      // حماية من error مالوش message
      const errorMessage = err?.error?.message || 'حدث خطأ غير متوقع 😢';

      toastrService.error(errorMessage, 'خطأ');

      return throwError(() => err);
    })
  );
};
