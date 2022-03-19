import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {LookupService} from '../../../service/lookup.service';
import {CustomerLookup} from '../../../model/lookup/customer-lookup';
import {ManufacturerLookup} from '../../../model/lookup/manufacturer-lookup';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {CustomerGroupLookup} from '../../../model/lookup/customer-group-lookup';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent implements OnInit {
  //#region DATA
  lookups = [
    {eng: 'drug', vn: 'Thuốc'},
    {eng: 'prescription', vn: 'Toa thuốc'},
    {eng: 'employee', vn: 'Nhân viên'},
    {eng: 'bill', vn: 'Hóa đơn'},
    {eng: 'manufacturer', vn: 'Nhà cung cấp'},
    {eng: 'customer', vn: 'Khách hàng'}
  ];
  attributes = {
    manufacturer: [
      {eng: 'code', vn: 'Mã nhà cung cấp'},
      {eng: 'name', vn: 'Tên nhà cung cấp'},
      {eng: 'address', vn: 'Địa chỉ'},
      {eng: 'phone', vn: 'Điện thoại'}
    ],
    customer: [
      {eng: 'code', vn: 'Mã khách hàng'},
      {eng: 'name', vn: 'Tên khách hàng'},
      {eng: 'address', vn: 'Địa chỉ'},
      {eng: 'phone', vn: 'Điện thoại'},
      {eng: 'groupId', vn: 'Nhóm khách hàng'}]
  };
  // #endregion

  selectItem = '';
  selectAttribute = '';
  mySearch = this.fb.group({
    inputLookup: ['']
  });
  myChoose = this.fb.group({
    selectItem: [''],
    selectAttribute: []
  });
  thead = null;

  //#region SEARCH INFO
  customers: CustomerLookup[] = [];
  customerTh = ['Mã KH', 'Tên khách hàng', 'Tuổi', 'Địa chỉ', 'Số điện thoại', 'Nhóm KH', 'Ghi chú'];
  customerGroup: CustomerGroupLookup[] = [];

  manufacturers: ManufacturerLookup[] = [];
  manufacturerTh = ['Mã NXS', 'Tên nhà sản xuất', 'Địa chỉ', 'Số điện thoại', 'Ghi chú'];

  messageError = '';
  inputLook = '';
  //#endregion

  //#region PAGE
  pages: Array<any> = [];
  page = 0;
  //#endregion

  // back
  listLookup = [];

  constructor(private fb: FormBuilder,
              private lookupService: LookupService,

              private router: Router) {
  }

  ngOnInit(): void {
    this.lookupService.getCustomerGroups().subscribe(list => {
      this.customerGroup = list;
    });
  }

  //#region SEARCH INFO
  search() {
    this.selectLookup();
    if (!this.selectAttribute) {
      this.selectAttribute = 'all';
    }
    this.inputLook = this.mySearch.value.inputLookup.trim();
    this.listLookup.push([this.selectItem, this.selectAttribute, this.inputLook]);
    this.searchByKeys(this.selectItem, this.selectAttribute, this.inputLook);
  }

  searchByKeys(item: string, attribute: string, inputLookup: string) {
    this.pages = [];
    console.log(attribute);
    console.log(inputLookup);
    this.messageError = '';
    switch (item) {
      case 'customer':
        if (this.thead != this.customerTh){
          this.thead = this.customerTh;
        }
        this.manufacturers = [];
        if (attribute  == 'groupId' && inputLookup == null){
          inputLookup = '';
        }
        this.lookupService.getCustomersByKeyWord(attribute, inputLookup, this.page).subscribe(data => {
          this.customers = data.content;
          this.pages = new Array<any>(data.totalPages);
          if (!data.content.length) {
            this.showMessageNotFound();
          }
        }, error => {
          alert('error');
        });
        if( attribute == 'groupId') {
          this.mySearch.reset();
        }
        break;
      case 'manufacturer':
        if (this.thead != this.manufacturerTh){
          this.thead = this.manufacturerTh  ;
        }
        this.customers = [];
        this.lookupService.getManufacturerByKeyWord(attribute, inputLookup, this.page).subscribe(data => {
          this.manufacturers = data.content;
          this.pages = new Array<any>(data.totalPages);
          if (!data.content.length) {
            this.showMessageNotFound();
          }
        }, error => {
          alert('error');
        });
        this.thead = this.manufacturerTh;
        break;
      default:
        break;
    }
  }

  showMessageNotFound() {
    this.messageError = 'Không tìm thấy kết quả';
    this.thead = [];
  }

  selectLookup() {
    this.selectItem = this.myChoose.value.selectItem;
    this.selectAttribute = this.myChoose.value.selectAttribute;
  }

  //#endregion

  //#region PAGE
  setPage(i: number) {
    this.page = i;
    this.search();
  }

  previous() {
    if (this.page === 0) {
      alert('Không tìm thấy trang');
    } else {
      this.page = this.page - 1;
      this.search();
    }
  }

  next() {
    if (this.page > this.pages.length - 2) {
      alert('Không tìm thấy trang');
    } else {
      this.page = this.page + 1;
      this.search();
    }
  }

  //#endregion

  //#region BACK
  backLookup() {
    let earlierSearch;
    if (this.listLookup.length > 1) {
      this.listLookup.pop();
      earlierSearch = this.listLookup[this.listLookup.length - 1];
      this.selectItem = earlierSearch[0];
      this.selectAttribute = earlierSearch[1];
      this.inputLook = earlierSearch[2];
      this.searchByKeys(this.selectItem, this.selectAttribute, this.inputLook);
      return;
    }
    this.router.navigateByUrl('/management').then(e => {
      if (e) {
        console.log('Navigation is successful!');
      } else {
        console.log('Navigation has failed!');
      }
    });

  }

  // #endregion
}
