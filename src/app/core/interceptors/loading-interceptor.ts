import { NgxSpinnerService } from 'ngx-spinner';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);

  // إظهار الـ Spinner
  spinner.show();

  return next(req).pipe(
    finalize(() => {
      // إخفاء الـ Spinner عند انتهاء الطلب سواء نجح أو فشل
      spinner.hide();
    })
  );
};
