import BookReader from "@/components/services/read/book-reader";

interface IParams {
  bookId?: string;
}

const ReadPage = ({ params }: { params: IParams }) => {
  const { bookId } = params;

  return (
    <div>
      <BookReader bookId={bookId as string} />
    </div>
  );
};

export default ReadPage;
