import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../models/common/Post';
import {PostApiService} from '../../../services/api/PostApiService';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  @Input() post: Post;
  constructor(private postService: PostApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.postService.getPostById(this.route.snapshot.paramMap.get('id'))
      .then(response => this.post = response)
      .catch();
  }

}
