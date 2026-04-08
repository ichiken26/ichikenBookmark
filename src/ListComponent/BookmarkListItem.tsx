type BookmarkListItemProps = {
  name: string;
  url: string;
};

function BookmarkListItem({ name, url }: BookmarkListItemProps) {
  return (
    <a className="bookmark-item" href={url} target="_blank" rel="noreferrer">
      <div className="bookmark-item__body">
        <p className="bookmark-item__title">{name}</p>
        <p className="bookmark-item__url">{url}</p>
      </div>
    </a>
  );
}

export default BookmarkListItem;
