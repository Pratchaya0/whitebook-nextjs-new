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
      Hello book details
      <p>{JSON.stringify(book)}</p>
    </div>
  );
};

export default BookDetailPage;
