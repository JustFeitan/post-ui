import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostApiService} from '../../../services/api/PostApiService';
import {Post} from '../../../models/common/Post';
import {Store} from '@ngrx/store';
import {ReduxUser} from '../../../redux/models/ReduxUser';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {

  private post: Post;

  constructor(private router: Router,
              private postService: PostApiService,
              private store: Store<any>) { }

  ngOnInit(): void {
    this.store.select('user')
      .subscribe(user => {
        if (!user.isAuth) {
          this.router.navigate(['auth']).then();
        } else {
          this.post = new Post();
          this.post.userId = user.info.id;
        }
      });
    this.postService.createPost(this.post).then(post => {
      this.post = post;
      this.router.navigate(['posts', 'edit', this.post.id]).then();
    });
  }
}
