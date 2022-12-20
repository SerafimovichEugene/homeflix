import React, { FC, PropsWithChildren, useState } from "react";
import { VideosPageContextInstance } from "./VideosPageContext";
import { DEFAULT_LIMIT } from "../../../constants";
import { FileEntity } from "../../../domain";

export const VideosPageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
  const [search, setSearch] = useState<string>("");
  const [files, setFiles] = useState<FileEntity[]>([]);
  return (
    <VideosPageContextInstance.Provider value={{ page, limit, search, files, setPage, setLimit, setSearch, setFiles }}>
      {children}
    </VideosPageContextInstance.Provider>
  );
};
