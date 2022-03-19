import {Component, OnInit} from '@angular/core';
import {Drug} from '../../model/drug';
import { DrugGroupDto} from '../../model/drug-group';
import {DrugClientService} from '../../service/drug-client.service';
import {DrugGroupClientService} from '../../service/drug-group-client.service';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {DrugCart} from "../../model/cart/drug-cart";
// ADD DRUG IN CART
const CART_KEY = 'drug-cart-id';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  drugs: Drug[] = [];
  drugCart: DrugCart;
  drugCartList: DrugCart[] = [];
  drugGroups: DrugGroupDto[] = [];
  config: any;
  data = '';
  total = 0;
  constructor(private drugService: DrugClientService, private drugGroupService: DrugGroupClientService, private router: Router, private toastrService: ToastrService) {
    this.config = {
      itemsPerPage: 3,
      currentPage: 1
    };
    const state = this.router.getCurrentNavigation().extras.state as { data: string };
    if (state != null) {
      this.data = state.data;
    }
  }

  getDrugByDrugGroup(drugGroupName) {
    if (this.drugs !== null){
      return this.drugs.filter(drug => drug.drugGroup == drugGroupName);
    }
  }


  ngOnInit(): void {
    this.getAllDrugGroup();
    this.getAllDrug();
    // localStorage.removeItem(CART_KEY);
  }

  getAllDrug() {
    this.drugService.getAll().subscribe(next => {
      this.drugs = next;
      console.log(this.drugs)
    });
  }


  getAllDrugGroup() {
    this.drugGroupService.getAll().subscribe(next => {
      this.drugGroups = next;
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
