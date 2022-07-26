import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ChildActivationStart } from '@angular/router';
import { Brand } from 'src/app/entity/brand.entity';
import { Category } from 'src/app/entity/category.entity';
import { Product } from 'src/app/entity/product.entity';
import { BrandService } from 'src/app/service/brand/brand.service';
import { CategoryService } from 'src/app/service/category/category.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  products: Array<Product> = new Array<Product>;
  categories: Array<Category> = new Array<Category>;
  brands: Array<Brand> = new Array<Brand>;
  page: number = 0;
  searchForm: FormGroup = new FormGroup({
    name: new FormControl(),
  });

  constructor(private productService: ProductService, private categoryService: CategoryService, private brandService: BrandService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.page = Number(this.route.snapshot.params['page']);
    try {
      this.productService.getProductsLimit(8, this.page, 'id', 'desc', '', this.route.children[0].snapshot.params['category_Id'], this.route.children[0].snapshot.params['brand_Id']).subscribe(res => {
        this.products = res;
      });
    } catch (error) {
      this.productService.getProductsLimit(8, this.page, 'id', 'desc').subscribe(res => {
        this.products = res;
      });
    }
    

    this.categoryService.getAll().subscribe(res => {
      this.categories = res;
    })
    this.brandService.getAll().subscribe(res => {
      this.brands = res;
    })
  }

  onSearch(): void {
    this.page = 0;
    this.productService.getProductsLimit(8, this.page, 'id', 'desc', this.searchForm.value.name).subscribe(res => {
      this.products = res;
    });
  }

  sort(sort: string = 'price', order: string = 'desc'): void {
    this.productService.getProductsLimit(8, this.page, sort, order).subscribe(res => {
      this.products = res;
    });
  }

}
