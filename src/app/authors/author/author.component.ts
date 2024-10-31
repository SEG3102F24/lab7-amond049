import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Author} from "../model/author";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AuthorService} from "../service/author.service";

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit, OnDestroy {
  selectedAuthor!: Author | null;
  private subscription!: Subscription;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private authorService: AuthorService = inject(AuthorService);

  ngOnInit(): void{
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.subscription = this.authorService.getAuthorById(id).subscribe({
        next: (data: Author) => {
          this.selectedAuthor = data;
        },
        error: (_:any) => {
          this.selectedAuthor = null;
        }
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
