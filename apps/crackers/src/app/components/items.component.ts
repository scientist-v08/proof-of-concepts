import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ItemsInterface } from '../interfaces/items.interface';
import { ButtonComponent } from './button.component';

@Component({
    selector: 'app-items',
    standalone: true,
    imports: [ButtonComponent, ReactiveFormsModule],
    template: `
        <div
            class="bg-white dark:bg-slate-700 rounded-lg shadow-xl p-6 lg:p-8 max-w-[100%] md:max-w-[80%] mt-4
            grid__container lg:space-x-8 space-y-8 lg:space-y-0 mx-auto"
        >
            <div class="one">{{ item().slNo }}</div>
            <div class="two">{{ item().item }}</div>
            <div class="three">
                @if (editMode()) {
                    <input
                        class="w-full dark:bg-transparent dark:text-amber-300 mb-4 p-2 border border-indigo-200 dark:border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-amber-400"
                        id="mrpInputBox"
                        [formControl]="itemForm.controls.mrpOrNet"
                        type="number"
                    />
                } @else {
                    {{ item().mrpOrNet }}
                }
            </div>
            <div class="four">{{ item().discount }}</div>
            <div class="five">
                @if (editMode()) {
                    <input
                        class="w-full dark:bg-transparent dark:text-amber-300 mb-4 p-2 border border-indigo-200 dark:border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-amber-400"
                        id="quantityInputBox"
                        [formControl]="itemForm.controls.quantity"
                        type="number"
                    />
                } @else {
                    {{ item().quantity }}
                }
            </div>
            <div class="six">{{ item().subTotal }}</div>
            <div class="seven">
                <app-button (buttonClicked)="editClicked()">
                    @if (editMode()) {
                        Done Editing
                    } @else {
                        Edit
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            style="width: 18px; height: 18px; display: inline;"
                        >
                            <path
                                fill="currentColor"
                                d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"
                            />
                        </svg>
                    }
                </app-button>
                <app-button (buttonClicked)="deleteClicked(item().slNo)">
                    Delete
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        style="width: 18px; height: 18px; display: inline;"
                    >
                        <path
                            fill="currentColor"
                            d="M166.2-16c-13.3 0-25.3 8.3-30 20.8L120 48 24 48C10.7 48 0 58.7 0 72S10.7 96 24 96l400 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-96 0-16.2-43.2C307.1-7.7 295.2-16 281.8-16L166.2-16zM32 144l0 304c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-304-48 0 0 304c0 8.8-7.2 16-16 16L96 464c-8.8 0-16-7.2-16-16l0-304-48 0zm160 72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176zm112 0c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176z"
                        />
                    </svg>
                </app-button>
            </div>
        </div>
    `,
    styles: [
        `
            .grid__container {
                display: grid;
                grid-template-columns: 0.1fr 2fr 1fr 1fr 1fr 1fr 2fr;
                grid-template-areas: 'one two three four five six seven';
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
            }
            .four {
                grid-area: four;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .five {
                grid-area: five;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .six {
                grid-area: six;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .seven {
                grid-area: seven;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 0.25rem;
            }
            @media (max-width: 768px) {
                .grid__container {
                    grid-template-columns: 1fr;
                    grid-template-areas:
                        'one'
                        'two'
                        'three'
                        'four'
                        'five'
                        'six'
                        'seven';
                }
                .seven {
                    flex-direction: column;
                }
            }
        `,
    ],
})
export class ItemsClass {
    #fb = inject(FormBuilder);
    itemForm = this.#fb.group({
        quantity: this.#fb.control(0),
        mrpOrNet: this.#fb.control(0),
    });
    item = input.required<ItemsInterface>();
    toEdit = output<ItemsInterface>();
    editMode = signal<boolean>(false);
    toDelete = output<number>();

    editClicked(): void {
        if (!this.editMode()) {
            this.editMode.set(true);
            this.itemForm.setValue({
                quantity: this.item().quantity,
                mrpOrNet: this.item().mrpOrNet,
            });
        } else {
            this.editMode.set(false);
            this.toEdit.emit({
                slNo: this.item().slNo,
                item: this.item().item,
                mrpOrNet: this.itemForm.controls.mrpOrNet.getRawValue() ?? 0,
                quantity: this.itemForm.controls.quantity.getRawValue() ?? 0,
                discount: this.item().discount,
                subTotal: this.item().subTotal,
            });
        }
    }

    deleteClicked(slNo: number): void {
        this.toDelete.emit(slNo);
    }
}
