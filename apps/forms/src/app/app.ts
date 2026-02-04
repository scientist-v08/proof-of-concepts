import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { StepperModule } from 'primeng/stepper';

interface City {
    name: string;
    code: string;
}

@Component({
    imports: [
        FormsModule,
        ButtonModule,
        FloatLabelModule,
        InputNumberModule,
        InputTextModule,
        RadioButtonModule,
        SelectModule,
        StepperModule,
    ],
    selector: 'app-root',
    template: `
        <div class="card">
            <h2 class="flex justify-center items-center text-3xl mb-4">Employee Onboarding Form</h2>
            <p-stepper class="basis-[50rem]" [(value)]="activeStep">
                <p-step-list>
                    <p-step [value]="1">Personal Information</p-step>
                    <p-step [value]="2">Department</p-step>
                    <p-step [value]="3">Contact Details</p-step>
                </p-step-list>
                <p-step-panels>
                    <p-step-panel [value]="1">
                        <ng-template #content let-activateCallback="activateCallback">
                            <div class="flex flex-col h-48">
                                <div
                                    class="border-2 border-dashed border-black dark:border-black rounded flex-auto flex flex-col justify-center items-center font-medium"
                                >
                                    <p-floatlabel variant="on">
                                        <input
                                            id="name"
                                            [(ngModel)]="name"
                                            pInputText
                                            autocomplete="off"
                                        />
                                        <label for="name">Name</label>
                                    </p-floatlabel>
                                    <p-floatlabel class="mt-4" variant="on">
                                        <p-inputnumber
                                            id="age"
                                            [(ngModel)]="age"
                                            [min]="18"
                                            [max]="100"
                                            mode="decimal"
                                        />
                                        <label for="age">Age</label>
                                    </p-floatlabel>
                                </div>
                            </div>
                            <div class="flex pt-6 justify-end">
                                <p-button
                                    [disabled]="!name || !age"
                                    (onClick)="activateCallback(2)"
                                    label="Next"
                                    icon="pi pi-arrow-right"
                                    iconPos="right"
                                />
                            </div>
                        </ng-template>
                    </p-step-panel>
                    <p-step-panel [value]="2">
                        <ng-template #content let-activateCallback="activateCallback">
                            <div class="flex flex-col h-48">
                                <div
                                    class="border-2 border-dashed border-black dark:border-black rounded flex-auto flex flex-col justify-center items-center font-medium"
                                >
                                    <div class="flex flex-wrap gap-4">
                                        <div class="flex items-center">
                                            <p-radiobutton
                                                [(ngModel)]="department"
                                                name="department"
                                                value="Engineering"
                                                inputId="dept1"
                                            />
                                            <label class="ml-2" for="dept1">Engineering</label>
                                        </div>
                                        <div class="flex items-center">
                                            <p-radiobutton
                                                [(ngModel)]="department"
                                                name="department"
                                                value="Marketing"
                                                inputId="dept2"
                                            />
                                            <label class="ml-2" for="dept2">Marketing</label>
                                        </div>
                                        <div class="flex items-center">
                                            <p-radiobutton
                                                [(ngModel)]="department"
                                                name="department"
                                                value="Sales"
                                                inputId="dept3"
                                            />
                                            <label class="ml-2" for="dept3">Sales</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex pt-6 justify-between">
                                <p-button
                                    (onClick)="activateCallback(1)"
                                    label="Back"
                                    severity="secondary"
                                    icon="pi pi-arrow-left"
                                />
                                <p-button
                                    [disabled]="!department"
                                    (onClick)="activateCallback(3)"
                                    label="Next"
                                    icon="pi pi-arrow-right"
                                    iconPos="right"
                                />
                            </div>
                        </ng-template>
                    </p-step-panel>
                    <p-step-panel [value]="3">
                        <ng-template #content let-activateCallback="activateCallback">
                            <div class="flex flex-col h-48">
                                <div
                                    class="border-2 border-dashed border-black dark:border-black rounded flex-auto flex flex-col justify-center items-center font-medium"
                                >
                                    <p-select
                                        class="w-full md:w-56"
                                        [(ngModel)]="selectedCity"
                                        [options]="cities"
                                        optionLabel="name"
                                        placeholder="Select a City"
                                    />
                                    <p-floatlabel class="mt-4" variant="on">
                                        <input
                                            id="phone"
                                            [(ngModel)]="phone"
                                            pInputText
                                            autocomplete="off"
                                        />
                                        <label for="phone">Phone Number</label>
                                    </p-floatlabel>
                                </div>
                            </div>
                            <div class="flex pt-6 justify-between">
                                <p-button
                                    (onClick)="activateCallback(2)"
                                    label="Back"
                                    severity="secondary"
                                    icon="pi pi-arrow-left"
                                />
                                <p-button
                                    [disabled]="!selectedCity || !phone"
                                    (onClick)="submitForm(); activateCallback(1)"
                                    label="Submit"
                                    icon="pi pi-check"
                                />
                            </div>
                        </ng-template>
                    </p-step-panel>
                </p-step-panels>
            </p-stepper>
        </div>
    `,
})
export class App {
    activeStep = 1;

    // Form data
    name = signal<string>('');
    age = signal<number | null>(null);
    department = signal<string>('');
    selectedCity = signal<City | null>(null);
    phone = signal<string>('');

    cities: City[] = [
        { name: 'Bangalore', code: 'BN' },
        { name: 'Indore', code: 'ID' },
        { name: 'New Delhi', code: 'ND' },
        { name: 'Mumbai', code: 'MB' },
        { name: 'Gurgaon', code: 'GN' },
    ];

    submitForm() {
        console.log('Form submitted:', {
            name: this.name(),
            age: this.age(),
            department: this.department(),
            city: this.selectedCity()?.name,
            phone: this.phone(),
        });
        this.name.set('');
        this.age.set(null);
        this.department.set('');
        this.selectedCity.set(null);
        this.phone.set('');
        // Here you could add actual submission logic, e.g., API call
        alert('Form submitted successfully!');
    }
}
