// import { Component,  OnInit } from "@angular/core"
// import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"
// import  { TagService, TagDto } from "../../services/tag.service"

// @Component({
//   selector: 'app-tags',
//   templateUrl: './tags.component.html',
//   styleUrls: ['./tags.component.scss']
// })
// export class TagsComponent implements OnInit {
//   tags: TagDto[] = [];
//   tagForm: FormGroup;
  
//   loading = false;
//   error = '';
//   success = '';
  
//   constructor(
//     private tagService: TagService,
//     private formBuilder: FormBuilder
//   ) {
//     this.tagForm = this.formBuilder.group({
//       name: ['', Validators.required]
//     });
//   }
  
//   ngOnInit(): void {
//     this.loadTags();
//   }
  
//   loadTags(): void {
//     this.loading = true;
//     this.tagService.getTags().subscribe({
//       next: (tags) => {
//         this.tags = tags;
//         this.loading = false;
//       },
//       error: (error) => {
//         this.error = 'Failed to load tags';
//         this.loading = false;
//       }
//     });
//   }
  
//   createTag(): void {
//     if (this.tagForm.invalid) {
//       return;
//     }
    
//     this.loading = true;
//     this.error = '';
//     this.success = '';
    
//     this.tagService.createTag(this.tagForm.value.name).subscribe({
//       next: () => {\
//         this.success = 'Tag
