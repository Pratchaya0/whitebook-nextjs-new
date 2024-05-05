import { getBookByBookId } from "@/data/book";

interface IParams {
  bookId?: string;
}

const BookDetailPage = async ({ params }: { params: IParams }) => {
  console.log(params);
  const { bookId } = params;
  const book = await getBookByBookId(bookId as string);

  console.log(book);
  return (
    <div>
      <h2>{book?.name === "" ? "Book" : book?.name} Details</h2>
      <p>{JSON.stringify(book)}</p>
    </div>
  );
};

export default BookDetailPage;
