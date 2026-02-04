import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `
    <button
      [disabled]="isDisabled()"
      class="font-inter text-black bg-amber-200 dark:text-white dark:bg-pink-600 hover:bg-amber-100 dark:hover:bg-pink-500 
      focus:ring-2 focus:ring-amber-300 dark:focus:ring-pink-400 font-medium px-4 py-2 rounded-md transition-colors 
      disabled:opacity-50 disabled:saturate-50"
      (mousedown)="buttonClicked.emit()"
      (keydown.enter)="buttonClicked.emit()"
    >
      <ng-content />
    </button>
  `,
})
export class ButtonComponent {
  isDisabled = input<boolean>(false);
  buttonClicked = output<void>();
}
