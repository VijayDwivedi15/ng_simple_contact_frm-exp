
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './Post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'contactexp';

  loadedPosts : Post[] = [];

  ngOnInit() {
    this.onFetchPosts();
  }

  constructor(private http: HttpClient) {
  }


  onCreatePost(postData: { myname: string; mobile: string; email: string; subject: string; content: string }) {
    // Send Http request
    this.http
      .post(
        'https://contactformexp.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    this.http.get<{[key:string]:Post }>('https://contactformexp.firebaseio.com/posts.json')
    .pipe(map(resdata=>
      {
        const PostArray : Post[]= [];
        for(const keys in resdata)
        {
          if(resdata.hasOwnProperty(keys))
          {
            PostArray.push({...resdata[keys],id:keys});
          }
         
        }
        return PostArray;
      }))
    .subscribe(s => {
      this.loadedPosts=s;
    });
  }

}