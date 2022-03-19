import { Component, OnInit } from '@angular/core';
import {DrugClientService} from '../../service/drug-client.service';
import {Drug} from '../../model/drug';
import {ToastrService} from 'ngx-toastr';
import {DrugCart} from '../../model/cart/drug-cart';
// ADD DRUG IN CART
const CART_KEY = 'drug-cart-id';

@Component({
  selector: 'app-hot-deals',
  templateUrl: './hot-deals.component.html',
  styleUrls: ['./hot-deals.component.css']
})
export class HotDealsComponent implements OnInit {
  drugCart: DrugCart;
  drugCartList: DrugCart[] = [];
  drugs: Drug[] = [];

  constructor(private drugService: DrugClientService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.drugService.getAll().subscribe(next => {
      this.drugs = next;
      this.sortDrugPriceAsc();
    });
  }

  sortDrugPriceAsc() {
    this.drugs = this.drugs.sort((n1, n2) => {
      if (n1.wholesalePrice < n2.wholesalePrice) {
        return -1;
      }

      if (n1.wholesalePrice > n2.wholesalePrice) {
        return 1;
      }

      return 0;
    });
  }

  //#region ADD DRUG IN CART
  addCart(drugId: number, drugName: string) {
    this.drugCartList = JSON.parse(localStorage.getItem(CART_KEY));
    this.drugService.findDrugCartById(drugId).subscribe(drug => {
      let flag = false;
      console.log(this.drugCartList);
      if (!this.drugCartList) {
        this.drugCartList = [];
        this.addDrugCart(drugId, 1);
        this.drugCartList.push(this.drugCart);
      } else {
        for (let i = 0; i < this.drugCartList.length; i++) {
          if (this.drugCartList[i].drugId == drugId) {
            if (this.drugCartList[i].count >= drug.drugAmount) {
              this.showMessageError(drugName);
              return;
            }
            this.addDrugCart(drugId, this.drugCartList[i].count + 1);
            this.drugCartList[i] = this.drugCart;
            flag = true;
          }
        }
        if (!flag) {
          this.addDrugCart(drugId, 1);
          this.drugCartList.push(this.drugCart);
        }
      }
      console.log(this.drugCartList);
      this.showMessageSuccess(drugName);
      localStorage.removeItem(CART_KEY);
      localStorage.setItem(CART_KEY, JSON.stringify(this.drugCartList));
    });
  }

  addDrugCart(drugID: number, count: number) {
    this.drugCart = {
      drugId: drugID,
      count: count,
      drugName: '',
      wholesalePrice: 0,
      drugAmount: 0,
      drugImageDetails: 0,
      price: 0,
    }
  }

  showMessageSuccess(drugName: string) {
    this.toastrService.success('Thêm thành công ' + drugName, 'Thông báo', {
      timeOut: 1000,
      progressBar: true,
    });
  }

  showMessageError(drugName: string) {
    this.toastrService.error('Thuốc ' + drugName + ' đã hết hàng', 'Thông báo', {
      timeOut: 1000,
      progressBar: true,
    });
  }

  //#endregion
}
