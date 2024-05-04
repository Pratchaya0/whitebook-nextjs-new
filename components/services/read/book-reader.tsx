"use client";

import { useState } from "react";
import { ReactReader } from "react-reader";

const BookReader = () => {
  const [location, setLocation] = useState<string | number>(0);
  return (
    <div style={{ height: "75vh" }}>
      <ReactReader
        url="https://react-reader.metabits.no/files/alice.epub"
        location={location}
        locationChanged={(epubcfi: string) => setLocation(epubcfi)}
      />
    </div>
  );
};

export default BookReader;
