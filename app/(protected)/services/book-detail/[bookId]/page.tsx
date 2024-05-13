import ViewBookDetail from "@/components/services/book-detail/view-book-detail";

interface IParams {
  bookId?: string;
}

const BookDetailPage = async ({ params }: { params: IParams }) => {
  const { bookId } = params;

  return (
    <div>
      <ViewBookDetail bookId={bookId as string} />
    </div>
  );
};

export default BookDetailPage;
