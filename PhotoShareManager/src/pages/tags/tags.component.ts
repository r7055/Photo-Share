import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TagService, TagDto } from "../../services/tag.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-tags',
  imports: [CommonModule,ReactiveFormsModule],
  standalone: true,
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags: TagDto[] = [];
  tagForm: FormGroup;
  
  loading = false;
  error = '';
  success = '';
  
  constructor(
    private tagService: TagService,
    private formBuilder: FormBuilder
  ) {
    this.tagForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.loadTags();
  }
  
  loadTags(): void {
    this.loading = true;
    this.tagService.getTags().subscribe({
      next: (tags) => {
        this.tags = tags;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load tags';
        this.loading = false;
      }
    });
  }
  
  createTag(): void {
    if (this.tagForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.error = '';
    this.success = '';
    
    this.tagService.createTag(this.tagForm.value.name).subscribe({
      next: () => {
        this.success = 'Tag created successfully';
        this.tagForm.reset();
        this.loadTags(); // Reload tags to show the new one
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to create tag';
        this.loading = false;
      }
    });
  }
  
  deleteTag(tagId: number): void {
    if (!confirm('Are you sure you want to delete this tag?')) {
      return;
    }
    
    this.loading = true;
    this.error = '';
    this.success = '';
    
    this.tagService.deleteTag(tagId).subscribe({
      next: () => {
        this.success = 'Tag deleted successfully';
        this.loadTags(); // Reload tags to remove the deleted one
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to delete tag';
        this.loading = false;
      }
    });
  }
  
  clearMessages(): void {
    this.error = '';
    this.success = '';
  }
  
  // Getter for form validation
  get nameControl() {
    return this.tagForm.get('name');
  }
}