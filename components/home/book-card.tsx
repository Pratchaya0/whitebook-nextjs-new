import { getListBooks } from "@/data/book";
import BookCardItem from "@/components/home/book-card-item";

const BookCard = async () => {
  const books = await getListBooks();

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {books &&
          books.map((book) => (
            <>
              <BookCardItem key={book.id} book={book} />
              <BookCardItem key={book.id} book={book} />
              <BookCardItem key={book.id} book={book} />
              <BookCardItem key={book.id} book={book} />
              <BookCardItem key={book.id} book={book} />
              <BookCardItem key={book.id} book={book} />
              <BookCardItem key={book.id} book={book} />
              <BookCardItem key={book.id} book={book} />
              <BookCardItem key={book.id} book={book} />
              <BookCardItem key={book.id} book={book} />
              <BookCardItem key={book.id} book={book} />
              <BookCardItem key={book.id} book={book} />
            </>
          ))}
      </div>
    </div>
  );
};

export default BookCard;
