import { Component, input, output } from '@angular/core';
import { BillComparisonInterface } from '../interfaces/billComparison.interface';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'app-bill-comparison',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 lg:p-8 max-w-[100%] md:max-w-[80%] mt-4
            grid__container lg:space-x-8 space-y-8 lg:space-y-0 mx-auto"
    >
      <div class="one">
        <p>Discount: {{ allBillComparisons()[0].discount }}</p>
        <p>Grand Total: {{ allBillComparisons()[0].total }}</p>
      </div>
      <div class="two">
        <p>Discount: {{ allBillComparisons()[1].discount }}</p>
        <p>Grand Total: {{ allBillComparisons()[1].total }}</p>
        <app-button (buttonClicked)="finalize.emit(0.24)"
          >Finalize this</app-button
        >
      </div>
      <div class="three">
        <p>Discount: {{ allBillComparisons()[2].discount }}</p>
        <p>Grand Total: {{ allBillComparisons()[2].total }}</p>
        <app-button (buttonClicked)="finalize.emit(0.23)"
          >Finalize this</app-button
        >
      </div>
      <div class="four">
        <p>Discount: {{ allBillComparisons()[3].discount }}</p>
        <p>Grand Total: {{ allBillComparisons()[3].total }}</p>
        <app-button (buttonClicked)="finalize.emit(0.2)"
          >Finalize this</app-button
        >
      </div>
    </div>
  `,
  styles: [
    `
      .grid__container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-areas: 'one two three four';
      }
      .one {
        grid-area: one;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .two {
        grid-area: two;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .three {
        grid-area: three;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .four {
        grid-area: four;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      @media (max-width: 768px) {
        .grid__container {
          grid-template-columns: 1fr;
          grid-template-areas:
            'one'
            'two'
            'three'
            'four';
        }
      }
    `,
  ],
})
export class BillComparisonComponent {
  allBillComparisons = input.required<BillComparisonInterface[]>();
  finalize = output<number>();
}
