import type { Bookmark } from "../types";
import BookmarkListItem from "./BookmarkListItem";

type BookmarkListProps = {
  items: Bookmark[];
};

function BookmarkList({ items }: BookmarkListProps) {
  return (
    <ul className="bookmark-list">
      {items.map((item) => (
        <li key={item.id}><BookmarkListItem name={item.name} url={item.url} /></li>
      ))}
    </ul>
  );
}

export default BookmarkList;
