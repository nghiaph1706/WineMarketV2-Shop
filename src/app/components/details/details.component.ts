import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/entity/product.entity';
import { ProductService } from 'src/app/service/product/product.service';
import { CookieService } from 'ngx-cookie-service';
import { CartDetailsService } from 'src/app/service/cartDetails/cart-details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
  product = new Product;
  productForm: FormGroup = new FormGroup({
    cartId: new FormControl,
    productId: new FormControl,
    quantity: new FormControl,
    total: new FormControl
  })
  constructor(private productService: ProductService, private route:ActivatedRoute, private cookieService: CookieService, private cartDetailsService: CartDetailsService) { }

  ngOnInit(): void {
    this.getRoute(this.route.snapshot.params['id']);
  }

  getRoute(id:any){
    this.productService.find(id).subscribe((res:any)=>{
      this.product = res;
    });
    this.productForm.controls['quantity'].setValue(1)
  }

  addToCart(){
    this.productForm.controls['cartId'].setValue(this.cookieService.get('cart_Id'))
    this.productForm.controls['productId'].setValue(this.product.id)
    this.productForm.controls['total'].setValue(Number(this.productForm.controls['quantity'].value) * Number(this.product.price))
    this.cartDetailsService.create(this.productForm.value).subscribe(
      data => {
        console.log(data);
      }
    )
  }

}
