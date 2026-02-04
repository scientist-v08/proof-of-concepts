import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { DiscountDropdownInterface } from '../../interfaces/discountDropdown.interface';
import { DropdownInterface } from '../../interfaces/dropdown.interface';
import { ButtonComponent } from '../../components/button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemsInterface } from '../../interfaces/items.interface';
import { ItemsClass } from '../../components/items.component';
import { GrandTotalComponent } from '../../components/grand-total.component';
import { BillingService } from '../../services/billing.service';
import {
  BillDetailsInterface,
  BillResponseInterface,
} from '../../interfaces/billDetails.interface';
import { Subject, takeUntil, tap } from 'rxjs';
import { BillComparisonInterface } from '../../interfaces/billComparison.interface';
import { BillComparisonComponent } from '../../components/bill-comparison.component';
import { Dialog } from 'primeng/dialog';
import { SpinnerComponent } from '../../components/spinner.component';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {
  categoryDropdown,
  companyDropdown,
  discountDropDownOptions,
} from '../../constants/billing.constants';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    ItemsClass,
    GrandTotalComponent,
    BillComparisonComponent,
    Dialog,
    SpinnerComponent,
    Toast,
  ],
  templateUrl: './billing.component.html',
  providers: [MessageService],
})
export default class BillingComponent implements AfterViewChecked, OnDestroy {
  #fb = inject(FormBuilder);
  #billingService = inject(BillingService);
  #messageService = inject(MessageService);
  billingForm = this.#fb.group({
    discount: this.#fb.control('0.25', [Validators.required]),
    company: this.#fb.control('', [Validators.required]),
    category: this.#fb.control('', [Validators.required]),
    name: this.#fb.control(''),
    number: this.#fb.control(''),
    MRP: this.#fb.control(0, [Validators.required]),
    quantity: this.#fb.control(1, [Validators.required]),
  });
  visible = false;
  discountDropDownOptions = signal<DiscountDropdownInterface[]>(
    discountDropDownOptions
  );
  companyDropdown = signal<DropdownInterface[]>(companyDropdown);
  categoryDropdown = signal<DropdownInterface[]>(categoryDropdown);
  showItems = signal<boolean>(false);
  slNo = signal<number>(0);
  items = signal<ItemsInterface[]>([]);
  totalCost = signal<number>(0);
  showTotal = signal<boolean>(false);
  divEl = viewChild<ElementRef>('scroll');
  comparisonDiv = viewChild<ElementRef>('comparison');
  shouldScroll = signal<boolean>(false);
  scrollToCompare = signal<boolean>(false);
  selectAtLeastOneitem = signal<boolean>(false);
  billId = '';
  billComparison = signal<BillComparisonInterface[]>([]);
  showComparisons = signal<boolean>(false);
  unsubscribe$ = new Subject<void>();

  ngAfterViewChecked(): void {
    if (this.shouldScroll() && this.divEl()) {
      this.divEl()?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      this.shouldScroll.set(false);
    }
    if (this.scrollToCompare() && this.comparisonDiv()) {
      this.comparisonDiv()?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      this.scrollToCompare.set(false);
    }
  }

  addItem(): void {
    if (this.billingForm.valid) {
      this.slNo.update((num) => num + 1);
      const obtainedDiscount =
        Number(this.billingForm.controls.discount.getRawValue()) ?? 0;
      const actualDiscount = 100 - obtainedDiscount * 100;
      const newItem: ItemsInterface = this.#billingService.addNewItemToBill(
        this.slNo(),
        this.billingForm.controls.company.getRawValue(),
        this.billingForm.controls.category.getRawValue(),
        this.billingForm.controls.MRP.getRawValue(),
        this.billingForm.controls.quantity.getRawValue(),
        actualDiscount,
        obtainedDiscount
      );
      this.items.update((currentItems) => [...currentItems, newItem]);
      if (!this.showItems()) {
        this.showItems.set(true);
      }
    } else {
      this.billingForm.markAllAsTouched();
    }
  }

  calculateTotal(): void {
    if (this.items().length > 0) {
      this.selectAtLeastOneitem.set(false);
      this.totalCost.set(
        this.items().reduce((sum, item) => sum + item.subTotal, 0)
      );
      if (!this.showTotal()) {
        this.showTotal.set(true);
      }
      this.shouldScroll.set(true);
    } else {
      this.selectAtLeastOneitem.set(true);
    }
  }

  newBill(): void {
    this.billingForm.setValue({
      discount: '0.25',
      company: '',
      category: '',
      name: '',
      number: '',
      MRP: 0,
      quantity: 1,
    });
    this.showItems.set(false);
    this.showTotal.set(false);
    this.items.set([]);
    this.slNo.set(0);
    this.shouldScroll.set(false);
    this.billComparison.set([]);
    this.showComparisons.set(false);
    this.billingForm.markAsUntouched();
  }

  private percentToDecimal(percentStr: string): number {
    const num = parseFloat(percentStr.replace('%', '').trim());
    return isNaN(num) ? 0 : 1 - num / 100;
  }

  onEdited(updatedItem: ItemsInterface) {
    updatedItem.subTotal = this.#billingService.subTotalCalculation(
      updatedItem.item.startsWith('Standard:') ? 'Standard' : updatedItem.item,
      this.percentToDecimal(updatedItem.discount),
      updatedItem.quantity,
      updatedItem.mrpOrNet
    );
    this.items.update((currentItems) =>
      currentItems.map((item) =>
        item.slNo === updatedItem.slNo ? updatedItem : item
      )
    );
    this.billComparison.set([]);
    this.showComparisons.set(false);
    this.calculateTotal();
  }

  deleteItem(index: number): void {
    const actualIndex = index - 1;
    this.items.update((current) => {
      const next = current.filter((_, i) => i !== actualIndex);
      return next.map((it, i) => ({
        ...it,
        slNo: i + 1,
      }));
    });
    this.slNo.update((current) => current - 1);
    this.billComparison.set([]);
    this.showComparisons.set(false);
    this.calculateTotal();
  }

  generateBill(): void {
    const customerName = this.billingForm.controls.name.getRawValue() ?? '';
    const mobileNumber = this.billingForm.controls.number.getRawValue() ?? '';
    if (customerName.length < 1 || mobileNumber.length !== 10) {
      this.#messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          'The customer name and the customer mobile number is to be entered without any errors',
        key: 'br',
        life: 3000,
      });
      return;
    }
    const requestBody: BillDetailsInterface = {
      user: customerName,
      mobile: mobileNumber,
      grandTotal: this.totalCost(),
      billItems: this.items(),
    };
    this.#billingService
      .generateBill(requestBody)
      .pipe(
        tap(() => (this.visible = true)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: (res: BillResponseInterface) => {
          this.visible = false;
          const blobUrl = window.URL.createObjectURL(res.file);
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = res.filename;
          a.click();
          window.URL.revokeObjectURL(blobUrl);
          const whatsappTab =
            'https://wa.me/91' +
            (this.billingForm.controls.number.getRawValue() ?? '');
          window.open(whatsappTab, '_blank');
        },
        error: () => {
          this.#messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to process the request',
            key: 'br',
            life: 3000,
          });
        },
      });
  }

  previewBill(): void {
    const requestBody: BillDetailsInterface = {
      user: this.billingForm.controls.name.getRawValue() ?? '',
      mobile: this.billingForm.controls.number.getRawValue() ?? '',
      grandTotal: this.totalCost(),
      billItems: this.items(),
    };
    this.#billingService
      .generatePreviewBill(requestBody)
      .pipe(
        tap(() => (this.visible = true)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: (res: BillResponseInterface) => {
          this.visible = false;
          const blobUrl = window.URL.createObjectURL(res.file);
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = res.filename;
          a.click();
          window.URL.revokeObjectURL(blobUrl);
          const whatsappTab =
            'https://wa.me/91' +
            (this.billingForm.controls.number.getRawValue() ?? '');
          window.open(whatsappTab, '_blank');
        },
        error: () => {
          this.#messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to process the request',
            key: 'br',
            life: 3000,
          });
        },
      });
  }

  comparePrices(): void {
    const discountRates = [0.25, 0.24, 0.23, 0.2] as const;
    const comparisons = discountRates.map((rate) =>
      this.#billingService.billComparison(this.items(), rate)
    );
    this.billComparison.set(comparisons);
    this.showComparisons.set(true);
    this.scrollToCompare.set(true);
  }

  finalizedBill(discount: number): void {
    const allItems = this.#billingService.finalizedBill(this.items(), discount);
    this.items.set(allItems);
    this.billComparison.set([]);
    this.showComparisons.set(false);
    this.totalCost.set(
      this.items().reduce(
        (sum, item) => sum + Math.floor(item.subTotal || 0),
        0
      )
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
