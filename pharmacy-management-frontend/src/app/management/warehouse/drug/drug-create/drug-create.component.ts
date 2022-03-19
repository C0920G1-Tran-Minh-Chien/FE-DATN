import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DrugService} from '../../../../service/drug.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {DrugGroup} from '../../../../model/drugGroup';
import {DrugGroupService} from '../../../../service/drug-group.service';
import {Router} from '@angular/router';
import {DrugGroupDto} from '../../../../model/drug-group';
import {DrugNotificationComponent} from '../drug-notification/drug-notification.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from "ngx-toastr";

declare var $: any;


@Component({
  selector: 'app-drug-create',
  templateUrl: './drug-create.component.html',
  styleUrls: ['./drug-create.component.css']
})
export class DrugCreateComponent implements OnInit {
  drugGroups: DrugGroupDto[] = [];
  urlImage;
  created = false
  check = false;
  selectedImage: any = null;
  loading = false;
  drugForm: FormGroup = new FormGroup({
    drugName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    drugFaculty: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    activeElement: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    drugSideEffect: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    conversionRate: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)]),

    wholesaleProfitRate: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern(/^\d*\.?\d*$/)]),
    retailProfitRate: new FormControl('', [Validators.min(0), Validators.pattern(/^\d*\.?\d*$/)]),
    unit: new FormControl('', [Validators.required]),
    conversionUnit: new FormControl('', [Validators.required]),
    manufacturer: new FormControl('', [Validators.maxLength(25)]),
    origin: new FormControl('', [Validators.required]),
    drugGroup: new FormControl("", Validators.required),
    note: new FormControl('', [Validators.maxLength(250)]),
    img: new FormControl('')
  });

  // select = null;
   url: any;

  constructor(private drugService: DrugService,
              private drugGroupService: DrugGroupService,
              private storage: AngularFireStorage,
              private dialog: MatDialog,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    $(() => {
      $('.select2').select2();
    });
    this.getAllDrugGroup();
  }

  submitv2(){
    const name = this.selectedImage.name;
    const fileRef = this.storage.ref(name);
    console.log(this.selectedImage)
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          this.drugForm.patchValue({img: url});
          this.drugService.save(this.drugForm.value).subscribe(data => {
            this.created = true;
            console.log(this.urlImage)
            this.toastr.success("Thêm thành công!")
            this.created = false;
          }, error => {
            this.toastr.error("Thêm thất bại!")
          });
        });
      })
    ).subscribe();



  }

  // submit() {
  //   const promises = [];
  //
  //   for (let a of this.selectedImage) {
  //     console.log(a);
  //     promises.push(this.uploadFile(a));
  //   }
  //   console.log(promises);
  //   Promise.all(promises)
  //     .then(() => {
  //       this.drugService.save(this.drugForm.value).subscribe(data => {
  //         this.created = true;
  //         this.toastr.success("Thêm thành công!")
  //         this.created = false;
  //         for (let i = 0; i < this.urlImage.length; i++) {
  //           let drugImage = {
  //             drugImageDetailUrl: this.urlImage[i],
  //             drug: data,
  //           };
  //           console.log(drugImage);
  //           this.drugService.saveImage(drugImage).subscribe(() => {
  //             console.log("Save IMG")
  //           }, error => {
  //             this.toastr.error("Tạo ảnh thất bại!")
  //           })
  //         }
  //
  //       }, error => {
  //         this.toastr.error("Thêm thất bại!")
  //       });
  //     })
  //
  // }

  backToList() {
    this.router.navigateByUrl('/drug/list');
  }

  // uploadFile(imageFile) {
  //   // return new Promise( (data) => {
  //   this.urlImage = "";
  //   const nameImg = this.getCurrentDateTime() + imageFile.name;
  //   const fileRef = this.storage.ref(nameImg);
  //   this.storage.upload(nameImg, imageFile).snapshotChanges().pipe(
  //     finalize(() => {
  //       fileRef.getDownloadURL().subscribe((url) => {
  //         // this.urlImage.push(url);
  //         this.urlImage = url;
  //         console.log(url);
  //       });
  //     })
  //   ).subscribe(
  //   );
  //   // })
  // }


  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  getAllDrugGroup() {
    this.drugGroupService.getCode().subscribe(drugGroups => {
      this.drugGroups = drugGroups;
    });
  }

  notificationDialog(): void {
    const dialogRef = this.dialog.open(DrugNotificationComponent, {
      width: '500px',
      data: {data1: false, data2: false, data3: false, data4: this.created, data5: false}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


}



