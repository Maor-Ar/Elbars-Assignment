import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule
  ]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchControl = new FormControl('');
  sortColumn = '';
  sortDirection = 'asc';
  displayedColumns = ['name', 'category', 'price', 'unitsInStock', 'actions'];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
    this.setupSearch();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.applyFilter();
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  setupSearch(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.currentPage = 1;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const searchTerm = this.searchControl.value?.toLowerCase() || '';
    let filtered = [...this.products];
    
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
    this.sortProducts(filtered);
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilter();
  }

  sortProducts(filtered: Product[]): void {
    if (!this.sortColumn) {
      this.filteredProducts = filtered;
      this.totalPages = Math.ceil(filtered.length / this.pageSize);
      const startIndex = (this.currentPage - 1) * this.pageSize;
      this.filteredProducts = filtered.slice(startIndex, startIndex + this.pageSize);
      return;
    }

    filtered.sort((a, b) => {
      const aValue = a[this.sortColumn as keyof Product];
      const bValue = b[this.sortColumn as keyof Product];
      const direction = this.sortDirection === 'asc' ? 1 : -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * direction;
      } else {
        return ((aValue as number) - (bValue as number)) * direction;
      }
    });
    this.filteredProducts = filtered;
    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.filteredProducts = filtered.slice(startIndex, startIndex + this.pageSize);
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return 'unfold_more';
    return this.sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFilter();
    }
  }

  onAdd(): void {
    this.router.navigate(['/products/new']);
  }

  onEdit(product: Product): void {
    this.router.navigate(['/products/edit', product.id]);
  }

  onDelete(product: Product): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        }
      });
    }
  }
}
