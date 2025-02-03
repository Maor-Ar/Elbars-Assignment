import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      unitsInStock: ['', [Validators.required, Validators.min(0)]]
    });
  }

  async ngOnInit(): Promise<void> {
    const productId = this.route.snapshot.params['id'];
    if (productId) {
      this.isEditMode = true;
      try {
        const product = await firstValueFrom(this.productService.getProduct(productId));
        this.productForm.patchValue(product);
      } catch (err) {
        this.error = 'Error loading product: ' + (err instanceof Error ? err.message : String(err));
      }
    }
  }

  async onSubmit(): Promise<void> {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      try {
        if (this.isEditMode) {
          const productId = this.route.snapshot.params['id'];
          product.id = parseInt(productId); // Ensure ID is set for update
          await firstValueFrom(this.productService.updateProduct(productId, product));
        } else {
          await firstValueFrom(this.productService.createProduct(product));
        }
        this.router.navigate(['/products']);
      } catch (err) {
        this.error = 'Error saving product: ' + (err instanceof Error ? err.message : String(err));
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}
