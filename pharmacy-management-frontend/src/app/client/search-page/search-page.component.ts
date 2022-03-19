import {Component, OnInit} from '@angular/core';
import {Drug} from '../../model/drug';
import {DrugClientService} from '../../service/drug-client.service';
import {ActivatedRoute, ParamMap, Route, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {DrugCart} from '../../model/cart/drug-cart';
// ADD DRUG IN CART
const CART_KEY = 'drug-cart-id';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  drugCart: DrugCart;
  drugCartList: DrugCart[] = [];
  drugs: Drug[] = [];
  search?: any;
  isNameAscending = true;
  toggleBooleanPrice = true;
  toggleBooleanAmount = true;
  config: any;
  data = '';

  constructor(private drugService: DrugClientService, private router: Router, private activatedRouter: ActivatedRoute, private toastrService: ToastrService) {
    this.config = {
      itemsPerPage: 4,
      currentPage: 1
    };
    const state = this.router.getCurrentNavigation().extras.state as {data: string};
    if (state != null) {
      this.data = state.data;
    }
  }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((paramMap: ParamMap) => {
      this.search = paramMap.get('search');
      this.drugService.searchDrug(this.search).subscribe(next => {
        this.drugs = next;
      });
    });
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  sortDrugByName() {
    this.isNameAscending = !this.isNameAscending;
    this.drugs.sort((drug1: any, drug2: any) => this.compareDrugName(drug1, drug2));
  }

  compareDrugName(drug1: any, drug2: any): number {
    let compValue = 0;
    compValue = drug1.drugName.localeCompare(drug2.drugName, 'en', {
      sensitivity: 'base'
    });
    console.log(compValue);
    if (!this.isNameAscending) {
      compValue = compValue * -1;
    }
    return compValue;
  }

  sortDrugPriceDesc() {
    this.drugs = this.drugs.sort((n1, n2) => {
      if (n1.wholesalePrice < n2.wholesalePrice) {
        this.toggleBooleanPrice = true;
        return 1;
      }

      if (n1.wholesalePrice > n2.wholesalePrice) {
        this.toggleBooleanPrice = true;
        return -1;
      }
      this.toggleBooleanPrice = true;
      return 0;
    });
  }

  sortDrugPriceAsc() {
    this.drugs = this.drugs.sort((n1, n2) => {
      if (n1.wholesalePrice < n2.wholesalePrice) {
        this.toggleBooleanPrice = false;
        return -1;
      }

      if (n1.wholesalePrice > n2.wholesalePrice) {
        this.toggleBooleanPrice = false;
        return 1;
      }
      this.toggleBooleanPrice = false;
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
