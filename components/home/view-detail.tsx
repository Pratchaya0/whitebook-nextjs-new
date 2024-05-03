import { getBookByBookId } from "@/data/book";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import BackButton from "../auth/back-button";
import Header from "./header";

interface ViewDetailProps {
  bookId: string;
}

const ViewDetail = ({ bookId }: ViewDetailProps) => {
  const book = getBookByBookId(bookId);

  console.log(book);
  return (
    <Card className="w-[800px] shadow-md">
      <CardHeader className="pb-1">Hello</CardHeader>
      <CardContent className="p-0">{""}</CardContent>
      <CardFooter className="pt-1">
        <BackButton label={"temp"} href={"temp"} />
      </CardFooter>
    </Card>
  );
};

export default ViewDetail;
