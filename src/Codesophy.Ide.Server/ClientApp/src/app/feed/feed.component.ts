import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { last } from "lodash-es";
import { map } from "rxjs/operators";

import { feed, usersList } from "./feed-sample";
import { ScrollbarService } from "../_core/services";

export interface Feed {
  id: string;
  items: Array<FeedItem>;
}

export interface FeedItem {
  id: string;
  author: UserProfile;
  timestamp: number;
  text: string;
}

export interface UserProfile {
  id: string;
  username: string;
  avatarPath: string
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

  // TODO: Store in cookies?
  lastViewedItemId = `19`;

  // Indicates previous scrollTop of feed container.
  previousScrollTop: number;

  constructor(private scrollbar: ScrollbarService) {
  }

  ngOnInit() {
    // Sends test message repetitively.
    this.tempInterval = setInterval(() => {
      this.tempSendTestMessage();
    }, 7000);
  }

  ngAfterViewInit() {
    // We have additional scrollbar container, so scrollbars should be reinitialized.
    this.scrollbar.init();

    this.scrollToLastViewedItem();
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
      map(feed => feed.items[index - 1].author.id !== feed.items[index].author.id)
    );
  }

  hasToShowDate$(item: FeedItem, index: number): Observable<boolean> {
    // Always show date with the first item.
    if (index === 0) {
      return of(true);
    }

    // TODO: use isSameDay or similar logic?
    return this.feed$.pipe(
      map(feed => feed.items[index].timestamp - feed.items[index - 1].timestamp >= 1000 * 60 * 60 * 24)
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

  hasUnviewedItems$(): Observable<boolean> {
    return this.feed$.pipe(
      map(feed => last(feed.items).id !== this.lastViewedItemId)
    );
  }

  isViewed$(item: FeedItem, index: number): Observable<boolean> {
    return this.feed$.pipe(
      map(feed => {
        const lastViewedItemIndex = feed.items.findIndex(item => item.id === this.lastViewedItemId);
        return index <= lastViewedItemIndex;
      })
    );
  }

  scroll() {
    const scrollTop = this.scrollContainer.nativeElement.scrollTop;

    // In case scrolling down - marks viewed items as viewed.
    if (!this.previousScrollTop || scrollTop > this.previousScrollTop) {
      const unviewedItems: Array<HTMLElement> = this.scrollContainer.nativeElement.querySelectorAll(`.app-feed-item-is-not-viewed`);

      for (let i = 0, len = unviewedItems.length; i < len; i++) {
        // Marks the element as viewed if full element's dimensions are in the view.
        if (scrollTop + this.scrollContainer.nativeElement.getBoundingClientRect().height >= unviewedItems[i].offsetTop + unviewedItems[i].offsetHeight) {
          // Awaits a little to leave user some time to see what messages is unviewed.
          setTimeout(() => {
            this.lastViewedItemId = unviewedItems[i].dataset.id;
          }, 1500);

        } else {
          // Breaks the loop after meeting the first element out of the view.
          break;
        }
      }
    }
  }

  scrollToUnviewedItems() {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.querySelector(`.app-feed-item-is-not-viewed`).offsetTop;
  }

  private addFeedItem(item: FeedItem) {
    // Concats new item to the feed.
    this.feed$.next({...this.feed$.getValue(), items: this.feed$.getValue().items.concat(item)});

    // Update scrollbar to detect new container height.
    this.scrollbar.update();
  }

  private addFeedItemByCurrentUser(item: Partial<FeedItem>) {
    this.addFeedItem({
      ...item,
      ...{
        author: this.currentUser,
        timestamp: (new Date()).getTime()
      }
    } as FeedItem);

    setTimeout(() => {
      // Scrolls to the last message.
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    })
  }

  private scrollToLastViewedItem() {
    const lastViewedItem: HTMLElement = this.scrollContainer.nativeElement.querySelector(`.app-feed-item-is-last-viewed`);
    this.scrollContainer.nativeElement.scrollTop = lastViewedItem.offsetTop + lastViewedItem.offsetHeight - this.scrollContainer.nativeElement.getBoundingClientRect().height;
  }

  private tempSendTestMessage() {
    this.addFeedItem({
      id: this.feed$.getValue().items.length + 1 + ``,
      text: `Hey! I am the message!`,
      author: this.usersList.find(item => item.username === `Vitaly`),
      timestamp: (new Date()).getTime()
    })
  }
}
