import AddDialogButton from "@/components/admin/add-dialog-button";
import AddGenreTagForm from "@/components/admin/genre/add-genre-tag-form";
import GenreTagTable from "@/components/admin/genre/table";
import { getListGenreTag } from "@/data/genre-tag";
import { GenreTag } from "@prisma/client";

const GenrePage = async () => {
  return (
    <>
      <div className="flex items-center justify-between gap-x-8">
        <h2>Genres(tags) Management</h2>
        <div>
          <AddDialogButton title="Add Tag">
            <AddGenreTagForm />
          </AddDialogButton>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-8">
        <GenreTagTable />
      </div>
    </>
  );
};

export default GenrePage;
