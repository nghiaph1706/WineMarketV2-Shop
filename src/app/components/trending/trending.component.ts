import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/entity/product.entity';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html'
})
export class TrendingComponent implements OnInit {
  trendingProducts: Array<Product> = new Array<Product>();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductsLimit(6,0,"id","desc").subscribe(res => {
      this.trendingProducts = res;
    })
  }

}
