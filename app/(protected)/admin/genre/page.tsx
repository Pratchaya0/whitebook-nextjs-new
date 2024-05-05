import AddDialogButton from "@/components/admin/add-dialog-button";
import GenreTagTable from "@/components/admin/genre/table";
import { getListGenreTag } from "@/data/genre-tag";
import { GenreTag } from "@prisma/client";

const GenrePage = async () => {
  const genreTags = await getListGenreTag();
  return (
    <>
      <div className="flex items-center justify-between gap-x-8">
        <h2>Genres(tags) Management</h2>
        <div>
          <AddDialogButton title="Add Tag">
            <div>Hello</div>
          </AddDialogButton>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-8">
        <GenreTagTable genreTags={genreTags as GenreTag[]} />
      </div>
    </>
  );
};

export default GenrePage;
