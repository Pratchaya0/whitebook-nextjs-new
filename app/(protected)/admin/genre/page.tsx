import GenreTagTable from "@/components/admin/genre/table";
import { getListGenreTag } from "@/data/genre-tag";
import { GenreTag } from "@prisma/client";

const GenrePage = async () => {
  const genreTags = await getListGenreTag();
  return (
    <div>
      <GenreTagTable genreTags={genreTags as GenreTag[]} />
    </div>
  );
};

export default GenrePage;
