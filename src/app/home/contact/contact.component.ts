import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { ContactserService } from 'src/app/contactser.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactform !: FormGroup;
  contacts: any[] = [];
  selectedcontactid: string | null = null;
  constructor(private fb:FormBuilder,
    private contact:ContactserService
  ){ this.contactform = this.fb.group({
    createdat:['2024-02-05',Validators.required],
    first_name:['',Validators.required],
    last_name:['',Validators.required],
    emailid:['',[Validators.required,Validators.email]],
    age:['',[Validators.required,Validators.min(1)]],
    genter:['',Validators.required],
    mobilenum:['',[Validators.required,Validators.pattern('^\\d{10}$')]],
    pan_num:['',Validators.required],
    aadaar:['',[Validators.required ]],
    status:[  true,Validators.required]
  })}
  
 
  ngOnInit(): void {
    this.getContacts()
  }
  getContacts() {
    this.contact.getcontacts().subscribe(
      (data) => {
        this.contacts = data;
      },
      (error) => {
        console.error('Error fetching contacts', error);
      }
    );
  }

  getcontact(id: string){
      this.contact.getcontent(id).subscribe(
        (data)=>{
          this.selectedcontactid = id;
          this.contactform.patchValue(data);
        },
      (error)=>{
        console.error("Error fetching content ",error)
      }
      )
  }
onsubmit(){
  if (this.selectedcontactid) {

    this.contact.updatecontact(this.selectedcontactid, this.contactform.value).subscribe(
      (response) => {
        console.log('Contact updated successfully', response);
        this.resetForm();
        this.getContacts();
      },
      (error) => {
        console.error('Error updating contact', error);
      }
    );
  } else {

    this.contact.createcontact(this.contactform.value).subscribe(
      (response) => {
        console.log('Contact created successfully', response);
        this.resetForm();
        this.getContacts();
      },
      (error) => {
        console.error('Error creating contact', error);
      }
    );
  }

}
deletecontact(id:string){
  this.contact.deletecontant(id).subscribe(
    (response) =>{
      console.log("contact delete sucessfully",response);
      this.getContacts
    },
    (error) => {
      console.error('Error creating contact', error);
    }
  )
}
resetForm() {
  this.contactform.reset({
    createdAt: '2024-02-05',
    first_name: '',
    last_name: '',
    emailId: '',
    age: '',
    gender: '',
    mobilenumber: '',
    pan_no: '',
    adhaar_no: '',
    status: true,
  });
  this.selectedcontactid = null;
}

}
