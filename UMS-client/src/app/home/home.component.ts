import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from '../services.service';
import { MessageService } from 'primeng/api';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from "@angular/material/table"
import { Notes } from '../model/notes.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private serviceService: ServicesService,
    private messageService: MessageService,

  ) { }


  submit = false
  allNote: Notes[] = []
  noNotes: any;
  dataSource = new MatTableDataSource<Notes>([]);
  pagedNotes: Notes[] = [];
  editedContent: string = '';
  oneNote: Notes | null = null;

  // Paginator options
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20]

  ngOnInit(): void {
    // this.getNotes()
    this.loadNotes()
  }


  // Added ngAfterViewInit:This lifecycle hook is used to set the paginator for the dataSource after the view (and thus the paginator) has been initialized.
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }



  // Updated loadNotes(): Now sets the dataSource.data to allNote before calling updatePagedNotes(). This ensures that the MatTableDataSource is always in sync with our data.
  loadNotes(): void {
    this.serviceService.allNotes().subscribe({
      next: (res: any) => {
        this.allNote = res;
        this.dataSource.data = this.allNote;
        this.paginator.length = this.allNote.length;
        this.paginator.pageIndex = 0;
        this.updatePagedNotes();
      },
      error: (err) => {
        console.error('Error fetching notes:', err);
      }
    });
  }


  // updatePagedNotes(){
  //   const startIndex = this.paginator ? this.paginator.pageIndex * this.paginator.pageSize : 0;
  //   this.pagedNotes = this.allNote.slice(startIndex,startIndex+this.pageSize);
  // }

  updatePagedNotes() {
    const startIndex = this.paginator ? this.paginator.pageIndex * this.paginator.pageSize : 0;
    // Add null check before accessing properties of this.paginator
    if (this.paginator) {
      this.pagedNotes = this.allNote.slice(startIndex, startIndex + this.pageSize);
    }
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.updatePagedNotes()
  }


  addNote = this.fb.group({
    content: ['', Validators.required]
  })
  get notes() {
    return this.addNote.controls;
  }


  editNote = this.fb.group({
    content: ['', Validators.required]
  })
  onSubmit() {
    this.submit = true
    console.log(this.addNote.value);
    if (this.addNote.valid) {
      const data = this.addNote.getRawValue()
      console.log(this.addNote, data)

      this.serviceService.addNote(data.content as string)
        .subscribe({
          next: (res: any) => {
            console.log('ahh', res);
            this.messageService.add({ detail: res.message });
            this.addNote.reset();
            this.submit = false;
            this.updatePagedNotes()
            this.loadNotes()

          },
          error: (err) => {
            if (err.error && err.error.message) {
              this.messageService.add({ detail: err.error.message });
            } else {
              this.messageService.add({ detail: 'An error occurred during adding note.' });
            }
          }
        })
    }
  }


  // getNotes(){
  //   this.serviceService.allNotes().subscribe({next :(res:any)=>{
  //     console.log('notes',res)
  //     this.allNote = res
  //   }
  //   })
  // }

  openEditModal(id: string): void {
    console.log('Edit Note ID:', id);
    this.serviceService.getEditNote(id).subscribe({
      next: (response) => {
        console.log('Response from backend:', response.data);
        this.oneNote = response.data;
      },
      error: (err) => {
        console.error('Error fetching note data:', err);
      }
    });
  }

  handleEdit(id:string) {
    console.log('kiakka',id)
    if (this.editNote.valid && this.oneNote) {
      const content = this.editNote.get('content')?.value;
      const id = this.oneNote._id;
      this.serviceService.editNote(id, content as string).subscribe({
        next: (res: any) => {
          this.messageService.add({ detail: res.message });
          this.loadNotes();
        },
        error: (err) => {
          if (err.error && err.error.message) {
            this.messageService.add({ detail: err.error.message });
          } else {
            this.messageService.add({ detail: 'An error occurred during editing note.' });
          }
        }
      });
    }
  }


  deleteNote(id: string) {
    this.serviceService.deleteNote(id).subscribe({
      next: (res: any) => {
        console.log(res)
        this.messageService.add({ detail: 'note deleted.....' });
        this.loadNotes()
      },
      error: (err) => {
        this.messageService.add({ detail: 'An error occurred during deleting note.' });

      }
    })
  }


  // searching: binding search component to home
  searchText: string = ''

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    const filteredNotes = this.allNote.filter(note => note.content.toLowerCase().includes(this.searchText.toLowerCase()))

    this.dataSource.data = filteredNotes;
    this.paginator.length = filteredNotes.length;
    this.paginator.pageIndex = 0;
    // this.pagedNotes = filteredNotes.slice(0,this.pageSize)
    this.updatePagedNotes()
  }
}
