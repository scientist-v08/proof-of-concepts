import { Component, input, output } from '@angular/core';
import { ButtonComponent } from './button.component';

@Component({
    selector: 'app-grand-total',
    standalone: true,
    imports: [ButtonComponent],
    template: `
        <div
            class="bg-white dark:bg-slate-700 rounded-lg shadow-xl p-6 lg:p-8 max-w-[100%] md:max-w-[80%] mt-4
            grid__container lg:space-x-8 space-y-8 lg:space-y-0 mx-auto"
        >
            <div class="one">
                <h1>Grand Total:</h1>
            </div>
            <div class="two">{{ grandTotal() }}</div>
            <div class="three">
                <app-button (buttonClicked)="generateBill.emit()">Generate Bill</app-button>
                <app-button (buttonClicked)="previewBill.emit()">Preview Bill</app-button>
                <app-button (buttonClicked)="comparePrices.emit()">Compare prices</app-button>
                <app-button (buttonClicked)="newBill.emit()">New Bill</app-button>
            </div>
        </div>
    `,
    styles: [
        `
            .grid__container {
                display: grid;
                grid-template-columns: 1fr 1fr 3fr;
                grid-template-areas: 'one two three';
            }
            .one {
                grid-area: one;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .two {
                grid-area: two;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .three {
                grid-area: three;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
            }
            @media (max-width: 768px) {
                .grid__container {
                    grid-template-columns: 1fr;
                    grid-template-areas:
                        'one'
                        'two'
                        'three';
                }
            }
        `,
    ],
})
export class GrandTotalComponent {
    grandTotal = input.required<number>();
    generateBill = output<void>();
    previewBill = output<void>();
    comparePrices = output<void>();
    newBill = output<void>();
}
