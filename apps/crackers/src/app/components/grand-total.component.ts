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
                <app-button (buttonClicked)="generateBill.emit()">
                    Generate Bill
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        style="width: 18px; height: 18px; display: inline;"
                    >
                        <path
                            fill="currentColor"
                            d="M112 112c0 35.3-28.7 64-64 64l0 160c35.3 0 64 28.7 64 64l288 0c0-35.3 28.7-64 64-64l0-160c-35.3 0-64-28.7-64-64l-288 0zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zm256 16a112 112 0 1 1 0 224 112 112 0 1 1 0-224zm-16 44c-11 0-20 9-20 20 0 9.7 6.9 17.7 16 19.6l0 48.4-4 0c-11 0-20 9-20 20s9 20 20 20l48 0c11 0 20-9 20-20s-9-20-20-20l-4 0 0-68c0-11-9-20-20-20l-16 0z"
                        />
                    </svg>
                </app-button>
                <app-button (buttonClicked)="previewBill.emit()">
                    Preview Bill
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        style="width: 18px; height: 18px; display: inline;"
                    >
                        <path
                            fill="currentColor"
                            d="M112 112c0 35.3-28.7 64-64 64l0 160c35.3 0 64 28.7 64 64l288 0c0-35.3 28.7-64 64-64l0-160c-35.3 0-64-28.7-64-64l-288 0zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zm256 16a112 112 0 1 1 0 224 112 112 0 1 1 0-224zm-16 44c-11 0-20 9-20 20 0 9.7 6.9 17.7 16 19.6l0 48.4-4 0c-11 0-20 9-20 20s9 20 20 20l48 0c11 0 20-9 20-20s-9-20-20-20l-4 0 0-68c0-11-9-20-20-20l-16 0z"
                        />
                    </svg>
                </app-button>
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
