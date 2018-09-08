import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { feed, usersList } from "./feed-sample";
import { ScrollbarService } from "../_core/services";

export type Feed = Array<FeedItem>;

export interface UserProfile {
  id: number;
  username: string;
  avatarPath: string
}

export interface FeedItem {
  author: UserProfile;
  timestamp: number;
  text: string;
}

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("scrollContainer") scrollContainer;

  // User's message inside the textarea.
  currentMessage: string = ``;

  feed$: BehaviorSubject<Feed> = new BehaviorSubject<Feed>(feed);
  usersList: Array<UserProfile> = usersList;
  currentUser: UserProfile = this.usersList.find(item => item.username === `Stan`);
  tempInterval: any;

  constructor(private scrollbar: ScrollbarService) {
  }

  ngOnInit() {
    // Sends test message repetitively.
    this.tempInterval = setInterval(() => {
      this.tempSendTestMessage();
    }, 5000);
  }

  ngAfterViewInit() {
    // We have additional scrollbar container, so scrollbars should be reinitialized.
    this.scrollbar.init();

    // Scrolls down to last messages.
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }

  ngOnDestroy() {
    clearInterval(this.tempInterval);
  }

  attach() {
    alert(`Not implemented`);
    throw new Error(`Not implemented`);
  }

  getLocaleDateString(item: FeedItem): string {
    return (new Date(item.timestamp)).toLocaleDateString();
  }

  hasToShowAvatar$(item: FeedItem, index: number): Observable<boolean> {
    // Does not show for the current user.
    if (item.author.id === this.currentUser.id) {
      return of(false);
    }

    // Shows for first item in the list.
    if (index === 0) {
      return of(true);
    }

    // Shows when the author changes.
    return this.feed$.pipe(
      map(feed => feed[index - 1].author.id !== feed[index].author.id)
    );
  }

  hasToShowDate$(item: FeedItem, index: number): Observable<boolean> {
    // Always show date with the first item.
    if (index === 0) {
      return of(true);
    }

    // TODO: use isSameDay or similar logic?
    return this.feed$.pipe(
      map(feed => feed[index].timestamp - feed[index - 1].timestamp >= 1000 * 60 * 60 * 24)
    );
  }

  isAuthoredByCurrentUser(feedItem: FeedItem): boolean {
    return this.currentUser.id === feedItem.author.id;
  }

  send(event?: Event) {
    if (event) {
      // Prevents Enter's new line insertion.
      event.preventDefault();
    }

    if (this.currentMessage.trim().length) {
      this.addFeedItemByCurrentUser({text: this.currentMessage.trim()});
      this.currentMessage = ``;
    }
  }

  private addFeedItem(item: FeedItem) {
    // Concats new item to the feed.
    this.feed$.next(this.feed$.getValue().concat(item));

    setTimeout(() => {
      // Scrolls to the last message.
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    })
  }

  private addFeedItemByCurrentUser(item: Partial<FeedItem>) {
    this.addFeedItem({
      ...item,
      ...{
        author: this.currentUser,
        timestamp: (new Date()).getTime()
      }
    } as FeedItem)
  }

  private tempSendTestMessage() {
    this.addFeedItem({
      text: `Hey! I am the message!`,
      author: this.usersList.find(item => item.username === `Vitaly`),
      timestamp: (new Date()).getTime()
    })
  }
}
