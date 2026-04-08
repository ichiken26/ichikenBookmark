import BookmarkListItem from "./BookmarkListItem";

export type BookmarkItem = {
  name: string;
  url: string;
};

type BookmarkListProps = {
  items: BookmarkItem[];
};

function BookmarkList({ items }: BookmarkListProps) {
  return (
    <div className="bookmark-list">
      {items.map((item) => (
        <BookmarkListItem
          key={`${item.name}-${item.url}`}
          name={item.name}
          url={item.url}
        />
      ))}
    </div>
  );
}

export default BookmarkList;
