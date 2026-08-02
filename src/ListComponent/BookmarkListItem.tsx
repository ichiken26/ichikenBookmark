type BookmarkListItemProps = {
  name: string;
  url: string;
};

function BookmarkListItem({ name, url }: BookmarkListItemProps) {
  return (
    <a className="bookmark-item" href={url} target="_blank" rel="noopener noreferrer">
      <div className="bookmark-item__body">
        <h3 className="bookmark-item__title">{name}<span aria-hidden="true"> ↗</span></h3>
        <p className="bookmark-item__url">{url}</p>
      </div>
    </a>
  );
}

export default BookmarkListItem;
